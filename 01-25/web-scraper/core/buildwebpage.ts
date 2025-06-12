import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";
import { Cake } from "../util/types.ts";
import WebPage from "../util/webpage.ts";
import DOMNode from "../util/nodes.ts";

function DfsWalk(element: Element, cache: Cake): DOMNode {
  const id = `node-${(cache.nextNodeId ??= 0)}`;
  const text = element.textContent?.trim() ?? undefined;
  const tag = element.tagName.toLowerCase();
  const classList: string[] = [];
  for (const clas of element.classList) {
    classList.push(clas);
  }
  const link = element.getAttribute("href") ?? undefined;
  const image = element.tagName.toLowerCase() === "img";
  const imageLink = image
    ? (element.getAttribute("src") ?? undefined)
    : undefined;
  const node = new DOMNode({
    text,
    id,
    tag,
    classList,
    link,
    image,
    imageLink,
  });

  cache.nextNodeId++;
  for (const child of element.children) {
    const childNode = DfsWalk(child, cache);
    node.addChild(childNode);
  }
  return node;
}

export function buildWebPage(
  html: string,
  cache: Cake,
  uri: string,
  force = false,
): Cake {
  // Depth First Search implementation??
  const currentHTML = cache.pages.get(uri);
  if (currentHTML && currentHTML?.raw === html && !force) {
    cache.nextNodeId = 0;
    return cache;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  if (!doc.body || doc.body.childNodes.length === 0) {
    throw new Error("Invalid HTML: missing <body>");
  }

  const page = new WebPage(uri, html);
  for (const child of doc.body.children) {
    const rootNode = DfsWalk(child, cache);
    page.addRootNode(rootNode);
  }
  if (page.rootNodes.length > 0) {
    cache.pageTree.set(uri, page.rootNodes[0]);
  }
  const allNodes = page.getAllNodes();
  cache.sitemap = (cache.sitemap ?? []).concat(allNodes);
  cache.pages.set(uri, page);
  cache.nextNodeId = 0;
  return cache;
}
