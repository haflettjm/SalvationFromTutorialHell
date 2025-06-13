// Log report
// URL
// Timestamp
// Total Dom Nodes
// Unique Tags: div, p, a, img,
// Discovered Links:
// files saved:
import { Cake, LogEntry } from "./types.ts";
import WebPage from "./webpage.ts";
import { exists } from "jsr:@std/fs/exists";
import { join } from "jsr:@std/path";
export async function scrapelog(cache: Cake, page: WebPage): Promise<void> {
  const filename = page.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
    ".json";
  const filepath = join(cache.outputDir, filename);
  try {
    await exists(cache.outputDir);
    const log: LogEntry = {
      url: page.title,
      lastScraped: page.lastScraped,
      nodeCount: page.rootNodes.length,
      htmlLength: (page.raw?.length ?? 0),
      pageData: page,
    };
    await Deno.writeTextFile(filepath, JSON.stringify(log));
  } catch (err) {
    console.error(`Failed to write log for ${page.title}:`, err.message);
    cache.failedLogs.push(page.title);
  }
}
