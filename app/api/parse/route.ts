import { get_job_info, get_person_info } from "@/utils/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { personText, jobText } = await request.json();

    console.log("Received data:", { personText, jobText });

    const personInfo = await get_person_info(personText);
    const jobInfo = await get_job_info(jobText);

    return NextResponse.json({ personInfo, jobInfo });
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Invalid JSON in the request" }), {
        status: 400, // Bad Request
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, // Internal Server Error
    });
  }
}
