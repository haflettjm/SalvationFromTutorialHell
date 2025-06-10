import cache from "./util/cache.ts";
import { HandleLoadPage } from "./core/request.ts";

const testURI: string = "https://www.web-scraping.dev";

async function main(): Promise<void> {
  const response = await HandleLoadPage(testURI);
  cache.pages.set(testURI, response.body);
  console.log(cache.pages);
}

main();
