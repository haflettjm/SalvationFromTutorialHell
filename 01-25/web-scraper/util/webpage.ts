import type DOMNode from "./nodes";

class WebPage {
  title: string;
  raw?: string;
  rootNodes: DOMNode[];

  constructor(title: string, raw?: string) {
    this.title = title;
    this.raw = raw;
    this.rootNodes = [];
  }
  addRawHTML(html: string): void {
    this.raw = html;
  }

  addRootNode(node: DOMNode): void {
    this.rootNodes.push(node);
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
