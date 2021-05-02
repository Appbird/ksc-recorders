import { IView } from "../IView";
import { TitleCupsuled } from "./TitleCupsuled";

//#CTODO 破壊的変更によって影響を受けるOfferFormViewの対応する
export class TextInputCapsuled implements IView{
    private element: HTMLInputElement;
    private errorElement:Element|null;
    private titleElement:TitleCupsuled|null = null;
    constructor(container: Element, {
        placeHolder = "", errorViewer= null, chara = "", defaultValue = "", title
    }:{ 
        placeHolder?:string,
        errorViewer?:Element|null,
        chara?:"u-biggerChara"|"u-smallerChara"|"",
        defaultValue?:string,
        title?:{
            titleViewer:Element
            main:string, sub:string
        }
    } = {}) {
        this.errorElement = errorViewer;
        if (this.errorElement !== null) this.errorElement.classList.add("u-unused")
        if (title !== undefined) {
            this.titleElement = new TitleCupsuled(title.titleViewer)
            this.titleElement.refresh(title.main,title.sub,{underline:false,chara:"u-smallerChara"})
        }
        
        this.element = document.createElement("input");
        this.element.setAttribute("type", "text");
        this.element.classList.add("c-textInput", "u-underline");
        this.element.placeholder = placeHolder;
        
        if (chara !== undefined && chara !== "") this.element.classList.add(chara);
        
        container.appendChild(this.element);
        this.value = defaultValue;
    }
    addEventListener(eventType: "change", callback: () => void) {
        this.element.addEventListener(eventType, callback);
    }
    setError(error:string){
        if (this.errorElement === null) throw new Error("エラーを表示する要素が設定されていません。")
        if (error==="") this.errorElement.classList.add("u-unused")
        else this.errorElement.classList.remove("u-unused")
        this.errorElement.innerHTML = error;
    }
    destroy(){
        this.element.innerHTML = "";
    }
    get value() {
        return this.element.value;
    }
    set value(value: string) {
        this.element.value = value;
    }
}
