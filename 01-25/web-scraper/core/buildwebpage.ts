import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";
import { Cake } from "../util/types";
import WebPage from "../util/webpage";
import DOMNode from "../util/nodes";

function DfsWalk(element: Element): DOMNode {
  const text = element.textContent?.trim() ?? undefined;
  const tag = element.tagName;
  const classList: string[] = [];
  for (const clas of element.classList) {
    classList.push(clas);
  }
  const link = element.getAttribute("href") ?? undefined;
  const image = element.tagName.toLowerCase() === "img";
  const imageLink = image
    ? (element.getAttribute("src") ?? undefined)
    : undefined;

  const node = new DOMNode({ text, tag, classList, link, image, imageLink });

  for (const child of element.children) {
    const childNode = dfs(child);
    node.addChild(childNode);
  }
  return node;
}

// So from
export function buildWebPage(
  html: string,
  cache: Cake,
  uri: string,
  force = false,
): Cake {
  // Depth First Search implementation??
  const currentHTML = cache.pages.get(uri);
  if (currentHTML === html && !force) {
    return cache;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  if (!doc || !doc.body) throw new Error("Invalid HTML: missing <body>");

  const page = new WebPage(uri, html);
  for (const child of doc.body.children) {
    const rootNode = DfsWalk(child);
    page.addRootNode(rootNode);
  }

  cache.pageTree.set(uri, page);

  return cache;
}
