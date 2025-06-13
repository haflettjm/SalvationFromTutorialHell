import cache from "./util/cache.ts";
import { normalizedUrls } from "./util/cleanurls.ts";
import scrapeQueue from "./core/scrapequeue.ts";
import { getEnvOrThrow } from "./util/helpers.ts";

function getRequiredEnvVars(): {
  timeoutN: number;
  poolSizeN: number;
  urls: string[];
} {
  const timeoutN = parseInt(getEnvOrThrow("TIMEOUT_LIMIT"));
  const poolSizeN = parseInt(getEnvOrThrow("POOL_SIZE"));

  const raw = Deno.env.get("WEBSITES");
  if (!raw) throw new Error("WEBSITES is missing in .env");

  let urls: string[];
  try {
    urls = JSON.parse(raw);
  } catch {
    throw new Error("WEBSITES must be a valid JSON array");
  }

  return { timeoutN, poolSizeN, urls };
}
async function main(): Promise<void> {
  try {
    const { timeoutN, poolSizeN, urls } = getRequiredEnvVars();

    const c = cache;
    c.urls = normalizedUrls(urls);

    await scrapeQueue(c, poolSizeN, timeoutN);
    console.log(c);
  } catch (err: unknown) {
    console.error("❌ Error:", err.message);
    Deno.exit(1);
  }
}

main();
