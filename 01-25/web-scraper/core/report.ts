import { join } from "@std/path/join";
import { Cake } from "../util/types.ts";

export default async function runReport(cache: Cake) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = `.${cache.outputDir}scrape-${timestamp}`;
  const pagesDir = join(outDir, "pages");
  const reportPath = join(cache.outputDir, "report.txt");
  const report = `
  Scrape Summary - ${new Date().toLocaleString()}
  Pages scraped: ${cache.pages.size}
  Failures: ${cache.failedurls.size}
  Output directory: ${pagesDir}
  `.trim();

  await Deno.writeTextFile(reportPath, report);
}
