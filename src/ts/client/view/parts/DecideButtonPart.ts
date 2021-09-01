import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { generateIconHTML } from "../../utility/aboutElement";
import { IView } from "../IView";

export class DecideButtonPart implements IView{
    private container:HTMLElement
    constructor(container:HTMLElement,{
        language,text={Japanese:"決定",English:"Submit"},onClick
    }:{
        language:LanguageInApplication,
        text?:MultiLanguageString&{iconCSS?:string},
        onClick:()=>void
    }) {
        this.container = container
        const htmlCon = new HTMLConverter(language)
        this.container.appendChild(htmlCon.elementWithoutEscaping`<div class="c-button">${generateIconHTML(text)}<p>${text}</p></div>`)
        this.container.addEventListener("click",() => onClick())
    }
    disabled():void{
        this.container.classList.add("u-unused")
    }
    enabled():void{
        this.container.classList.remove("u-unused")
    }
    destroy(): void {
        this.container.innerHTML = ""
    }
    
}