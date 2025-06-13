import { scrapelog } from "../util/scrapelog.ts";
import { Cake } from "../util/types.ts";
import WebPage from "../util/webpage.ts";
import { buildWebPage } from "./buildwebpage.ts";

export default async function logger(cache: Cake): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(cache);
      resolve(true);
    }, 200);
  });
}

async function logQueue(cache: Cake, poolSize: number): Promise<void> {
  const pages = Array.from(cache.pages.values());
  const queue = [...pages];
  const workers: Promise<void>[] = [];

  for (let i = 0; i < poolSize; i++) {
    const worker = (async () => {
      while (queue.length > 0) {
        const page = queue.pop();
        if (page) {
          try {
            await scrapelog(cache, page);
          } catch (err) {
            console.error(
              `Failed to write log for ${page.title}:`,
              err.message,
            );
          }
        }
      }
    })();
    workers.push(worker);
  }

  await Promise.all(workers);
}
