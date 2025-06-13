// Log report
// URL
// Timestamp
// Total Dom Nodes
// Unique Tags: div, p, a, img,
// Discovered Links:
// files saved:

import { Cake } from "./types.ts";

export default async function logger(cache: Cake): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(cache);
      resolve(true);
    }, 200);
  });
}
