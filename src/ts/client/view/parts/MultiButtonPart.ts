import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { generateIconHTML } from "../../utility/aboutElement";
import { IView } from "../IView";

export class SmallButtonPart implements IView{
    private container:HTMLElement
    private switchValue:boolean;
    private button:HTMLElement;
    constructor(container:HTMLElement,{
        language,text={Japanese:"決定",English:"Submit"},onClick,switchValue,color = ""
    }:{
        language:LanguageInApplication,color?:""|"--red"
        text?:MultiLanguageString&{iconCSS?:string},
        onClick:()=>void,switchValue:boolean
    }) {
        this.switchValue = switchValue
        this.container = container
        const htmlCon = new HTMLConverter(language)
        this.button = this.container.appendChild(htmlCon.elementWithoutEscaping`<div class="u-width90per u-marginUpDown05em c-itemAddButton ${color}">
            ${generateIconHTML(text)}<div class="__text">${text}</div></div>`) as HTMLElement
        this.container.addEventListener("click",() =>(this.switchValue) ? onClick():undefined)
    }
    destroy(): void {
        this.container.innerHTML = ""
    }
    toggle(switchValue:boolean){
        this.switchValue = switchValue
        this.button.classList.toggle("--disabled",!switchValue)
    }
}