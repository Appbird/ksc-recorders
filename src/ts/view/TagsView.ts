import { element } from "../utility/ViewUtility";

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
            case "target"   :
                icon = `far fa-star`
            case "gameSystem":
                icon = `far fa-star`
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