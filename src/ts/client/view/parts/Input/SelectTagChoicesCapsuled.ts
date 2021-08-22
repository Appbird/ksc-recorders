import Choices from "choices.js";
import { choiceDescription, choiceString, MultiLanguageDescription } from "../../../../utility/aboutLang";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IView } from "../../IView";

export class SelectTagChoicesCapsuled implements IView {
    private _data: string[];
    private readonly _language: LanguageInApplication;
    private _choices: Choices;
    private container: HTMLSelectElement;
    constructor(
        container: HTMLSelectElement, data: string[],
        {
            language,
            removeItemButton = true, disable = false, 
            maxItemText, placeholderValue = undefined, noChoiceText = { JDescription: "このゲームモードの中で今まで使われたタグはありません。", EDescription: "There isn't any tag used before in this gamemode." },
            noResultText = { JDescription: "Enterを押すとタグが追加されます。", EDescription: "Press Enter to add new tag." }, shouldSort=false
        }: {
            placeholderValue?: string; language: LanguageInApplication;
            removeItemButton?: boolean; disable?: boolean; maxItemText?: MultiLanguageDescription;
            noChoiceText?: MultiLanguageDescription; noResultText?: MultiLanguageDescription; shouldSort?:boolean;
        }
    ) {
        container.multiple = true;
        container.disabled = disable;
        const result = new Choices(
            container,
            {
                choices: data.map((ele) => { return {label:ele,value:ele} }),
                placeholderValue,
                maxItemText: choiceDescription(maxItemText, language),
                removeItemButton,
                maxItemCount:10,
                shouldSort,
                noChoicesText: choiceDescription(noChoiceText, language),
                noResultsText: choiceDescription(noResultText, language),
            });
            
        this._language = language;
        this._data = data;
        this._choices = result;
        this.container = container;
        const input = this.container.parentElement?.getElementsByTagName("input")[0]
        if (input === undefined) throw new Error("Choices要素の中にあるinput要素を発見できませんでした。")
            
        input.addEventListener("keydown",(event) => {
            //#TODO サジェストに近い候補のものを入力すると、それ本体ではなく似たものがタグとして入力される問題を解決する。
            //*> Tagifyを利用してここを書き換える。  
            //#TODO ゲームモードごとのルールを書く
            //#TODO 属性編集画面と、ゲームモードルール編集画面を作る
            if (event.key !== "Enter" || input.value.replace(/\s/g,"").length === 0 || this.data.includes(input.value)) return;
            this.appendChoices(input.value.replace(/^\s+/,"").replace(/(\s+)$/,""))
            input.value = ""
        })

    }
    addEventListener(eventType: "addItem" | "click" | "hideDropdown" | "change" | "choice", callback: (event: any) => void) {

        this.container.addEventListener(eventType, callback);
        
    }
    getValueAsArray(valueOnly: boolean = true): string[] {
        let choiced = this._choices.getValue(valueOnly);
        if (Array.isArray(choiced))
            return choiced;
        return [choiced];
    }
    setSelected(IDs:string|string[]){
        this._choices.setChoiceByValue(IDs)
    }
    setChoices(item: string[]) {
        
        this._choices.setChoices(item.map(ele => {
            return { value: ele, label: ele };
        }));
        this._data = item;
    }
    appendChoices(item: string) {
        const values = this.getValueAsArray()
        values.push(item)
        this.data.push(item)
        this.clearStore()
        this._choices.setChoices(this.data.map(ele => {
            return { value: ele, label: ele };
        }));
        this.setSelected(values)
    }
    clearChoices() {
        this._choices.clearChoices();
    }
    clearStore() {
        this._choices.clearStore();
    }
    disable() {
        this._choices.disable();
    }
    enable() {
        this._choices.enable();
    }
    get data() {
        return this._data;
    }
    get language() {
        return this._language;
    }
    get choices() {
        return this._choices;
    }
    get insertedElement() {
        return this.container;
    }
    destroy(){
        this._choices.destroy();
        this.container.innerHTML = "";
    }
}
