import type { Cake } from "./types.ts";
const cache: Cake = {
  urls: new Set(),
  failedurls: new Set(),
  pages: new Map(),
  images: new Map(),
  rawResponses: new Map(),
  pageTree: new Map(),
};

export default cache;
