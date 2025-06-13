import { parse } from "jsr:@std/yaml";
import { Config } from "./types.ts";
export function getEnvOrThrow(key: string): string {
  const val = Deno.env.get(key);
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}
async function fileExists(path: string): Promise<boolean> {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile;
  } catch (_err) {
    return false;
  }
}
export async function loadYamlConfig(path: string): Promise<Config> {
  if ((!await fileExists(path))) {
    throw new Error(`Config file not found: ${path}`);
  }
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(await Deno.readFile(path));

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
  return {
    poolSize: config.POOL_SIZE,
    timeoutMax: config.TIMEOUT_LIMIT,
    webUrls: config.WEBSITES,
  };
}
