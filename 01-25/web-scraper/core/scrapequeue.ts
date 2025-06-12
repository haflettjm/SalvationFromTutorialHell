import { Cake } from "../util/types.ts";
import WebPage from "../util/webpage.ts";
import { HandleLoadPage } from "./request.ts";

// Create the list of total URLs to crawl
// Promise.all() to launch all crawls concurrently

// Enforce a limit using a concurrency pool
// Each Crawl writes the logs to a seperate directory.

// gets url from pool to scrape sends scrape request to single url then loads page
async function scrape(url: string, cache: Cake): Promise<WebPage> {
  const { response, data } = await HandleLoadPage(url);
  cache.rawResponses.set(url, response);
  cache.pages.set(url, data);
  return data;
}
async function safeScrape(url: string, cache: Cake): Promise<WebPage | null> {
  try {
    return await scrape(url, cache);
  } catch (err) {
    console.error(`Failed to scrape ${url}:`, err);
    cache.failedurls.add(url);
    return null;
  }
}

export default async function scrapeQueue(
  cache: Cake,
  poolLimit: number,
  batchWait: number,
) {
  const allUrls: string[] = [...cache.urls];
  const pool = [];
  for (let i = 0; i < allUrls.length; i += poolLimit) {
    console.log(
      `Scaping chunk ${i / poolLimit + 1} of ${Math.ceil(allUrls / poolLimit)}`,
    );
    const chunk = allUrls.slice(i, i + poolLimit);
    const tasks = chunk.map((url) => safeScrape(url, cache));
    await Promise.all(tasks);
    await new Promise((r) => setTimeout(r, batchWait)); // 1 second pause
  }
  return cache;
}
