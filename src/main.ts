import { AST } from './evaler/tree';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<input id="my_input">
<h1 id="result"></h1>
<div id="process"></div>

`


const input = document.getElementById("my_input") as HTMLInputElement;
input?.addEventListener("input", (_e: Event) => {
  
  let res = document.getElementById("result")
  let process = document.getElementById("process")

  if (res && process) {
    const tree = new AST(input.value)

    res.innerHTML = String(tree.evaluate())
    console.log(tree.root);
  }
})