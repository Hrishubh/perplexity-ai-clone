import Image from 'next/image';
import React from 'react'
import SourceList from './SourceList';
import DisplaySummary from './DisplaySummary';

function AnswerDisplay({ chat, loadingSearch }) {
	return (
		<div>
			<div className="flex gap-2 flex-wrap mt-5">
				{/* {console.log("chat:")} */}
				{/* {console.log(chat)} */}
				<SourceList
					webResult={chat?.searchResult}
					// loadingSearch={loadingSearch}
					loadingSearch={loadingSearch}
				/>
				<DisplaySummary aiResp={chat?.aiResp} />
			</div>
		</div>
	);
}

export default AnswerDisplay