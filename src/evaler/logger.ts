import type { AST } from "./tree"

class ASTLogger {
    log_field: HTMLElement
    root : AST
    constructor(root: AST,logger: HTMLElement) {
        this.log_field = logger;
        this.root = root;
    }
    log(s : String){

    }
    log_array(s : String){

    }
}