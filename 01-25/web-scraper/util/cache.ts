type Cache = {
  pages: new Map<string, WebPage>,
  images: new Map<string, Blob>,
  rawResponses: new Map<string, Response>,
  sitemap?: string[],
  pageTree: new Map<string, HTMLNode>,
}
