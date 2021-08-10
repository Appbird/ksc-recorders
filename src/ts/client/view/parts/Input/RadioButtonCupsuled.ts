import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { IView } from "../../IView";

export class RadioButtonCupsuled<T> implements IView {
    private container: HTMLElement;
    private selected: T;
    private selectedIndex:number = 0;
    private elements: { input: HTMLElement; value: T; }[];
    private disabledState: boolean = false;
    private callbacks:((selected: T) => void)[] = [];
    constructor(
        container: HTMLElement,
        name: string,
        language: LanguageInApplication,
        options: { optionLabel: MultiLanguageString|string; value: T; }[]
    ) {
        this.container = container;
        const htmlConverter = new HTMLConverter(language);
        this.container.classList.add("c-radioSelectors");
        this.selected = options[0].value;
        this.elements = options.map(({ optionLabel, value }, index) => {
            const ele = this.container.appendChild(htmlConverter.elementWithoutEscaping`
                <div class="__item ${(index === 0) ? "--checked" : ""}" name="${name}" ><p>${optionLabel}</p></div>
            `) as HTMLElement;
            ele.addEventListener("click", () => this.select(index));
            return { id:this.selectedIndex, input: ele, value: value };
        });
    }
    onChangeEventListener(callback: (selected: T) => void): void {
        this.callbacks.push(callback)
    }
    disabled(state:boolean){
        this.disabledState = state;
        if (state)this.container.classList.add("--disabled")
        else this.container.classList.remove("--disabled")
    }
    private select(index:number){
        if (this.disabledState) return;

        this.elements[this.selectedIndex].input.classList.remove("--checked");
        this.elements[index].input.classList.add("--checked");

        this.selected = this.elements[index].value;
        this.selectedIndex = index;
        
        for (const callback of this.callbacks) callback(this.elements[index].value)
    }
    get value(): T {
        return this.selected;
    }
    set value(value: T) {
        this.selected = value;
        const inputIndex = this.elements.findIndex((ele) => ele.value === value);
        if (inputIndex === -1) throw new Error(`[RadioButtonCupsuled] 不正な値が入力されました。value: ${value}`)
        this.select(inputIndex);
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
