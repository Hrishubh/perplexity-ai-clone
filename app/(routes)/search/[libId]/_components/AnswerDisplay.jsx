import Image from 'next/image';
import React from 'react'

function AnswerDisplay({ searchResult }) {
	const webResult = searchResult?.web?.results;
	return (
		<div>
			<div className="flex gap-2 flex-wrap mt-5">
				{webResult?.map((item, index) => (
					<div
						key={index}
						className="p-3 bg-accent hover:bg-[#e1e3da] rounded-lg w-[250px] cursor-pointer"
						onClick={() => window.open(item?.url, "_blank")}
					>
						<div className="flex gap-2 items-center">
							<Image
								src={item?.profile?.img}
								alt={item?.profile?.name}
								height={20}
								width={20}
								className="max-h-[20px] max-w-[20px] rounded-full"
							/>
							<h2 className="text-xs">
								{item?.profile?.long_name}
							</h2>
						</div>
						<h2 className="line-clamp-2 text-black text-xs">
							{item?.description}
						</h2>
					</div>
				))}
			</div>
		</div>
	);
}

export default AnswerDisplay