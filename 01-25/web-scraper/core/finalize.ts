import { Cake } from "../util/types.ts";
import { basename, dirname } from "@std/path";
import runReport from "./report.ts";
import { logger } from "./logpages.ts";

async function zipThis(cache: Cake) {
  const zipName = `${cache.outputDir}.zip`;
  const zipCmd = new Deno.Command("zip", {
    args: ["-r", zipName, basename(cache.outputDir)],
    cwd: dirname(cache.outputDir),
  });
  const { code } = await zipCmd.output();

  if (code !== 0) {
    console.error("Failed to zip scrape output.");
  } else {
    console.log(`Scrape archived to ${zipName}`);
  }
}

export async function finalizeScrape(
  cache: Cake,
  start: number,
  poolSize: number,
) {
  await logger(cache, poolSize);
  await runReport(cache);
  await zipThis(cache);
  const duration = performance.now() - start;
  console.log(`Scrape complete ${(duration / 1000).toFixed(3)} seconds`);
}
