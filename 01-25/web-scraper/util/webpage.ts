import type DOMNode from "./nodes";

class WebPage {
  title: string;
  rootNodes: DOMNode[];

  constructor(title: string) {
    this.title = title;
    this.rootNodes = [];
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
