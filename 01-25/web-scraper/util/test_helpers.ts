import WebPage from "../util/webpage.ts";
import { stub } from "jsr:@std/testing/mock";
import { HandleLoadPage } from "../core/request.ts";
import type { Cake } from "../util/types.ts";

export const testTimeLimit = 5000;
export const testPoolLimit = 5;

/** Returns a fresh cache object for tests */
export function createTestCache(): Cake {
  return {
    urls: new Set(),
    failedurls: new Set(),
    pages: new Map(),
    images: new Map(),
    rawResponses: new Map(),
    pageTree: new Map(),
    sitemap: [],
    nodeById: new Map(),
    nodesByTag: new Map(),
    nodesByLink: new Map(),
    nextNodeId: 0,
  };
}

/**
 * Stubs HandleLoadPage to always return success with the provided HTML string.
 * Returns a restore function.
 */
export function stubHandleLoadPageWithHtml(html: string) {
  return stub(
    { HandleLoadPage },
    "HandleLoadPage",
    async (url: string): Promise<{ response: Response; data: WebPage }> => {
      return {
        response: new Response("OK"),
        data: new WebPage(url, html),
      };
    },
  );
}

/**
 * Stubs HandleLoadPage with conditional failure logic.
 * `failOn(url)` returns true if that URL should fail.
 * Returns a restore function.
 */
export function stubHandleLoadPageConditional(
  failOn: (url: string) => boolean,
  html: string,
) {
  return stub(
    { HandleLoadPage },
    "HandleLoadPage",
    async (url: string): Promise<{ response: Response; data: WebPage }> => {
      if (failOn(url)) throw new Error("Intentional failure");
      return {
        response: new Response(`Fetched ${url}`),
        data: new WebPage(url, html),
      };
    },
  );
}
