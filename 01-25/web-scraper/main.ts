import cache from "./util/cache.ts";
import { normalizedUrls } from "./util/cleanurls.ts";
import scrapeQueue from "./core/scrapequeue.ts";
import { loadYamlConfig } from "./util/helpers.ts";
import { Config } from "./util/types.ts";
import { logger } from "./core/logpages.ts";
import { finalizeScrape } from "./core/finalize.ts";
import { ensureDir } from "jsr:@std/fs";

const outFolder = "scrapes/";
async function parseConfig(path: string): Promise<Config> {
  const config = await loadYamlConfig(path);

  return Promise.resolve(config);
}
async function main(): Promise<void> {
  const start = performance.now();
  try {
    const config: Config = await parseConfig("./config.yaml");
    const c = cache;
    c.outputDir = outFolder;
    await ensureDir(c.outputDir);
    c.urls = normalizedUrls(config.webUrls);
    await scrapeQueue(c, config.poolSize, config.timeoutMax);
    await logger(cache, config.poolSize);
    await finalizeScrape(cache, start, config.poolSize);
    console.log(`📁 Output saved to: ${Deno.realPathSync(cache.outputDir)}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    Deno.exit(1);
  }
}

main();
