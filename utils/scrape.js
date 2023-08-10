import puppeteer from "puppeteer-core";
 
export async function scrape(url) {

  let browser;
  const auth = process.env.SUPERPROXY_AUTH;

  try {

    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });
    // browser = await puppeteer.launch({
    //   headless: "new", 
    // });
    const page = await browser.newPage();

    // Set navigation timeout to 120 seconds (120000 milliseconds)
    await page.setDefaultNavigationTimeout(120000);

    await page.goto(url);

    // Wait for the specific section element to load
    await page.waitForSelector("body");

    // Extract the plain HTML content of the specific section
    const sectionContent = await page.evaluate(() => {
      const section = document.querySelector("body");	
      if (section && "innerText" in section) {
        return section.innerText;
      } else {
        throw new Error("Section content not found on the page.");
      }
    });

    if (sectionContent) {
      // Remove the \n characters and unnecessary spaces
      const cleanedContent = sectionContent
        .replace(/\n/g, "")
        .replace(/\s{2,}/g, "")
        .trim();

      //console.log(cleanedContent);
      return cleanedContent;

    } else {
      console.log("Section content not found on the page.");
    }

    // Wait for a few seconds before closing the browser (optional)
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error("Scraping failed", e);
  } finally {
    await browser?.close();
  }
}
