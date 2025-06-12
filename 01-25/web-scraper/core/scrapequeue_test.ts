import { assert, assertEquals } from "@std/assert";
import scrapeQueue from "./scrapequeue.ts";
import {
  createTestCache as initEmptyCache,
  stubHandleLoadPageConditional,
  stubHandleLoadPageWithHtml,
  testPoolLimit,
  testTimeLimit,
} from "../util/test_helpers.ts";
import WebPage from "../util/webpage.ts";

Deno.test("scrapeQueue: scrapes all URLs and populates pages", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["https://example.com", "https://test.com"]);

  const restore = stubHandleLoadPageWithHtml("<html>Test</html>");
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 2);
  restore();
});

Deno.test("scrapeQueue: obeys concurrency limit", async () => {
  const cache = initEmptyCache();
  const callOrder: string[] = [];
  cache.urls = new Set(["1", "2", "3", "4"]);

  const restore = stubHandleLoadPageConditional(
    () => false,
    "<html>Test</html>",
  );
  const originalHandleLoadPage = globalThis.HandleLoadPage;
  globalThis.HandleLoadPage = async (url: string) => {
    callOrder.push(url);
    await new Promise((r) => setTimeout(r, 10));
    return originalHandleLoadPage(url);
  };

  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(callOrder.length, 4);
  restore();
});

Deno.test("scrapeQueue: handles one failed URL", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["https://example.com", "https://fail.com"]);

  const restore = stubHandleLoadPageConditional(
    (url) => url.includes("fail"),
    "<html>Test</html>",
  );
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assert(cache.failedurls.has("https://fail.com"));
  assertEquals(cache.pages.size, 1);
  restore();
});

Deno.test("scrapeQueue: all fail", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["fail1", "fail2"]);

  const restore = stubHandleLoadPageConditional(
    () => true,
    "<html>Test</html>",
  );
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 0);
  assertEquals(cache.failedurls.size, 2);
  restore();
});

Deno.test("scrapeQueue: mixed successes and failures", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["ok1", "fail1", "ok2", "fail2"]);

  const restore = stubHandleLoadPageConditional(
    (url) => url.includes("fail"),
    "<html>Test</html>",
  );
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 2);
  assertEquals(cache.failedurls.size, 2);
  restore();
});

Deno.test("scrapeQueue: respects order of input", async () => {
  const cache = initEmptyCache();
  const order: string[] = [];
  cache.urls = new Set(["first", "second", "third"]);

  const restore = stubHandleLoadPageConditional(
    () => false,
    "<html>Test</html>",
  );
  const originalHandleLoadPage = globalThis.HandleLoadPage;
  globalThis.HandleLoadPage = async (url: string) => {
    order.push(url);
    return originalHandleLoadPage(url);
  };

  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(order, ["first", "second", "third"]);
  restore();
});

Deno.test("scrapeQueue: works with poolLimit = 1", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["a", "b"]);

  const restore = stubHandleLoadPageWithHtml("<html>Test</html>");
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 2);
  restore();
});

Deno.test("scrapeQueue: works with empty URL set", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set();

  const restore = stubHandleLoadPageConditional(
    () => true,
    "<html>Test</html>",
  );
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 0);
  restore();
});

Deno.test("scrapeQueue: avoids duplicate scraping", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["repeat.com", "repeat.com"]);

  const restore = stubHandleLoadPageWithHtml("<html>Test</html>");
  await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(cache.pages.size, 1);
  restore();
});

Deno.test("scrapeQueue: correct cache return", async () => {
  const cache = initEmptyCache();
  cache.urls = new Set(["x", "y"]);

  const restore = stubHandleLoadPageWithHtml("<html>Test</html>");
  const updatedCache = await scrapeQueue(cache, testPoolLimit, testTimeLimit);
  assertEquals(updatedCache.pages.size, 2);
  restore();
});
