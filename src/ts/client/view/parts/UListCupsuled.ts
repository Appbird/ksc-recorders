import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class UListCupsuled implements IView{
    private container:HTMLElement;
    constructor(container:HTMLUListElement,language:LanguageInApplication,notices:MultiLanguageString[],className:string = "u-margin05em"){
        this.container = container;
        this.container.className = className;
        const htmlC = new HTMLConverter(language);
        for (const notice of notices)
            this.container.appendChild(htmlC.elementWithoutEscaping`<li>${notice}</li>`)
    }
    destroy(){
        this.container.innerHTML = "";
    }
}
