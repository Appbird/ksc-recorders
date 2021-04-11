import { element } from "../../utility/ViewUtility";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";

export class StateInfoView implements IView{
    private element:HTMLElement = createElementWithIdAndClass({className:"c-stateInfo"})
    constructor(){}
    appendInfo(value:string,icon:"list"|"running"|"history"){
        this.element.appendChild(element`
        <div class = "c-stateInfo__unit">
            <div class ="c-iconWithDescription"> <i class="fas fa-${icon}"></i> ${value}</div>
        </div>`)
        return this;
    }
    get htmlElement(){
        return this.element;
    }
}