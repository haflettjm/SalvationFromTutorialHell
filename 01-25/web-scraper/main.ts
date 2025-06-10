import cache from "./util/cache.ts";
import { HandleLoadPage } from "./core/request.ts";

const testURI: string = "https://www.web-scraping.dev";

async function main(): Promise<void> {
  const { response, data } = await HandleLoadPage(testURI);
  cache.rawResponses.set(testURI, response);
  cache.pages.set(testURI, data);
  console.log(cache.pages.get(testURI));
  console.log(cache.rawResponses.get(testURI));
}

main();
