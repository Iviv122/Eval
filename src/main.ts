import { ASTLogger } from './evaler/logger';
import { AST } from './evaler/tree';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="container">
  <p>AST tree calculator</p>
  <details>
  <summary>Details</summary>
  <p>try to write some problem. Like (2(2+2))/5+3(3+(3/3))</p>
  <p>Display is buggy because i have no idea how to fix it</p>
</details>
  <input id="my_input">
  <h1 id="result"></h1>
  <article class="process"></article>
</div>
`


const input = document.getElementById("my_input") as HTMLInputElement;
input?.addEventListener("input", (_e: Event) => {

  let res = document.getElementById("result")
  let process = document.getElementsByClassName("process")[0] as HTMLElement;

  if (res && process) {
    const tree = new AST(input.value)

    res.innerHTML = String(tree.evaluate())

    if (tree.root) {
      new ASTLogger(tree.root, process, 800, 800)
    }
  }
})