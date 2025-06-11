import WebPage from "./webpage.ts";
import DOMNode from "./nodes.ts";

// Cache Definition
export type Cake = {
  pages: Map<string, WebPage>;
  images: Map<string, Blob>;
  rawResponses: Map<string, Response>;
  sitemap?: string[];
  pageTree: Map<string, DOMNode>;
};
