import marked from "marked";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_ErrorState
    extends PageStateBaseClass<{title:string,message:string},IAppUsedToRead>{
    async init(){
        this.articleDOM.appendChild(
            elementWithoutEscaping`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
                <div class="c-title__main">${this.requiredObj.title}</div>
                <div class="c-title__sub">Failed to prepare the page.</div>
            </div>
            <hr noshade class="u-bold">
            <div class="u-width90per">${marked(this.requiredObj.title)}</div>
        </div>`
        );
        return;
    }
}