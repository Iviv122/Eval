import { AST } from './evaler/tree';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<input id="my_input">
  
`


const input = document.getElementById("my_input") as HTMLInputElement;
input?.addEventListener("input", (_e: Event) => {
  console.log(new AST(input.value).evaluate());
})