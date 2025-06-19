import { supabase } from "@/services/Supabase";
import { inngest } from "./client";

export const llmModel = inngest.createFunction(
  { id: "llm-model" },
  { event: "app/llm-model" },
  async ({ event, step }) => {
    const aiResp = await step.ai.infer("generate-ai-llm-model-call", {
      model: step.ai.models.gemini({
        model: "gemini", // or your preferred model
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      }),
     body: {
  contents: [
    {
      role: "user",
      parts: [
        {
          text:
            `You are an AI assistant. Based on the input below, summarize and format the information using markdown.\n\n` +
            `User Input: ${event.data.searchInput}\n\n` +
            `Search Results: ${JSON.stringify(event.data.searchResult)}`
        }
      ]
    }
  ]
}

    });

    //console.log("aiResp", aiResp);

    await step.run("saveToDb", async () => {
      const content = aiResp?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const { error } = await supabase
        .from("Chats")
        .update({ aiResp: content })
        .eq("id", event.data.recordId);

      if (error) {
        throw new Error("Failed to save to Supabase: " + error.message);
      }
    });

    return { success: true, aiResponse: aiResp };
  }
);