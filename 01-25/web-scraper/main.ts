import cache from "./util/cache.ts";
import { normalizedUrls } from "./util/cleanurls.ts";
import scrapeQueue from "./core/scrapequeue.ts";
import { loadYamlConfig } from "./util/helpers.ts";
import { Config } from "./util/types.ts";

async function parseConfig(path: string): Promise<Config> {
  const config = await loadYamlConfig(path);

  return Promise.resolve(config);
}
async function main(): Promise<void> {
  try {
    const config: Config = await parseConfig("./config.yaml");

    const c = cache;
    c.urls = normalizedUrls(config.webUrls);

    await scrapeQueue(c, config.poolSize, config.timeoutMax);
    console.log(c);
  } catch (err) {
    console.error("❌ Error:", err.message);
    Deno.exit(1);
  }
}

main();
