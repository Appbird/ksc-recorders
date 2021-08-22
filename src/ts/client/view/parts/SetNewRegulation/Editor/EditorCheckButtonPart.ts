import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { EditorPart } from "./EditorPart";

export class EditorCheckButtonPart<T> implements EditorPart<T[]> {
    private container: HTMLElement;
    private elements: { input: HTMLElement; value: T; }[];
    private disabledState: boolean = false;
    private callbacks:((selected: T[]) => void)[] = [];
    private selectedIndex:number[] = [];
    private maxItemCount:number;
    private requiredItemCount:number;
    requiredField: boolean;
    constructor({container,name,language,options,requiredItemCount = 1,maxItemCount = 1,requiredField}:{
        container: HTMLElement,
        name: string,
        language: LanguageInApplication,
        options: { optionLabel: MultiLanguageString|string; value: T; }[],
        requiredItemCount:number,maxItemCount?:number,requiredField:boolean}
    ) {
        this.maxItemCount = maxItemCount;
        if (requiredItemCount > maxItemCount) throw new Error("[EditorCheckButtonPart:constructor] requiredItemCount > maxItemCount")
        this.requiredItemCount = requiredItemCount;
        this.requiredField = requiredField
        this.container = container;
        const htmlConverter = new HTMLConverter(language);
        this.container.classList.add("c-radioSelectors");
        this.elements = options.map(({ optionLabel, value },index) => {
            const ele = this.container.appendChild(htmlConverter.elementWithoutEscaping`
                <div class="__item" name="${name}" ><p>${optionLabel}</p></div>
            `) as HTMLElement;
            ele.addEventListener("click", () => this.select(index));
            return { input: ele, value: value };
        });
    }
    addChangeEventListener(callback: (changed: T[]) => void): void {
        this.callbacks.push(callback)
    }
    refresh(values: T[]): void {
        if (values.length > this.maxItemCount) throw new Error("[CheckButtonCupsuled:value] values.length > this.maxItemCount")
        for(const value of values){
            const inputIndex = this.elements.findIndex((ele) => ele.value === value);
            if (inputIndex === -1) throw new Error(`[RadioButtonCupsuled] 不正な値が入力されました。value: ${value}`)
            this.select(inputIndex)
        }
    }
    isFill(): boolean {
        return (this.requiredItemCount <= this.selectedIndex.length) && (this.selectedIndex.length <= this.maxItemCount);
    }
    disabled(state:boolean){
        this.disabledState = state;
        if (state) this.container.classList.add("--disabled")
        else this.container.classList.remove("--disabled")
    }
    private select(index:number){
        if (this.disabledState) return;
        const classList = this.elements[index]?.input.classList;
        if (classList === undefined) throw new Error("[CheckButtonCupsuled:select] 指定された添え字に対応する入力要素がありませんでした。")
        if (this.selectedIndex.includes(index)) {
            classList.remove("--checked");  
            this.selectedIndex.splice(this.selectedIndex.findIndex(selected => selected === index),1)
        } else {
            classList.add("--checked"); 
            this.selectedIndex.push(index)
        }
        const value = this.value
        for (const callback of this.callbacks) callback(value) 

        if (this.selectedIndex.length > this.maxItemCount){
            const shiftedIndex = this.selectedIndex.shift()
            if (shiftedIndex === undefined) throw new Error("[CheckButtonCupsuled:select] shiftedIndex === undefined")
            this.elements[shiftedIndex].input.classList.remove("--checked")
        } 

    }
    get value(): T[] {
        return this.selectedIndex.map(index => this.elements[index].value)
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
