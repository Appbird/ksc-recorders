import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IView } from "../IView";

export class NumberInputCupsuled implements IView {
    private container: HTMLElement;
    private _value:number;
    private input:HTMLInputElement;
    private min?:number;
    private max?:number;
    private allowDecimal:boolean;
    constructor(
        container: HTMLElement,
        language: LanguageInApplication,
        {allowDecimal=false,min,max}:{allowDecimal?:boolean,min?:number,max?:number}
    ) {
        
        this.container = container;
        const htmlConverter = new HTMLConverter(language);
        this.container.classList.add("c-radioSelectors");
        this._value = 0
        this.min = min; this.max = max;
        this.allowDecimal = allowDecimal;
        this.input = this.container.appendChild(htmlConverter.elementWithoutEscaping`<input class="c-textInput u-biggerChara" type="number"></input>`) as HTMLInputElement;
        this.input.addEventListener("change",() => {
            try{this.value = Number(this.input.value)}
            catch(error){ this.input.value = "0"; this.value = 0; }
        })
            
    }
    onChangeEventListener(callback: (changed: number) => void): void {
        this.input.addEventListener("change", () => callback(this.value));
    }
    disabled(state:boolean){
        this.input.disabled = state;
    }
    get value():number {
        return this._value;
    }
    set value(value: number) {
        this._value = value;
        this.round();
    }
    private round(){
        if (!this.allowDecimal) this._value = Math.round(this._value)
        if (this.max !== undefined && this._value > this.max) this._value = this.max;
        if (this.min !== undefined && this._value > this.min) this._value = this.min;
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
