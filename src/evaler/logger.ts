import { NodeType, type Node } from "./tree"

export class ASTLogger {

    constructor(root: Node, public htmlroot: HTMLElement, public width: number, public height: number) {

        htmlroot.innerHTML = ""
        htmlroot.appendChild(this.log(root))
    }

    create_node(text: string): HTMLElement {
        const div = document.createElement("div")
        const span = document.createElement("span")
        span.innerText = text
        div.appendChild(span)

        return div;
    }

    log(node: Node): HTMLElement {

        let s = this.node_to_text(node);
        let n = this.create_node(s);

        if (node.left) {
            n.appendChild(this.log(node.left));
        }
        if (node.right) {
            n.appendChild(this.log(node.right));
        }

        return n;

    }

    node_to_text(node_tree: Node): string {
        switch (node_tree.type) {
            case NodeType.Number:
                return String(node_tree.value)
            case NodeType.Add:
                return "+"
            case NodeType.Sub:
                return "-"
            case NodeType.Div:
                return "/"
            case NodeType.Mul:
                return "*"
            case NodeType.Pow:
                return "^"
            case NodeType.Error:
                return "err"
            default:
                return ""
        }
    }
}