import { join } from "@std/path/join";
import { scrapelog } from "../util/scrapelog.ts";
import { Cake } from "../util/types.ts";
import { exists } from "@std/fs/exists";

export async function logger(
  cache: Cake,
  poolSize: number,
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = `.${cache.outputDir}scrape-${timestamp}`;
  const pagesDir = join(outDir, "pages");
  await exists(pagesDir);
  try {
    await logQueue(cache, poolSize);
  } catch (err) {
    console.error(`log Queue broke sad:`, err.message);
  }
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
