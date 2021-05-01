import { element } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class StateInfoView implements IView{
    private container:HTMLElement;
    constructor(container:HTMLElement){
        this.container = container;
        this.container.classList.add("c-stateInfo")
    }
    appendInfo(value:string,icon:"list"|"running"|"history"){
        this.container.appendChild(element`
        <div class = "c-stateInfo__unit">
            <div class ="c-iconWithDescription"> <i class="fas fa-${icon}"></i> ${value}</div>
        </div>`)
        return this;
    }
    destroy(){
        this.container.innerHTML = "";
    }
}