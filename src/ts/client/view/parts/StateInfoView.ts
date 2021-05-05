import { element } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class StateInfoView implements IView{
    private container:HTMLElement;
    constructor(container:HTMLElement){
        this.container = container;
        this.container.classList.add("c-stateInfo")
    }
    appendInfo(value:string,icon:"list"|"running"|"history"):StateInfoView;
    appendInfo(value:string,icon:"twitter"|"youtube"):StateInfoView;
    appendInfo(value:string,icon:"list"|"running"|"history"|"twitter"|"youtube"){
        if (["list","running","history"].includes(icon))
            this.container.appendChild(element`
                <div class = "c-stateInfo__unit">
                    <div class ="c-iconWithDescription"> <i class="fas fa-${icon}"></i> ${value}</div>
                </div>`
            )
        if (["twitter","youtube"].includes(icon))
        this.container.appendChild(element`
            <div class = "c-stateInfo__unit">
                <div class ="c-iconWithDescription"> <i class="fab fa-${icon}"></i><a href="${value}">${value}</a></div>
            </div>`
        )
        return this;
    }
    destroy(){
        this.container.innerHTML = "";
    }
}