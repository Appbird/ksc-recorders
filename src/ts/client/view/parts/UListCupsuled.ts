import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { choiceString } from "../../../utility/aboutLang";
import { IView } from "../IView";

export class UListCupsuled implements IView{
    private container:HTMLElement;
    private language:LanguageInApplication
    constructor(container:HTMLUListElement,language:LanguageInApplication,notices:MultiLanguageString[],className:string = "u-margin05em"){
        this.container = container;
        this.container.className = className;
        this.language = language
        for (const notice of notices){
            this.append(notice);
        }
    }
    unshift(notice:MultiLanguageString){
        const ele = document.createElement(`li`);
        ele.innerHTML = choiceString(notice,this.language)
        this.container.prepend(ele)
    }
    append(notice:MultiLanguageString){
        const ele = document.createElement(`li`);
        ele.innerHTML = choiceString(notice,this.language)
        this.container.appendChild(ele)
    }
    deleteFirst(){
        if (this.container.firstChild===null)return;
        this.container.removeChild(this.container.firstChild)
    }
    deleteLast(){
        if (this.container.lastChild===null)return;
        this.container.removeChild(this.container.lastChild)
    }
    destroy(){
        this.container.innerHTML = "";
    }
}
