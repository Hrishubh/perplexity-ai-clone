import Image from "next/image";
import React from "react";

function ImageListTab({ chat }) {
	return (
		<div className="flex gap-5 flex-wrap mt-7">
			{console.log("chat in image:")}
			{console.log(chat)}
			{console.log(chat?.searchResult)}
			{chat?.searchResult?.map((item, index) => (
				<div className="relative w-[240px] h-[240px] bg-accent rounded-xl overflow-hidden">
					<Image
						src={item?.thumbnail}
						alt={item?.title}
						fill
						className="object-cover"
						loading="lazy"
						key={index}
					/>
				</div>
			))}
		</div>
	);
}

export default ImageListTab;
