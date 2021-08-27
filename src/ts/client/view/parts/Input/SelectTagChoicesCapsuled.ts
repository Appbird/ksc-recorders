import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IView } from "../../IView";
import Tagify from "@yaireo/tagify";

export class SelectTagChoicesCapsuled implements IView {
    private _data: string[];
    private readonly _language: LanguageInApplication;
    private tagify: Tagify;
    private container: HTMLInputElement;
    constructor(
        container: HTMLInputElement, data: string[],
        {
            language,
            disable = false, 
            placeholderValue = undefined
        } : {
            placeholderValue?: string; language: LanguageInApplication; disable?: boolean; 
        }
    ) {
        container.multiple = true;
        container.disabled = disable;
        
        this.container = container;
        this.tagify = new Tagify(this.container,{
            placeholder:placeholderValue,
            editTags:1,
            maxTags:10,
            autoComplete:{
                enabled:true
            },
            whitelist:data,
            dropdown: {
                enabled: 0,             
                closeOnSelect: false
            }
        })
            
        this._language = language;
        this._data = data;

            //#CTODO サジェストに近い候補のものを入力すると、それ本体ではなく似たものがタグとして入力される問題を解決する。
            //*> Tagifyを利用してここを書き換える。  
            //#TODO ゲームモードごとのルールを書く
            //#TODO 属性編集画面と、ゲームモードルール編集画面を作る

    }
    addEventListener(eventType: "addItem" | "click" | "hideDropdown" | "change" | "choice", callback: (event: any) => void) {

        this.container.addEventListener(eventType, callback);
        
    }
    getValueAsArray(): string[] {
        const choiced = this.tagify.value
        return choiced.map(choice => choice.value);
    }
    setSelected(IDs:string|string[]){
        this.tagify.removeAllTags()
        if (typeof IDs === "string") IDs = [IDs]
        this.tagify.addTags(IDs)
    }
    setWhiteList(item: string[]) {
        
        this.tagify.whitelist = item
        this._data = item;
    }
    appendWhiteListItem(item: string) {
        this._data.push(item)
        this.tagify.whitelist = this.data
    }
    clearChoices() {
        this.tagify.removeAllTags()
    }
    clearStore() {
        this.tagify.whitelist = []
    }
    disable() {
        this.tagify.setDisabled(true)
    }
    enable() {
        this.tagify.setDisabled(false)
    }
    get data() {
        return this._data;
    }
    get language() {
        return this._language;
    }
    get choices() {
        return this.tagify;
    }
    get insertedElement() {
        return this.container;
    }
    destroy(){
        this.tagify.destroy();
        this.container.innerHTML = "";
    }
}
