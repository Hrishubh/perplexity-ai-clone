import Image from "next/image";
import React from "react";

function ImageListTab({ chat }) {
	return (
		<div className="flex gap-5 flex-wrap mt-7">
			{console.log("chat in image:")}
			{console.log(chat)}
      {console.log(chat?.searchResult)}
			{chat?.searchResult?.map((item, index) => (
				<Image className="bg-accent rounded-xl"
					loading="lazy"
					src={item?.thumbnail}
					alt={item?.title}
					height={240}
					width={240}
					key={index}
				/>
			))}
		</div>
	);
}

export default ImageListTab;
