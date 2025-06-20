import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { searchInput, searchType } = await req.json();
	if (searchInput) {
		const result = await axios.get(
			`https://api.search.brave.com/res/v1/web/search?q=${searchInput}&count=${6}`,
			{
				headers: {
					Accept: "application/json",
					"Accept-Encoding": "gzip",
					"X-Subscription-Token":
						process.env.NEXT_PUBLIC_BRAVE_API_KEY,
				},
			}
		);
    console.log("Brave API Response in backend: ");
		console.log(result.data);
		return NextResponse.json(result.data);
	} else {
		return NextResponse.json({ Error: "No search input" });
	}
}
