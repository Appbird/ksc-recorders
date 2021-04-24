import { element } from "../../../utility/ViewUtility";
import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";

export abstract class PageStateBaseClass<T,AppInterface extends IAppUsedToRead> implements IPageStateBaseClass<T> {
    protected app:AppInterface;
    protected requiredObj:T;
    protected articleDOM:HTMLElement;
    private loadingDisplayElement:HTMLElement;
    constructor(app:AppInterface,articleDOM:HTMLElement,requiredObj:T){
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
        this.loadingDisplayElement = this.articleDOM.appendChild(createElementWithIdAndClass({className:""}))
    }
    /** @abstract ページステートの開発者がページの初期化を実装します。 */
    abstract init():Promise<void>|void;
    /** ローディングスピナーをページ中に表示します。 */
    protected generateLoadingSpinner(spinnerKindClassName:string = "u-background--star",message?:String){
        this.loadingDisplayElement.appendChild(element`
        <div class="u-width50per u-marginUpDown5em">
            <div class="c-loadingSpinner ">
                <div class="__spinner --delay0 u-background--${spinnerKindClassName}"></div>
                <div class="__spinner --delay1 u-background--${spinnerKindClassName}"></div>
                <div class="__spinner --delay2 u-background--${spinnerKindClassName}"></div>
            </div>
        </div>
        `)
        if (message === undefined) return;
        this.loadingDisplayElement.appendChild(element`
        <div class="c-balloon">
            <p>${message}</p>
        </div>
        `)
    }
    protected deleteLoadingSpinner(){
        this.loadingDisplayElement.innerHTML = "";
    }
    get requiredObject():T{
        return this.requiredObj
    }
}


export interface IPageStateBaseClass<T>{
    init():Promise<void>|void;
    requiredObject:T;
}