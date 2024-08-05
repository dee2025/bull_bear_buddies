// app/api/scrape/route.js
import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  const url = "https://ipocentral.in/ipo-discussion/";

  try {
    // Fetch the HTML content from the URL
    const { data } = await axios.get(url);
    console.log("HTML data fetched successfully");

    const $ = cheerio.load(data);

    // Check if the table exists
    if (!$("#tablepress-57").length) {
      throw new Error("Table not found");
    }

    // Select the table rows
    const rows = $("#tablepress-57 tbody tr");
    const result = [];

    rows.each((index, row) => {
      const cells = $(row).find("td");
      const ipoName = $(cells[0]).find("a").text().trim();
      const date =
        $(cells[0])
          .text()
          .match(/\(\d{1,2} – \d{1,2} \w{3}\)/)?.[0]
          ?.trim() || "N/A";
      const price = $(cells[1]).text().trim();
      const gmp = $(cells[3]).text().trim();

      result.push({
        ipoName,
        date,
        price,
        gmp,
      });
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Error fetching or parsing the data", {
      status: 500,
    });
  }
}
