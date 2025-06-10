import WebPage from "./webpage";
import DOMNode from "./nodes";

// Cache Definition
export type Cake = {
  pages: Map<string, WebPage>;
  images: Map<string, Blob>;
  rawResponses: Map<string, Response>;
  sitemap?: string[];
  pageTree: Map<string, DOMNode>;
};
