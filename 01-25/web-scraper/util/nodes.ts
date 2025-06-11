interface HTMLNode {
  // May be empty but may contain stuff who knows
  text?: string;
  // List of children here
  children?: HTMLNode[];
  parent?: HTMLNode;
  tag: string;
  classList: string[];
  link?: string;
  image: boolean;
  imageLink?: string;
}

class DOMNode implements HTMLNode {
  id: string;
  text?: string;
  tag: string;
  parent?: DOMNode;
  link?: string;
  classList: string[];
  image: boolean = false;
  imageLink?: string;
  children: DOMNode[] = [];

  constructor(options: {
    id: string;
    text?: string;
    tag: string;
    link?: string;
    image?: boolean;
    imageLink?: string;
    classList: string[];
    parent?: DOMNode;
  }) {
    this.id = options.id;
    this.text = options.text;
    this.tag = options.tag;
    this.link = options.link;
    this.image = options.image ?? false;
    this.imageLink = options.imageLink;
    this.parent = options.parent;
    this.classList = options.classList ?? [];
  }

  addChild(node: DOMNode): void {
    node.parent = this;
    this.children.push(node);
  }

  getChildren(): DOMNode[] {
    return this.children;
  }

  addClass(cl: string): void {
    this.classList.push(cl);
  }

  getClass(): string[] {
    return this.classList;
  }

  removeChild(node: DOMNode): void {
    const index = this.children.indexOf(node);
    if (index !== -1) {
      this.children.splice(index, 1); // Fix: remove exactly one item
    }
  }

  setLink(link: string): void {
    this.link = link;
  }

  setImage(imageLink: string): void {
    this.image = true;
    this.imageLink = imageLink;
  }
}

export default DOMNode;
