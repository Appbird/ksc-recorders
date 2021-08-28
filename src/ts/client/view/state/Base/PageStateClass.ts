import { element } from "../../../../utility/ViewUtility";
import { IAppUsedToRead } from "../../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../../utility/aboutElement";

const spinnerKind = [
    "flag","punch","person","iceCream","ns","ds","ramen","notebook","heart",
    "gear","tag","time","link","cloud","feather","key","menu","writing",
    "login","logout","notification"
]
export abstract class PageStateBaseClass<RequiredObjectType,AppInterface extends IAppUsedToRead> implements IPageStateBaseClass<RequiredObjectType> {
    protected app:AppInterface;
    protected requiredObj:RequiredObjectType;
    protected articleDOM:HTMLElement;
    private loadingDisplayElement:HTMLElement;
    constructor(app:AppInterface,articleDOM:HTMLElement,requiredObj:RequiredObjectType){
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
       
        this.loadingDisplayElement = this.articleDOM.appendChild(createElementWithIdAndClass({className:"c-loadingSpinnerPlaceHolder u-width100per"}))
                                            .appendChild(createElementWithIdAndClass({className:"c-loadingSpinner"}))
        this.loadingDisplayElement.innerHTML = `
                                    <div class="__spinner --delay0 u-background--star"></div>
                                    <div class="__spinner --delay1 u-background--star"></div>
                                    <div class="__spinner --delay2 u-background--star"></div>
                                    `
    }
    /** @abstract ページステートの開発者がページの初期化を実装します。 */
    abstract init():Promise<void>|void;
    destroy():Promise<void>|void{};
    /** ローディングスピナーをページ中に表示します。 */
    protected generateLoadingSpinner(spinnerKindClassName?:string,message?:string){
        if (spinnerKind !== undefined) spinnerKindClassName = spinnerKind[Math.floor(Math.random() * spinnerKind.length)]
        for (let index = 0; index < this.loadingDisplayElement.children.length; index++){
            const item = this.loadingDisplayElement.children.item(index)
            if (item !== null) item.className = `__spinner --delay${index} u-background--${spinnerKindClassName}`
        }
        this.loadingDisplayElement.parentElement?.classList.add("--enabled")
        if (message === undefined) return;
        this.loadingDisplayElement.appendChild(element`
        <div class="c-balloon">
            <p>${message}</p>
        </div>
        `)
    }
    protected deleteLoadingSpinner(){
        this.loadingDisplayElement.parentElement?.classList.remove("--enabled")
    }
    get requiredObject():RequiredObjectType{
        return this.requiredObj
    }
}


export interface IPageStateBaseClass<T>{
    destroy():Promise<void>|void;
    init():Promise<void>|void;
    requiredObject:T;
}