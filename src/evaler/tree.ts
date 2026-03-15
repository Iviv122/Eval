import { tokenize, TokenType, type Token } from "./lexer";

export type Node = {

    type: NodeType
    value: number

    left: Node
    right: Node
};

export enum NodeType {
    Error,
    Number,
    Positive,
    Negative,
    Add,
    Sub,
    Mul,
    Div,
    Pow
}

export enum Precedence {
    Min = 0,
    Term = 1,
    Factor = 2,
    Power = 3
}

const precedence = new Map<TokenType, Precedence>([
    [TokenType.End, Precedence.Min],
    [TokenType.Err, Precedence.Min],
    [TokenType.OperationParClose, Precedence.Min],
    [TokenType.OperationPlus, Precedence.Term],
    [TokenType.OperationMinus, Precedence.Term],
    [TokenType.OperationMultiply, Precedence.Factor],
    [TokenType.OperationDivide, Precedence.Factor],
    [TokenType.OperationPow, Precedence.Power]
]);

export class AST {

    index = 0
    tokens: Token[]
    curr: Token

    root: Node | undefined

    constructor(s: string) {
        console.clear();
        this.tokens = tokenize(s);
        this.curr = this.tokens[0];
        this.root = undefined
    }
    evaluate(): Number {
        this.root = this.parse_expresion(Precedence.Min);
        return this.evaluate_node(this.root);
    }

    evaluate_node(node: Node): number {

        switch (node.type) {
            case NodeType.Number:
                return node.value
            case NodeType.Add:
                return this.evaluate_node(node.left) + this.evaluate_node(node.right);
            case NodeType.Sub:
                return this.evaluate_node(node.left) - this.evaluate_node(node.right);
            case NodeType.Div:
                return this.evaluate_node(node.left) / this.evaluate_node(node.right);
            case NodeType.Mul:
                return this.evaluate_node(node.left) * this.evaluate_node(node.right);
            case NodeType.Pow:
                return Math.pow(this.evaluate_node(node.left), this.evaluate_node(node.right))
            default:
                break;
        }

        return 0;
    }

    parse_number(): Node {

        let ret = { type: NodeType.Number, value: this.curr.value } as Node;
        this.next_token();
        return ret;
    }

    parse_terminal_expr(): Node {
        let ret = {} as Node;

        if (this.curr.type === TokenType.Number) {
            ret = this.parse_number();
        } else if (this.curr.type === TokenType.OperationParOpen) {
            this.next_token()
            this.curr = this.curr;
            ret = this.parse_expresion(Precedence.Min);
            if (this.curr.type === TokenType.OperationParClose) {
                this.next_token();
            }
        } else if (this.curr.type === TokenType.OperationPlus) {
            this.next_token();
            ret.type = NodeType.Positive;
            ret.value = this.parse_terminal_expr().value;
        } else if (this.curr.type === TokenType.OperationMinus) {
            this.next_token();
            ret.type = NodeType.Negative;
            ret.value = this.parse_terminal_expr().value;
        }


        if (
            this.curr.type === TokenType.Number ||
            this.curr.type === TokenType.OperationParOpen
        ) {

            let new_ret = { type: NodeType.Mul } as Node;
            new_ret.left =ret;
            new_ret.right = this.parse_expresion(Precedence.Factor);

            ret = new_ret;
        }

        return ret;
    }

    parse_expresion(prev_prec: Precedence): Node {

        let left = this.parse_terminal_expr();
        let curr_operator = this.curr;
        let curr_prec = precedence.get(curr_operator.type) as Precedence;

        while (curr_prec !== Precedence.Min) {
            if (prev_prec >= curr_prec) {
                break;
            } else {
                this.next_token();
                this.curr = this.curr;


                left = this.parse_infix_expr(curr_operator, left);
                curr_operator = this.curr;
                curr_prec = precedence.get(curr_operator.type) as Precedence;
            }
        }
        return left;
    }

    parse_token_to_node(tok: Token): Node {
        let ntype: NodeType = NodeType.Error;
        switch (tok.type) {
            case TokenType.OperationPlus:
                ntype = NodeType.Add
                break;
            case TokenType.OperationMinus:
                ntype = NodeType.Sub
                break;
            case TokenType.OperationDivide:
                ntype = NodeType.Div
                break;
            case TokenType.OperationMultiply:
                ntype = NodeType.Mul
                break;
            case TokenType.OperationPow:
                ntype = NodeType.Pow
                break;
        }
        return { type: ntype, value: tok.value } as Node;
    }

    parse_infix_expr(operator: Token, left: Node): Node {
        let ntype: NodeType = NodeType.Error;
        switch (operator.type) {
            case TokenType.OperationPlus:
                ntype = NodeType.Add
                break;
            case TokenType.OperationMinus:
                ntype = NodeType.Sub
                break;
            case TokenType.OperationDivide:
                ntype = NodeType.Div
                break;
            case TokenType.OperationMultiply:
                ntype = NodeType.Mul
                break;
            case TokenType.OperationPow:
                ntype = NodeType.Pow
                break;
        }
        let prec = precedence.get(operator.type) as Precedence;
        return { type: ntype, left: left, right: this.parse_expresion(prec) } as Node;
    }

    error_node() {
        return { type: NodeType.Error } as Node;
    }

    next_token() {
        this.last = this.curr
        this.index += 1
        if (this.index >= this.tokens.length) {
            this.curr = { type: TokenType.End } as Token;
        } else {
            this.curr = this.tokens[this.index];
        }
    }
}