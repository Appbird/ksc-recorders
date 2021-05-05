import { element } from "../../../utility/ViewUtility";
import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";

export abstract class PageStateBaseClass<T,AppInterface extends IAppUsedToRead> implements IPageStateBaseClass<T> {
    protected app:AppInterface;
    protected requiredObj:T;
    protected articleDOM:HTMLElement;
    private loadingDisplayElement:HTMLElement|null =null;
    constructor(app:AppInterface,articleDOM:HTMLElement,requiredObj:T){
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
       
    }
    /** @abstract ページステートの開発者がページの初期化を実装します。 */
    abstract init():Promise<void>|void;
    destroy():Promise<void>|void{};
    /** ローディングスピナーをページ中に表示します。 */
    protected generateLoadingSpinner(spinnerKindClassName:string = "u-background--star",message?:String){
        this.loadingDisplayElement = this.articleDOM.appendChild(createElementWithIdAndClass({className:"c-loadingSpinnerPlaceHolder u-width50per u-marginUpDown5em"}))
        this.loadingDisplayElement.innerHTML = `
            <div class="c-loadingSpinner">
                <div class="__spinner --delay0 u-background--${spinnerKindClassName}"></div>
                <div class="__spinner --delay1 u-background--${spinnerKindClassName}"></div>
                <div class="__spinner --delay2 u-background--${spinnerKindClassName}"></div>
            </div>
        `
        this.loadingDisplayElement.classList.add("--enable");
        if (message === undefined) return;
        this.loadingDisplayElement.appendChild(element`
        <div class="c-balloon">
            <p>${message}</p>
        </div>
        `)
    }
    protected deleteLoadingSpinner(){
        if (this.loadingDisplayElement === null) return;
        this.loadingDisplayElement.classList.remove("--enable","u-width50per","u-marginUpDown5em");
        setTimeout(() => (this.loadingDisplayElement) ? this.loadingDisplayElement.innerHTML = "":0,400)
    }
    get requiredObject():T{
        return this.requiredObj
    }
}


export interface IPageStateBaseClass<T>{
    destroy():Promise<void>|void;
    init():Promise<void>|void;
    requiredObject:T;
}