import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { IView } from "../../IView";

export class RadioButtonCupsuled<T> implements IView {
    private container: HTMLElement;
    private elements: { input: HTMLElement; value: T; }[];
    private disabledState: boolean = false;
    private selectedIndex:number = 0;
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
        this.elements = options.map(({ optionLabel, value }, index) => {
            const ele = this.container.appendChild(htmlConverter.elementWithoutEscaping`
                <div class="__item ${(index === 0) ? "--checked" : ""}" name="${name}" ><p>${optionLabel}</p></div>
            `) as HTMLElement;
            ele.addEventListener("click", () => this.select(index));
            return { input: ele, value: value };
        });
    }
    onChangeEventListener(callback: (selected: T) => void): void {
        this.callbacks.push((changed:T) => callback(changed))
    }
    disabled(state:boolean){
        this.disabledState = state;
        if (state)this.container.classList.add("--disabled")
        else this.container.classList.remove("--disabled")
    }
    private select(index:number){
        if (this.disabledState || this.selectedIndex === index) return;
        this.elements[this.selectedIndex].input.classList.remove("--checked");
        this.elements[index].input.classList.add("--checked");
        this.selectedIndex = index;
        for (const callback of this.callbacks) callback(this.elements[index].value)
    }
    get value(): T {
        return this.elements[this.selectedIndex].value
    }
    set value(value: T) {
        const index = this.elements.findIndex((element) => element.value === value )
        if (index === -1) throw new Error("index === -1 :" + value)
        if (this.selectedIndex === index) return;
        
        this.elements[this.selectedIndex].input.classList.remove("--checked");
        this.elements[index].input.classList.add("--checked");
        this.selectedIndex = index;
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
