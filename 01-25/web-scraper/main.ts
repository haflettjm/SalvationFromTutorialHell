import cache from "./util/cache";

const testURI: string = "https://www.web-scraping.dev";

async function main(): Promise<void> {
  const response = await fetch(new URL(testURI));
  console.log(response.body);
}

main();
