import { get_job_info, get_person_info, write_cover_letter } from "@/utils/openai";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const res = await request.json();
  const { personText, jobText } = res;
  console.log(res);
  

  try {
    var personInfo = await get_person_info(personText);
  } catch (error) {
    return NextResponse.json({ error: "Error parsing person info" });
  }

  try {
    var jobInfo = await get_job_info(jobText);
  } catch (error) {
    return NextResponse.json({ error: "Error parsing job info" });
  }

  try {
    var coverLetter = await write_cover_letter(personInfo, jobInfo);
    return new Response(JSON.stringify({ coverLetter }));

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error writing cover letter" }));


  }
}
