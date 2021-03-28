import { element } from "../../utility/ViewUtility";

export class TagsView{
    private element:HTMLElement;
    constructor(){
        this.element = document.createElement("div");
        this.element.classList.add("c-tags");
    }
    generateTag(tagName:string,kind:"ability"|"target"|"gameSystem"){
        let icon = "";
        switch (kind){
            case "ability"  :
                icon = `far fa-star`
                break;
            case "target"   :
                icon = `far fa-flag`
                break;
            case "gameSystem":
                icon = `fas fa-star`
                break;
        }
        this.element.appendChild(
        element`
            <div class = "c-tag --${kind}">
                <div class="c-iconWithDescription">
                <i class="${icon}"></i> ${tagName}
                </div>
            </div>`
        );
    }
    getElement(){
        return this.element;
    }
}