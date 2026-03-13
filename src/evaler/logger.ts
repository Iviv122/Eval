import { NodeType, type Node } from "./tree"

export class ASTLogger {


    constructor(root: Node, public ctx: CanvasRenderingContext2D, public width: number, public height: number) {

        this.ctx.clearRect(0, 0, 1000, 1000)
        ctx.fillStyle = "white"
        this.log(root, 0, 50)
    }

    place(s: string, x: number, y: number) {

        let rx = this.width/2+x;

        this.ctx.beginPath();
        this.ctx.arc(rx, y, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "15px Arial";
        this.ctx.fillText(s, rx, y);

    }

    place_line(x1 : number, y1 : number, x2 : number, y2 : number){

        let rx1 = this.width/2+x1;
        let rx2 = this.width/2+x2;

        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(rx1, y1);
        this.ctx.lineTo(rx2, y2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }

    log(node: Node, x: number, y: number) {

        let s = this.node_to_text(node);

        if (node.left){
            this.place_line(x,y,x-45,y+45);
            this.log(node.left,x-45,y+45);
        } 
        if (node .right){
            this.place_line(x,y,x+45,y+45);
            this.log(node.right,x+45,y+45);
        }

        this.place(s,x,y)

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