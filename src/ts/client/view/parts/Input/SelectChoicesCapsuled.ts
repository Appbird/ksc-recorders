import Choices from "choices.js";
import { choiceDescription, choiceString, MultiLanguageDescription, selectAppropriateName } from "../../../../utility/aboutLang";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IView } from "../../IView";

export class SelectChoicesCapsuled<T extends IItemOfResolveTableToName> implements IView {
    private _data: T[];
    private readonly _language: LanguageInApplication;
    private _choices: Choices;
    private container: HTMLSelectElement;
    constructor(
        container: HTMLSelectElement, data: T[],
        {
            needMultipleSelect = false, maxItemCount = 1, needDuplicatedSelect = false, language,
            removeItemButton = true, disable = false,
            maxItemText, placeholderValue = undefined, noChoiceText = { JDescription: "選べるものがありません", EDescription: "There are no item to select." },
            noResultText = { JDescription: "検索に合致するものがありませんでした。", EDescription: "No item were found." }, shouldSort=false
        }: {
            needMultipleSelect?: boolean; placeholderValue?: string; language: LanguageInApplication;
            needDuplicatedSelect?: boolean; maxItemCount?: number; 
            removeItemButton?: boolean; disable?: boolean; maxItemText?: MultiLanguageDescription;
            noChoiceText?: MultiLanguageDescription; noResultText?: MultiLanguageDescription; shouldSort?:boolean;
        }
    ) {
        container.multiple = needMultipleSelect;
        container.disabled = disable;
        const result = new Choices(
            container,
            {
                choices: data.map((ele) => { return { value: ele.id, label: choiceString(ele, language) }; }),
                placeholderValue,
                maxItemCount,
                maxItemText: choiceDescription(maxItemText, language),
                removeItemButton,
                shouldSort,
                noChoicesText: choiceDescription(noChoiceText, language),
                noResultsText: choiceDescription(noResultText, language),
            });
        
        this._language = language;
        this._data = data;
        this._choices = result;
        this.container = container;
        
        if (data.length === 1 && (!needMultipleSelect || maxItemCount === 1)) this.setSelected(data[0].id)
        if (!needDuplicatedSelect)
            return;

        this.container.addEventListener("addItem", (event: any) => {
            result.setChoices([{ label: event.detail.label, value: event.detail.value }]);
        });
        this.container.addEventListener("removeItem", () => {
            result.clearStore();
            result.setChoices(data.map((ele) => { return { value: ele.id, label: choiceString(ele, language) }; }));
        });
    }
    addEventListener(eventType: "addItem" | "click" | "hideDropdown" | "change" | "choice", callback: (event: any) => void) {
        this.container.addEventListener(eventType, callback);
    }
    getValue(valueOnly: boolean = true) {
        return this._choices.getValue(valueOnly);
    }
    getValueAsValue(valueOnly: boolean = true): string|undefined {
        let choiced = this._choices.getValue(valueOnly);
        if (Array.isArray(choiced)) return choiced[0];
        return choiced;
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
    setChoices(item: T[]) {
        
        this._choices.setChoices(item.map(ele => {
            return { value: ele.id, label: choiceString(ele, this._language) };
        }));
        this._data = item;
        if (item.length === 1 && (!this.container.multiple || this._choices.config.maxItemCount === 1)) this.setSelected(item[0].id)
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
