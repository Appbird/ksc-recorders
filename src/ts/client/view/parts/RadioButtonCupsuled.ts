import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class RadioButtonCupsuled<T> implements IView {
    private container: HTMLElement;
    private selected: T;
    private elements: { input: HTMLInputElement; value: T; }[];
    constructor(
        container: HTMLElement,
        name: string,
        language: LanguageInApplication,
        options: { optionLabel: MultiLanguageString; value: T; }[]
    ) {
        this.container = container;
        const htmlConverter = new HTMLConverter(language);
        this.container.classList.add("c-radioSelectors");
        this.selected = options[0].value;
        this.elements = options.map(({ optionLabel, value }, index) => {
            const ele = this.container.appendChild(htmlConverter.elementWithoutEscaping`
                            <div><input type="radio" name="${name}" ${(index === 0) ? "checked" : ""}><label>${optionLabel}</label></div>
            `).firstElementChild as HTMLInputElement;
            ele.addEventListener("click", () => { this.selected = value; });
            return { input: ele, value: value };
        });
    }
    onChangeEventListener(callback: (selected: T) => void): void {
        for (const { input } of this.elements)
            input.addEventListener("change", () => callback(this.selected));
    }
    disabled(state:boolean){
        for (const {input} of this.elements) input.disabled = state;
    }
    get value(): T {
        return this.selected;
    }
    set value(value: T) {
        this.selected = value;
        const input = this.elements.find((ele) => ele.value === value)?.input;
        if (input === undefined)
            throw new Error("指定する値に対応する選択要素が見つかりませんでした。");
        input.checked = true;
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
