import type DOMNode from "./nodes.ts";

class WebPage {
  title: string;
  raw?: string;
  rootNodes: DOMNode[];
  lastScraped: Date;

  constructor(title: string, raw?: string) {
    this.title = title;
    this.raw = raw;
    this.rootNodes = [];
    this.lastScraped = new Date();
  }
  addRawHTML(html: string): void {
    this.raw = html;
  }

  addRootNode(node: DOMNode): void {
    this.rootNodes.push(node);
  }

  updateDate(): void {
    this.lastScraped = new Date();
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
  toSerializable() {
    return {
      title: this.title,
      rootNodes: this.rootNodes.map((node) => node.toSerializable?.()),
      lastScraped: this.lastScraped,
    };
  }
}

export default WebPage;
