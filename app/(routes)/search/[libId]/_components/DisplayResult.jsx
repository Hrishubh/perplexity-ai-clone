import React, { useEffect, useState } from "react";
import {
	LucideImage,
	LucideList,
	LucideSparkles,
	LucideVideo,
} from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { SEARCH_RESULT } from "@/services/Shared";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";

const tabs = [
	{ label: "Answer", icon: LucideSparkles },
	{ label: "Images", icon: LucideImage },
	{ label: "Videos", icon: LucideVideo },
	{ label: "Sources", icon: LucideList, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
	const [activeTab, setActiveTab] = useState("Answer");
	const [searchResult, setSearchResult] = useState(SEARCH_RESULT);
	const { libId } = useParams();

	useEffect(() => {
		// Update this method to fetch the search results from the API
		searchInputRecord && GetSearchApiResult();
	}, [searchInputRecord]);

	const GetSearchApiResult = async () => {
		// const result = await axios.post('/api/brave-search-api', {
		// 	searchInput: searchInputRecord?.searchInput,
		// 	searchType: searchInputRecord?.type,
		// });

		// console.log(result.data);
		const searchResp = SEARCH_RESULT;

		// Formatting to send to Database
		const formattedSearchResp = searchResp?.web?.results?.map((item) => ({
			title: item?.title,
			description: item?.description,
			long_name: item?.profile?.long_name,
			img: item?.profile?.img,
			url: item?.url,
			thumbnail: item?.thumbnail?.src,
		}));

		console.log(formattedSearchResp);

		// Send to Database
		const { data, error } = await supabase.from('Chats').insert([
			{
				libId: libId,
				searchResult: formattedSearchResp,
			},
		]).select();

		console.log(data);
		console.log(error);

		// Pass to LLM Model to processing
		await GenerateAIResp(formattedSearchResp);
	};

	const GenerateAIResp = async (formattedSearchResp) => {
		const result = await axios.post("/api/llm-model", {
			searchInput: searchInputRecord?.searchInput,
			searchResult: formattedSearchResp,
			libId: libId,
		});

		console.log(result.data);
	}

	return (
		<div className="mt-7">
			<h2 className="line-clamp-2 font-medium text-3xl">
				{searchInputRecord?.searchInput}
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
					<AnswerDisplay searchResult={searchResult} />
				) : null}
			</div>
		</div>
	);
}

export default DisplayResult;
