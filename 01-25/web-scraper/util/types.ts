import WebPage from "./webpage.ts";
import DOMNode from "./nodes.ts";

// Cache Definition
export type Cake = {
  urls: Set<string>;
  failedurls: Set<string>;
  pages: Map<string, WebPage>;
  images: Map<string, Blob>;
  rawResponses: Map<string, Response>;
  sitemap?: DOMNode[];
  pageTree: Map<string, DOMNode>;
  nodeById?: Map<string, DOMNode>;
  nodesByTag?: Map<string, DOMNode[]>;
  nodesByLink?: Map<string, DOMNode[]>;
  nextNodeId?: number;
  outputDir: string;
  failedLogs: string[];
};

export type Config = {
  timeoutMax: number;
  poolSize: number;
  webUrls: string[];
};

export type LogEntry = {
  url: string;
  lastScraped: Date;
  nodeCount: number;
  htmlLength: number;
  pageData: WebPage;
};
