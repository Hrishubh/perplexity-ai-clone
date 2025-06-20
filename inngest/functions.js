import { supabase } from "@/services/supabase";
import { inngest } from "./client";

export const llmModel = inngest.createFunction(
	{ id: "llm-model" },
	{ event: "llm-model" },
	async ({ event, step }) => {
		const aiResp = await step.ai.infer("generate-ai-llm-model-call", {
			model: step.ai.models.gemini({
				model: "gemini-2.0-flash",
				apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
			}),
			body: {
				contents: [
					{
						role: "user",
						parts: [
							{
								text:
									`You are an AI assistant. Based on the input below, Give a long, detailed and comprehensive explaination and format the information using markdown.\n\n` +
									`User Input: ${event.data.searchInput}\n\n` +
									`Search Results: ${JSON.stringify(
										event.data.searchResult
									)}`,
							},
						],
					},
				],
			},
		});

		console.log("Chat ID sent to inngest to copy LLM results to:");
		console.log(event.data.recordId);

		const saveToDb = await step.run("saveToDb", async () => {
			const { data, error } = await supabase
				.from("Chats")
				.update({
					aiResp: aiResp?.candidates[0].content.parts[0].text,
				})
				.eq("id", event.data.recordId)
				.select();
			console.log("LLM results saved to DB status:");
			console.log(data, error);
			return aiResp;
		});
		// return aiResp;
	}
);
