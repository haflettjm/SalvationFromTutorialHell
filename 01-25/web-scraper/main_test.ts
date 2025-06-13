import { assertEquals } from "@std/assert";
import { loadYamlConfig } from "./util/helpers.ts";
import { Config } from "./util/types.ts";

Deno.test("loadYamlConfig: loads and validates config.yaml correctly", async () => {
  const config: Config = await loadYamlConfig("./config.yaml");

  // Basic structure
  assertEquals(typeof config.poolSize, "number");
  assertEquals(typeof config.timeoutMax, "number");
  assertEquals(Array.isArray(config.webUrls), true);

  // Optional: validate values
  assertEquals(config.poolSize > 0, true);
  assertEquals(config.timeoutMax > 0, true);
  assertEquals(config.webUrls.length > 0, true);
});
