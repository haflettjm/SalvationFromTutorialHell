import HTMLNode from "./htmlnode.ts";

export class WebPage {
  title: string;
  rootNodes: HTMLNode[];

  constructor(title: string) {
    this.title = title;
    this.rootNodes = [];
  }

  addRootNode(node: HTMLNode): void {
    this.rootNodes.push(node);
  }

  getAllNodes(): HTMLNode[] {
    const all: HTMLNode[] = [];

    function traverse(node: HTMLNode) {
      all.push(node);
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    this.rootNodes.forEach(traverse);
    return all;
  }
}
