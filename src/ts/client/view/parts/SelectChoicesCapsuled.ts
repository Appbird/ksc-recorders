import Choices from "choices.js";
import { choiceDescription, MultiLanguageDescription, selectAppropriateName } from "../../../utility/aboutLang";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";
import { LanguageInApplication } from "../../../type/LanguageInApplication";

export class SelectChoicesCapsuled<T extends IItemOfResolveTableToName> {
    private _data: T[];
    private readonly _language: LanguageInApplication;
    private _choices: Choices;
    private _insertedElement: HTMLSelectElement;
    constructor(
        insertedElement: HTMLSelectElement, data: T[],
        {
            needMultipleSelect = false, maxItemCount = 1, needDuplicatedSelect = false, language,
            removeItemButton = true, disable = false,
            maxItemText, placeholderValue = undefined, noChoiceText = { JDescription: "選べるものがありません", EDescription: "There are no item to select." },
            noResultText = { JDescription: "検索に合致するものがありませんでした。", EDescription: "No item were found." }
        }: {
            needMultipleSelect?: boolean; placeholderValue?: string; language: LanguageInApplication;
            needDuplicatedSelect?: boolean; maxItemCount?: number;
            removeItemButton?: boolean; disable?: boolean; maxItemText?: MultiLanguageDescription;
            noChoiceText?: MultiLanguageDescription; noResultText?: MultiLanguageDescription;
        }
    ) {
        insertedElement.multiple = needMultipleSelect;
        insertedElement.disabled = disable;
        const result = new Choices(
            insertedElement,
            {
                choices: data.map((ele) => { return { value: ele.id, label: selectAppropriateName(ele, language) }; }),
                placeholderValue: placeholderValue,
                maxItemCount: maxItemCount,
                maxItemText: choiceDescription(maxItemText, language),
                removeItemButton: removeItemButton,
                shouldSort: true,
                noChoicesText: choiceDescription(noChoiceText, language),
                noResultsText: choiceDescription(noResultText, language)
            });
        this._language = language;
        this._data = data;
        this._choices = result;
        this._insertedElement = insertedElement;

        if (!needDuplicatedSelect)
            return;

        this._insertedElement.addEventListener("addItem", (event: any) => {
            result.setChoices([{ label: event.detail.label, value: event.detail.value }]);
        });
        this._insertedElement.addEventListener("removeItem", () => {
            result.clearStore();
            result.setChoices(data.map((ele) => { return { value: ele.id, label: selectAppropriateName(ele, language) }; }));
        });
    }
    addEventListener(eventType: "addItem" | "click" | "hideDropdown" | "change", callback: (event: any) => void) {
        this._insertedElement.addEventListener(eventType, callback);
    }
    getValue(valueOnly: boolean = true) {
        return this._choices.getValue(valueOnly);
    }
    getValueAsValue(valueOnly: boolean = true): string {
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
    setChoices(item: T[]) {
        this._choices.setChoices(item.map(ele => {
            return { value: ele.id, label: selectAppropriateName(ele, this._language) };
        }));
        this._data = item;
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
        return this._insertedElement;
    }
}
