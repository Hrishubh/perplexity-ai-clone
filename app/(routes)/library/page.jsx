"use client";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

function Library() {
	const { user } = useUser();
	const [libraryHistory, selectLibraryHistory] = useState();
	const router = useRouter();

	useEffect(() => {
		user && GetLibraryHistory();
	}, [user]);

	const GetLibraryHistory = async () => {
		let { data: Library, error } = await supabase
			.from("Library")
			.select("*")
			.eq("userEmail", user?.primaryEmailAddress?.emailAddress)
			.order("id", { ascending: false });
		console.log("Library History for Library Tab:");
		console.log(Library);
		selectLibraryHistory(Library);
	};

	return (
		<div className="mt-20 px-10 md:px-20 lg:px-36 xl:px-56">
			<h2 className="font-bold text-2xl">Library</h2>
			<div className="mt-7">
				{libraryHistory?.map((item, index) => (
					<div
						key={index}
						className="cursor-pointer"
						onClick={() => router.push("/search/" + item.libId)}
					>
						<div className="flex justify-between">
							<div>
								<h2 className="font-bold">
									{item.searchInput}
								</h2>
								<p className="text-xs text-gray-500">
									{moment(item.created_at).fromNow()}
								</p>
							</div>
							<SquareArrowOutUpRight className="h-4 w-4" />
						</div>
						<hr className="my-4" />
					</div>
				))}
			</div>
		</div>
	);
}

export default Library;
