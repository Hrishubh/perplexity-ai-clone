import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { runId } = await req.json();
	const response = await axios.get(
		`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
		{
			headers: {
				Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
			},
		}
	);
	return NextResponse.json(response.data);
}
