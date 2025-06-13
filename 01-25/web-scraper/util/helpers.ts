import { parse, stringify } from "jsr:@std/yaml";
import { readTextFile } from "jsr:@std/fs";
export function getEnvOrThrow(key: string): string {
  const val = Deno.env.get(key);
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}
async function loadYamlConfig(path: string) {
  const text = await readTextFile(path);
  const config = parse(text) as {
    POOL_SIZE: number;
    TIMEOUT_LIMIT: number;
    WEBSITES: string[];
  };

  if (
    !config.POOL_SIZE || !config.TIMEOUT_LIMIT ||
    !Array.isArray(config.WEBSITES)
  ) {
    throw new Error(
      "YAML config is missing required fields or has wrong types.",
    );
  }

  return config;
}
