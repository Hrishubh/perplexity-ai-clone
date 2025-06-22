import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function SourceList({ webResult, loadingSearch }) {
	return (
		<div className="w-full">
			<div className="flex gap-2 flex-wrap max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
				{/* {console.log("webResult of items in SourceList:")} */}
				{/* {console.log(webResult)} */}
				{webResult?.map((item, index) => (
					<div
						key={index}
						className="p-3 bg-accent hover:bg-[#e1e3da] rounded-lg w-[250px] cursor-pointer"
						onClick={() => window.open(item?.url, "_blank")}
					>
						<div className="flex gap-2 items-center">
							<Image
								src={item?.img}
								alt={item?.long_name}
								height={20}
								width={20}
								className="max-h-[20px] max-w-[20px] rounded-full"
							/>
							<h2 className="text-xs">{item?.long_name}</h2>
						</div>
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							className="line-clamp-2 text-black text-xs"
						>
							{item?.description}
						</ReactMarkdown>
					</div>
				))}
				{loadingSearch && (
					<div className="flex flex-wrap gap-2">
						{[1, 2, 3, 4].map((item, index) => (
							<div
								className="w-[250px] h-[75px] rounded-2xl bg-accent relative flex w-64 animate-pulse gap-2 p-3"
								key={index}
							>
								<div className="flex-1">
									<div className="flex gap-1">
										<div className="bottom-5 right-0 h-5 w-5 rounded-full bg-[#e1e3da]"></div>
										<div className="mb-1 h-5 w-3/6 rounded-lg bg-[#e1e3da] text-lg"></div>
									</div>
									<div className="h-7 w-[100%] rounded-lg bg-[#e1e3da] text-sm"></div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="flex justify-center mb-1">
				<p className="text-xs text-gray-500">
					↑↓ Scroll to see all sources ↓↑
				</p>
			</div>

			<style jsx>{`
				/* Custom scrollbar styles for webkit browsers */
				.scrollbar-thin::-webkit-scrollbar {
					width: 6px;
				}
				.scrollbar-thin::-webkit-scrollbar-track {
					background: transparent;
				}
				.scrollbar-thin::-webkit-scrollbar-thumb {
					background-color: #d1d5db;
					border-radius: 3px;
				}
				.scrollbar-thin::-webkit-scrollbar-thumb:hover {
					background-color: #9ca3af;
				}
			`}</style>
		</div>
	);
}

export default SourceList;
