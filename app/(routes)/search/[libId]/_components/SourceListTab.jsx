import Image from "next/image";
import React from "react";

function SourceListTab({ chat }) {
	return (
		<div>
			{chat?.searchResult?.map((item, index) => (
				<div key={index}>
					<div className="flex gap-2 mt-5 items-center">
						<h2 className="text-gray-600">{index + 1}</h2>
						<Image
							src={item?.img}
							alt={item?.title}
							height={20}
							width={20}
							className="max-h-[20px] max-w-[20px] border rounded-full"
						/>
						<div>
							<h2 className="text-xs">{item?.long_name}</h2>
						</div>
					</div>
					<h2 className="mt-1 line-clamp-1 font-bold text-lg text-gray-600">
						{item?.title}
					</h2>
					<h2 className="mt-1 text-xs text-gray-600">
						{item?.title}
					</h2>
				</div>
			))}
		</div>
	);
}

export default SourceListTab;
