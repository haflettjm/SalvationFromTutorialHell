export default const cache = {
  pages: new Map<string, WebPage>(),
  images: new Map<string, Blob>(),
  rawResponses: new Map<string, Response>(),
  sitemap?: string[],
/// Thinking maybe i should do more here?
} 
