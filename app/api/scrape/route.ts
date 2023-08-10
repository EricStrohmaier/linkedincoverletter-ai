import { scrape } from "@/utils/scrape";


export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { pageURL } = requestData;
  
    const pageRes = await scrape(pageURL);
    
    return new Response(JSON.stringify(pageRes));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Invalid person URL" }));
  }
}

    // REMOVES the JSON ERRROR
//old code
//     return NextResponse.json({ error: "Invalid person URL" });
//   }
//   return NextResponse.json(pageRes);
// }
