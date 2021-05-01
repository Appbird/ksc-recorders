import { element } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class TitleCupsuled implements IView{
    private container:Element;
    constructor(container:Element) {
        this.container = container;
    }
    refresh(main:string,sub?:string,{
        underline = true,
        chara = ""
    }:{
        chara?:"u-biggerChara"|"u-smallerChara"|"",
        underline?:boolean
    } = {}){
        const title = this.container.appendChild(element`
        <div class="c-title">
            <div class="c-title__main ${chara}">${main}</div>
        </div>
        `);
        if (sub !== undefined) title.appendChild(element`<div class="c-title__sub">${sub}</div>`)
        if (underline) this.container.appendChild(element`<hr noshade class="u-thin">`)
    }
    destroy(){
        this.container.innerHTML = "";
    }
}