export enum TokenType {
    Err,
    End,
    Number,
    OperationMinus,
    OperationPlus,
    OperationMultiply,
    OperationDivide,
    OperationPow,
    OperationParOpen,
    OperationParClose,
}

export type Token = {

    value: Number | undefined
    type: TokenType
};

let operationSet = new Set<string>(["+", "-", "*", "/", "^"]);

export function tokenize(s: string): Token[] {

    if (!s) {
        return [];
    }

    let tokens: Token[] = [];
    let n = s.length;

    let string = "";

    for (let i = 0; i < n; i++) {

        const c = s[i];

        if (c && operationSet.has(c)) {
            tokens.push(create_number_token(string));
            tokens.push(create_operation_token(c));
            string = "";

        } else {
            string += c;
        }
    }

    if (string.trim() !== "") {
        const token_number: Token = {} as Token;
        token_number.value = Number(string)
        token_number.type = TokenType.Number;
        tokens.push(token_number);
    }


    return tokens;
}

function create_number_token(s: string): Token {
    return { value: Number(s), type: TokenType.Number };
}
function create_operation_token(c: string): Token {
    let ctype;
    switch (c) {
        case '-':
            ctype = TokenType.OperationMinus;
            break;
        case '+':
            ctype = TokenType.OperationPlus;
            break;
        case '/':
            ctype = TokenType.OperationDivide;
            break;
        case '*':
            ctype = TokenType.OperationMultiply;
            break;
        case '^':
            ctype = TokenType.OperationPow;
            break;
        case '(':
            ctype = TokenType.OperationParOpen;
            break;
        case ')':
            ctype = TokenType.OperationParClose;
            break;
        default:
            ctype = TokenType.Err;
    }



    return { value: undefined, type: ctype };
}