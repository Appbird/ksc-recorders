import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { choiceString } from "../../../utility/aboutLang";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { findElementByClassNameWithErrorPossibility } from "../../utility/aboutElement";
import { IView } from "../IView";

export class NoticeView implements IView {
    notice:HTMLElement|null = null
    keyName:string;
    constructor(container:HTMLElement,pageName:string,noticeName:string,context:MultiLanguageString,lang:LanguageInApplication){
        this.keyName = `KSSRs::Notice::${pageName}::${noticeName}`
        if (localStorage.getItem(this.keyName) === "true") return; 
        this.notice = container.appendChild(elementWithoutEscaping`
            <div class="u-background--blue u-bolderChara">
                <div class="u-space1em"></div>
                <div class="u-width90per u-left-align closeButton"><i class="fas fa-times u-clickable"></i></div>
                <div class="u-space1em"></div>
                <div class="u-width90per"><i class="fas fa-info-circle"></i> ${choiceString(context,lang)}</div>
                <div class="u-space2em"></div>
            </div>`) as HTMLElement
        findElementByClassNameWithErrorPossibility(this.notice,"closeButton").addEventListener("click",() => this.close())
    }
    close(){
        localStorage.setItem(this.keyName,"true")
        this.destroy()
    }
    destroy(): void {
        if (this.notice){
            this.notice.innerHTML = ""
            this.notice = null;
        }
    }
    
}