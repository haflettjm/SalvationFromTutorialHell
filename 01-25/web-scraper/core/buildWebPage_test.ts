import {
  assertEquals,
  assertThrows,
  assertExists,
  assertInstanceOf,
  assertNotEquals,
} from "@std/assert";
import { buildWebPage } from "./buildwebpage.ts";
import { Cake } from "../util/types.ts";
import DOMNode from "../util/nodes.ts";

const htmlSample: string = `<div class="root"><p>Hello <a href="/about">World</a></p></div>`;
const exampleurl: string = "https://example.com";
const aNode = new DOMNode({
  text: "World",
  tag: "a",
  link: "/about",
  image: false,
  classList: [],
  id: `node-2`,
});

const pNode = new DOMNode({
  text: "Hello",
  tag: "p",
  image: false,
  classList: [],
  id: `node-1`,
});
pNode.addChild(aNode);

const divNode = new DOMNode({
  text: "",
  tag: "div",
  classList: ["root"],
  image: false,
  id: `node-0`,
});
divNode.addChild(pNode);

function initEmptyCache(): Cake {
  return {
    pages: new Map(),
    images: new Map(),
    rawResponses: new Map(),
    sitemap: [],
    pageTree: new Map(),
    nextNodeId: 0,
  };
}

Deno.test("stores DOM tree root in pageTree", () => {
  const cache = initEmptyCache();
  buildWebPage(htmlSample, cache, "https://example.com");

  const root = cache.pageTree.get("https://example.com");
  assertExists(root);
  assertInstanceOf(root, DOMNode);
  assertEquals(root?.tag, "div");
  assertEquals(root?.classList.includes("root"), true);
});
Deno.test("stores child DOMNode tree correctly", () => {
  const cache = initEmptyCache();
  buildWebPage(htmlSample, cache, "https://example.com");

  const root = cache.pageTree.get("https://example.com")!;
  const pNode = root.getChildren()[0];
  const aNode = pNode.getChildren()[0];

  assertEquals(pNode.tag, "p");
  assertEquals(aNode.tag, "a");
  assertEquals(aNode.link, "/about");
  assertEquals(aNode.text, "World");
});
Deno.test("Skips rebuild if HTML matches and force is false", () => {
  const cache = initEmptyCache();
  buildWebPage(htmlSample, cache, exampleurl);

  const beforeNode = cache.pageTree.get(exampleurl);

  buildWebPage(htmlSample, cache, exampleurl, false);

  const afterNode = cache.pageTree.get(exampleurl);
  assertEquals(beforeNode, afterNode);
});

Deno.test("skips parsing if HTML hasn't changed and force is false", () => {
  const cache = initEmptyCache();
  // First build
  buildWebPage(htmlSample, cache, "https://example.com");
  const firstNode = cache.pageTree.get("https://example.com");

  // Try again with identical HTML, no force
  buildWebPage(htmlSample, cache, "https://example.com");

  const secondNode = cache.pageTree.get("https://example.com");

  // Should be the exact same object reference
  assertEquals(firstNode, secondNode);
});
Deno.test("rebuilds and overwrites pageTree entry when force is true", () => {
  const cache = initEmptyCache();

  // First build
  buildWebPage(htmlSample, cache, "https://example.com");
  const firstNode = cache.pageTree.get("https://example.com");

  // Change HTML + force rebuild
  buildWebPage(
    `<div><p>Changed!</p></div>`,
    cache,
    "https://example.com",
    true,
  );
  const secondNode = cache.pageTree.get("https://example.com");

  // Should not be the same reference
  assertNotEquals(firstNode, secondNode);
  assertEquals(secondNode?.tag, "div");
  assertEquals(secondNode?.getChildren()[0]?.text, "Changed!");
});

Deno.test("throws error on invalid HTML (missing <body>)", () => {
  const badHtml = "<html><head><title>This is just span</title></head></html>";
  const cache = initEmptyCache();

  assertThrows(
    () => {
      buildWebPage(badHtml, cache, "");
    },
    Error,
    "Invalid HTML: missing <body>",
  );
});
