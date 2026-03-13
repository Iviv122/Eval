import { ASTLogger } from './evaler/logger';
import { AST } from './evaler/tree';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<input id="my_input">
<h1 id="result"></h1>
<canvas id="process" width="800" height="800" style="border:1px solid #ffffff;"></canvas>
`


const input = document.getElementById("my_input") as HTMLInputElement;
input?.addEventListener("input", (_e: Event) => {

  let res = document.getElementById("result")
  let process = document.getElementById("process") as HTMLCanvasElement

  if (res && process) {
    const tree = new AST(input.value)

    res.innerHTML = String(tree.evaluate())

    const ctx = process.getContext("2d") as CanvasRenderingContext2D
    if (tree.root) {
      new ASTLogger(tree.root, ctx,800,800) // this was made in such way for fun lol
    }
  }
})