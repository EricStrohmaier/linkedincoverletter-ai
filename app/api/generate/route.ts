import { get_job_info, get_person_info, write_cover_letter } from "@/utils/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { personJson, jobJson } = res;
  console.log("this the person ",personJson);
  console.log("this the job ",jobJson);
  
  try {
    var coverLetter = await write_cover_letter(personJson, jobJson);
    //console.log("coverLetter", coverLetter);
    return new Response(JSON.stringify({ coverLetter }));

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error writing cover letter" }));
  }
}
