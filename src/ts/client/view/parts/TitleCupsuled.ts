import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class TitleCupsuled implements IView{
    private container:Element;
    constructor(container:Element) {
        this.container = container;
    }
    refresh(main:string,sub?:string,{
        underline = true,
        chara = "",
        subChara = "",
        hr = "u-thin"
    }:{
        chara?:"u-biggerChara"|"u-smallerChara"|"",
        subChara?:"u-biggerChara"|"u-smallerChara"|"",
        hr?:"u-thin"|"u-bold"
        underline?:boolean
    } = {}){
        this.container.innerHTML = "";
        const title = this.container.appendChild(elementWithoutEscaping`
        <div class="c-title">
            <div class="c-title__main ${chara}">${main}</div>
        </div>
        `);
        if (sub !== undefined) title.appendChild(elementWithoutEscaping`<div class="c-title__sub ${subChara}">${sub}</div>`)
        if (underline) this.container.appendChild(elementWithoutEscaping`<hr noshade class="${hr}">`)
    }
    destroy(){
        this.container.innerHTML = "";
    }
}