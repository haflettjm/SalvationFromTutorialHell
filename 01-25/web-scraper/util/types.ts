type Cake = {
  pages: Map<string, WebPage>;
  images: Map<string, Blob>;
  rawResponses: Map<string, Response>;
  sitemap?: string[];
  pageTree: Map<string, HTMLNode>;
};
