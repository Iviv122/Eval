import { evaluate } from './evaler/evaler';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<input id="my_input">
  
`


const input = document.getElementById("my_input") as HTMLInputElement;
input?.addEventListener("input", (e : Event) =>{
    evaluate(input.value);
})