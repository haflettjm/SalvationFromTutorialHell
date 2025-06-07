interface HTMLNode {
  // May be empty but may contain stuff who knows
  text?: string;
  // List of children here
  children?: HTMLNode[];
  parent?: HTMLNode;
  htmlclass: string;
  link?: string;
  image: boolean;
  imageLink?: string;
}

class DOMNode implements HTMLNode {
  text?: string | undefined;
  parent?: HTMLNode | undefined;
  link?: string;
  htmlclass: string;
  image: boolean | false;
  imageLink?: string | undefined;

  private children: HTMLNode[] = [];

  constructor(options: {
    text?: string;
    htmlclass: string;
    link?: string;
    image?: boolean;
    imageLink?: string;
    parent?: HTMLNode;
  }) {
    this.text = options.text;
    this.htmlclass = options.htmlclass;
    this.link = options.link;
    this.image = options.image ?? false;
    this.imageLink = options.imageLink;
    this.parent = options.parent;
  }

  addChild(node: HTMLNode): void {
    node.parent = this;
    this.children.push(node);
  }
}
