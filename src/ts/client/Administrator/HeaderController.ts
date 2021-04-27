import {checkIsNull} from "../../utility/undefinedChecker"
export class HeaderController{
    private element:Element;
    private main:Element;
    private sub:Element;
    constructor(){
        this.element = checkIsNull(document.getElementById("headerDisplay"),`id="headerDisplay"となる要素がありませんでした。`)
        this.main = checkIsNull(this.element.firstElementChild,`id="headerDisplay"となる要素の子要素がありませんでした。`);
        this.sub = checkIsNull(this.element.lastElementChild,`id="headerDisplay"となる要素の子要素がありませんでした。`);
        }
    async changeHeaderRightLeft(str:string,sub:string){
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),500));
        this.element.classList.remove("is-onRight")
        this.element.classList.add("is-onLeft")
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),100));
        this.element.classList.remove("is-onLeft")
        this.main.innerHTML = str; this.sub.innerHTML = sub;
        this.element.classList.add("is-onMiddle");
        
    }
}