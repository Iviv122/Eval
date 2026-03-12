
export enum TokenType {
    Number = 0,
    OperationMinus = 1,
    OperationPlus = 1,
    OperationMultiply = 2,
    OperationDivide = 2,
    OperationPow = 3,
}

export type Token = {

    value: Number
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
            const token_number: Token = {} as Token;
            token_number.value = Number(string)
            token_number.type = TokenType.Number;
            tokens.push(token_number);

            string = "";

            const token_operation: Token = {} as Token;
            token_operation.value = Number(string)
            switch (c) {
                case '-':
                    token_operation.type = TokenType.OperationMinus;
                    break;
                case '+':
                    token_operation.type = TokenType.OperationPlus;
                    break;
                case '/':
                    token_operation.type = TokenType.OperationDivide;
                    break;
                case '*':
                    token_operation.type = TokenType.OperationMultiply;
                    break;
                case '^':
                    token_operation.type = TokenType.OperationPow;
                    break;
            }

            tokens.push(token_operation);

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