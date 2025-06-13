import WebPage from "../util/webpage.ts";
import { stub } from "@std/testing/mock";
import type { Cake } from "../util/types.ts";
export const testTimeLimit = 500;
export const testPoolLimit = 5;
declare global {
  var HandleLoadPage: typeof import("../core/request.ts").HandleLoadPage;
}
export function stubGlobalFetch(
  html: string,
  failCondition?: (url: string) => boolean,
): () => void {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const url = input instanceof URL
      ? input.href
      : typeof input === "string"
      ? input
      : input.url;

    if (failCondition?.(url)) {
      throw new TypeError(`Mocked fetch failure for ${url}`);
    }

    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  };

  return () => {
    globalThis.fetch = originalFetch;
  };
}
/** Returns a fresh cache object for tests */
export function createTestCache(): Cake {
  const cache: Cake = {
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
  return cache;
}

/**
 * Stubs HandleLoadPage to always return success with the provided HTML string.
 * Returns a restore function.
 */
export function stubHandleLoadPageWithHtml(html: string): () => void {
  const original = globalThis.HandleLoadPage;

  globalThis.HandleLoadPage = (
    url: string,
  ): Promise<{ response: Response; data: WebPage }> => {
    return Promise.resolve({
      response: new Response("OK"),
      data: new WebPage(url, html),
    });
  };

  return () => {
    globalThis.HandleLoadPage = original;
  };
}

/**
 * Stubs globalThis.HandleLoadPage to fail on certain URLs.
 * `failOn(url)` returns true if that URL should throw.
 */
export function stubHandleLoadPageConditional(
  failOn: (url: string) => boolean,
  html: string,
): () => void {
  const original = globalThis.HandleLoadPage;

  globalThis.HandleLoadPage = (
    url: string,
  ): Promise<{ response: Response; data: WebPage }> => {
    if (failOn(url)) {
      throw new Error("Intentional failure");
    }
    return Promise.resolve({
      response: new Response(`Fetched ${url}`),
      data: new WebPage(url, html),
    });
  };

  return () => {
    globalThis.HandleLoadPage = original;
  };
}
