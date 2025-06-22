import React, { useEffect, useState } from "react";
import {
	Loader2Icon,
	LucideImage,
	LucideList,
	LucideSparkles,
	LucideVideo,
	Send,
} from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";
import ImageListTab from "./ImageListTab";
import axios from "axios";
import { SEARCH_RESULT } from "@/services/Shared";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import SourceListTab from "./SourceListTab";
import { Button } from "@/components/ui/button";

const tabs = [
	{ label: "Answer", icon: LucideSparkles },
	{ label: "Images", icon: LucideImage },
	{ label: "Videos", icon: LucideVideo },
	{ label: "Sources", icon: LucideList, badge: 20 },
];

function DisplayResult({ searchInputRecord }) {
	const [activeTab, setActiveTab] = useState("Answer");
	// const [searchResult, setSearchResult] = useState(SEARCH_RESULT);
	const [searchResult, setSearchResult] = useState(searchInputRecord);
	const { libId } = useParams();
	const [loadingSearch, setLoadingSearch] = useState(false);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		searchInputRecord?.Chats?.length == 0
			? GetSearchApiResult()
			: GetSearchRecords();
		setSearchResult(searchInputRecord);
		console.log("searchInputRecord:");
		console.log(searchInputRecord);
	}, [searchInputRecord]);

	const GetSearchApiResult = async () => {
		const tempInput = userInput ?? searchInputRecord?.searchInput;
		setUserInput("");
		setLoadingSearch(true);
		const result = await axios.post("/api/brave-search-api", {
			searchInput: tempInput,
			searchType: searchInputRecord?.type ?? "Search",
		});

		console.log("Brave Search Response");
		console.log(result.data);
		setSearchResult(result.data);
		const searchResp = result.data;

		// Formatting to send to Database
		const formattedSearchResp = searchResp?.web?.results?.map((item) => ({
			title: item?.title,
			description: item?.description,
			long_name: item?.profile?.long_name,
			img: item?.profile?.img,
			url: item?.url,
			thumbnail: item?.thumbnail?.src,
		}));

		console.log("Formatted Search Response");
		console.log(formattedSearchResp);

		// Send to Database
		const { data, error } = await supabase
			.from("Chats")
			.insert([
				{
					libId: libId,
					searchResult: formattedSearchResp,
					userSearchInput: tempInput,
				},
			])
			.select();

		console.log(
			"Confirmation of formatted search result being added to supabase"
		);
		console.log(data);

		// Pass to LLM Model to processing
		await GetSearchRecords();
		setLoadingSearch(false);
		await GenerateAIResp(formattedSearchResp, data[0].id, tempInput);
	};

	const GenerateAIResp = async (formattedSearchResp, recordId, tempInput) => {
		const result = await axios.post("/api/llm-model", {
			searchInput: tempInput,
			searchResult: formattedSearchResp,
			recordId: recordId,
		});

		console.log("RunId of LLM Model, confirming the LLM Model has started");
		console.log(result.data); //RunId of te LLM Model
		const runId = result.data;

		// Get the status of the LLM Model
		const interval = setInterval(async () => {
			const runResp = await axios.post(`/api/get-inngest-status`, {
				runId: runId,
			});

			if (runResp.data.data[0].status == "Completed") {
				clearInterval(interval);
				console.log("LLM Model has completed");
				await GetSearchRecords();
				console.log(runResp);
			}
		}, 1000);
	};

	const GetSearchRecords = async () => {
		let { data: Library, error } = await supabase
			.from("Library")
			.select("*, Chats(*)")
			.eq("libId", libId)
			.order("id", { foreignTable: "Chats", ascending: true });

		setSearchResult(Library[0]);
	};

	return (
		<div className="mt-7">
			{/* <h2 className="line-clamp-2 font-medium text-3xl">
				{searchInputRecord?.searchInput}
			</h2> */}
			{searchResult?.Chats?.map((chat, index) => (
				<div key={index} className="mt-7">
					<h2 className="line-clamp-2 font-bold text-4xl text-gray-800">
						{chat?.userSearchInput}
					</h2>
					<div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
						{tabs.map(({ label, icon: Icon, badge }) => (
							<button
								key={label}
								onClick={() => setActiveTab(label)}
								className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
									activeTab === label ? "text-black" : ""
								}`}
							>
								<Icon className="w-4 h-4" />

								<span>{label}</span>

								{badge && (
									<span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
										{badge}
									</span>
								)}

								{activeTab === label && (
									<span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
								)}
							</button>
						))}

						<div className="ml-auto text-sm text-gray-500">
							1 task <span className="ml-1">↗</span>
						</div>
					</div>

					<div>
						{activeTab == "Answer" ? (
							<AnswerDisplay
								chat={chat}
								loadingSearch={loadingSearch}
							/>
						) : activeTab == "Images" ? (
							<ImageListTab chat={chat} />
						) : activeTab == "Sources" ? (
							<SourceListTab chat={chat} />
						) : null}
					</div>
					<hr className="mt-5 mb-8" />
				</div>
			))}

			<div
				className="bg-white w-full border rounded-lg shadow-md p-2 px-5
			fixed bottom-6 max-w-md lg:max-w-xl xl:max-w-3xl flex justify-between items-center"
			>
				<input
					placeholder="Type Anything..."
					className="outline-none w-[90%] h-[36px]"
					onChange={(e) => setUserInput(e.target.value)}
					value={userInput}
				/>
				{userInput && (
					<Button
						onClick={GetSearchApiResult}
						disabled={loadingSearch}
					>
						{loadingSearch ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Send />
						)}
					</Button>
				)}
			</div>
		</div>
	);
}

export default DisplayResult;
