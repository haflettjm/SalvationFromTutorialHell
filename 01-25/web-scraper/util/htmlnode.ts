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
  children: HTMLNode[] = [];

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

  addChild(node: HTMLNode) {
    node.parent = this;
    this.children.push(node);
  }

  getChildren(): HTMLNode[] {
    return this.children;
  }

  removeChild(node: HTMLNode) {
    const indexToRemove = this.children.indexOf(node);
    if (indexToRemove !== -1) {
      this.children = this.children.splice(indexToRemove);
    }
  }

  setLink(node: HTMLNode, link: string) {
    this.link = link;
  }
  setImage(node: HTMLNode, imageLink: string) {
    this.image = true;
    this.imageLink = imageLink;
  }
}
