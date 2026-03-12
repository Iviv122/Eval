import type { Token } from "./tokenizer.ts";
import { tokenize } from "./tokenizer.ts";



export function evaluate(s : string): Number{

    let tokens : Token[] = tokenize(s);
    console.log(tokens);
    // tree = tree.new(tokens)
    // return tree.evalueate()


    return 0;
}