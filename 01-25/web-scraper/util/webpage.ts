import type DOMNode from "./nodes.ts";

class WebPage {
  title: string;
  raw?: string;
  rootNodes: DOMNode[];
  lastScraped: number;

  constructor(title: string, raw?: string) {
    this.title = title;
    this.raw = raw;
    this.rootNodes = [];
    this.lastScraped = 0;
  }
  addRawHTML(html: string): void {
    this.raw = html;
  }

  addRootNode(node: DOMNode): void {
    this.rootNodes.push(node);
  }

  updateDate(): void {
    this.lastScraped = Date.now();
  }

  getAllNodes(): DOMNode[] {
    const all: DOMNode[] = [];

    function traverse(node: DOMNode) {
      all.push(node);
      node.getChildren().forEach(traverse);
    }

    this.rootNodes.forEach(traverse);
    return all;
  }
}

export default WebPage;
