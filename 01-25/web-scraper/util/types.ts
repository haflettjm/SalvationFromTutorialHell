import WebPage from "./webpage.ts";
import DOMNode from "./nodes.ts";

// Cache Definition
export type Cake = {
  pages: Map<string, WebPage>;
  images: Map<string, Blob>;
  rawResponses: Map<string, Response>;
  sitemap?: DOMNode[];
  pageTree: Map<string, DOMNode>;
  nodeById?: Map<string, DOMNode>;
  nodesByTag?: Map<string, DOMNode[]>;
  nodesByLink?: Map<string, DOMNode[]>;
  nextNodeId?: number;
};
