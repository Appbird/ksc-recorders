import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { generateIcooonHTML, appendElement } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { NumberInputCupsuled } from "../../NumberInputCupsuled";

export class EditorPositiveIntegerPart implements EditorPart<number>{
    
    private container: HTMLElement;
    private input: NumberInputCupsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = "number";
    constructor(
        {container,language,title,requiredField,description,icooon}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description: MultiLanguageString[],
        requiredField:boolean,
        icooon?:string
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);

        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping `<h1>${generateIcooonHTML({icooonName:icooon})}${title}</h1>`);
        this.input = new NumberInputCupsuled(appendElement(this.container,"div"),language,{allowDecimal:false,min:1})
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: number) => void): void {
        this.input.onChangeEventListener(callback);
    }
    refresh(value: number): void {
        this.input.value = value;
    }
    isFill(): boolean {
        return true;
    }
    disabled(state: boolean): void {
        this.input.disabled(state)
    }
    destroy(): void {
        this.ulist.destroy();
    }
    get requiredTypeInString(){
        return EditorPositiveIntegerPart._requiredTypeInString;
    }
    get requiredField(): boolean{
        return this._requiredField;
    }
    get value(){
        return this.input.value;
    }
    
}