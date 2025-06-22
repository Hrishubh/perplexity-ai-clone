import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

function DisplaySummary({ aiResp }) {
	return (
		<div className="mt-7">
			{!aiResp && (
				<div className="w-[100%] rounded-2xl relative flex w-64 animate-pulse">
					<div className="w-[100%] flex flex-col gap-2">
						<div className="flex gap-1">
							{/* <div className="bottom-5 right-0 h-5 w-5 rounded-full bg-[#e1e3da]"></div> */}
							<div className="h-10 w-4/6 rounded-lg bg-[#e1e3da] text-lg"></div>
						</div>
						<div className="h-25 w-[100%] rounded-lg bg-[#e1e3da] text-sm"></div>
						<div className="h-14 w-[100%] rounded-lg bg-[#e1e3da] text-sm"></div>
						<div className="h-6 w-[100%] rounded-lg text-sm"></div>
						<div className="h-6 w-[100%] rounded-lg text-sm"></div>

						<div className="flex gap-1">
							{/* <div className="bottom-5 right-0 h-5 w-5 rounded-full bg-[#e1e3da]"></div> */}
							<div className="h-16 w-5/6 rounded-lg bg-[#e1e3da] text-lg"></div>
						</div>
						<div className="h-32 w-[100%] rounded-lg bg-[#e1e3da] text-sm"></div>
						<div className="h-6 w-[100%] rounded-lg bg-[#e1e3da] text-sm"></div>
					</div>
				</div>
			)}
			<ReactMarkdown
				components={{
					h1: ({ node, ...props }) => (
						<h1
							className="text-4xl font-bold text-gray-600 mb-4 leading-snug text-justify"
							{...props}
						/>
					),

					h2: ({ node, ...props }) => (
						<h2
							className="text-3xl font-semibold text-gray-700 mb-3 leading-snug text-justify"
							{...props}
						/>
					),

					h3: ({ node, ...props }) => (
						<h3
							className="text-2xl font-semibold text-gray-600 mt-4 mb-2 leading-tight"
							{...props}
						/>
					),

					p: ({ node, ...props }) => (
						<p
							className="text-gray-700 leading-relaxed mb-4 text-justify"
							{...props}
						/>
					),

					a: ({ node, ...props }) => (
						<a
							className="text-gray-600 underline hover:text-gray-600 text-justify"
							target="_blank"
							rel="noreferrer"
							{...props}
						/>
					),

					ul: ({ node, ...props }) => (
						<ul
							className="list-disc list-outside space-y-2 leading-relaxed pl-5 text-justify"
							{...props}
						/>
					),

					li: ({ node, ...props }) => (
						<li className="mb-1" {...props} />
					),

					blockquote: ({ node, ...props }) => (
						<blockquote
							className="bg-gray-100 p-4 rounded-lg text-gray-700 leading-relaxed mb-6 text-justify"
							{...props}
						/>
					),

					// Table Styling

					table: ({ node, ...props }) => (
						<table
							className="table-auto w-full text-sm text-gray-700 border-collapse border border-gray-300 text-justify"
							{...props}
						/>
					),

					th: ({ node, ...props }) => (
						<th
							className="border border-gray-300 px-4 py-2 bg-gray-100 text-left text-justify"
							{...props}
						/>
					),

					td: ({ node, ...props }) => (
						<td
							className="border border-gray-300 px-4 py-2 text-justify"
							{...props}
						/>
					),

					// Code Block Styling with Syntax Highlighter

					code: ({ node, inline, className, children, ...props }) => {
						const match = /language-(\w+)/.exec(className || "");

						return !inline && match ? (
							<SyntaxHighlighter
								style={okaidia}
								language={match[1]}
								PreTag="div"
								className="rounded-md overflow-auto"
							>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code
								className="bg-gray-100 p-1 rounded-md"
								{...props}
							>
								{children}
							</code>
						);
					},
				}}
			>
				{aiResp}
			</ReactMarkdown>
		</div>
	);
}

export default DisplaySummary