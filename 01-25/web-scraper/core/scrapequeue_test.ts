import { assert, assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import scrapeQueue from "./scrapequeue.ts";
import {
  createTestCache as initEmptyCache,
  testPoolLimit,
  testTimeLimit,
} from "../util/test_helpers.ts";

function stubFetch(
  html = "<html>Test</html>",
  failFn?: (url: string) => boolean,
) {
  return stub(globalThis, "fetch", (input: RequestInfo | URL) => {
    const targetUrl = input instanceof URL
      ? input.href
      : typeof input === "string"
      ? input
      : input.url;

    if (failFn?.(targetUrl)) {
      return Promise.reject(
        new TypeError(`Mock fetch failure for ${targetUrl}`),
      );
    }

    return Promise.resolve(
      new Response(html, {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );
  });
}

Deno.test("scrapeQueue: scrapes all URLs and populates pages", async () => {
  const fetchStub = stubFetch();
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["https://example.com", "https://test.com"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(cache.pages.size, 2);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: obeys concurrency limit", async () => {
  const callOrder: string[] = [];
  const fetchStub = stub(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL) => {
      const targetUrl = input instanceof URL
        ? input.href
        : typeof input === "string"
        ? input
        : input.url;

      callOrder.push(targetUrl);
      await new Promise((r) => setTimeout(r, 10));

      return new Response("<html>Test</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    },
  );

  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["1", "2", "3", "4"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(callOrder.length, 4);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: handles one failed URL", async () => {
  const fetchStub = stubFetch(
    "<html>Test</html>",
    (url) => url.includes("fail"),
  );
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["https://example.com", "https://fail.com"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assert(cache.failedurls.has("https://fail.com"));
    assertEquals(cache.pages.size, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: all fail", async () => {
  const fetchStub = stubFetch("<html>Test</html>", () => true);
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["fail1", "fail2"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(cache.pages.size, 0);
    assertEquals(cache.failedurls.size, 2);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: mixed successes and failures", async () => {
  const fetchStub = stubFetch(
    "<html>Test</html>",
    (url) => url.includes("fail"),
  );
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["ok1", "fail1", "ok2", "fail2"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(cache.pages.size, 2);
    assertEquals(cache.failedurls.size, 2);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: respects order of input", async () => {
  const order: string[] = [];
  const fetchStub = stub(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL) => {
      const targetUrl = input instanceof URL
        ? input.href
        : typeof input === "string"
        ? input
        : input.url;

      order.push(targetUrl);
      return new Response("<html>Test</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    },
  );

  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["first", "second", "third"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(order, ["first", "second", "third"]);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: works with poolLimit = 1", async () => {
  const fetchStub = stubFetch();
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["a", "b"]);
    await scrapeQueue(cache, 1, testTimeLimit);
    assertEquals(cache.pages.size, 2);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: works with empty URL set", async () => {
  const fetchStub = stubFetch();
  try {
    const cache = initEmptyCache();
    cache.urls = new Set();
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(cache.pages.size, 0);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: avoids duplicate scraping", async () => {
  const fetchStub = stubFetch();
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["repeat.com", "repeat.com"]);
    await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(cache.pages.size, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("scrapeQueue: correct cache return", async () => {
  const fetchStub = stubFetch();
  try {
    const cache = initEmptyCache();
    cache.urls = new Set(["x", "y"]);
    const updatedCache = await scrapeQueue(cache, testPoolLimit, testTimeLimit);
    assertEquals(updatedCache.pages.size, 2);
  } finally {
    fetchStub.restore();
  }
});
