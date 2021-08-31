import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { SelectChoicesCapsuled } from "../../Input/SelectChoicesCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { ILabelledDocument } from "../../../../../type/list/ILabelledDocument";

export class EditorIDPart implements EditorPart<string> {
    private container: HTMLElement;
    private selectInput: SelectChoicesCapsuled<ILabelledDocument>;
    private htmlCon: HTMLConverter;
    private static _requiredTypeInString = "string";
    private _requiredField:boolean;
    private ulist:UListCupsuled;
    get requiredTypeInString(){
        return EditorIDPart._requiredTypeInString
    }
    constructor({
        container,language,title,
        description,requiredField,icooon,
        options
    }:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        options:ILabelledDocument[]
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>
        `);
        this.selectInput = new SelectChoicesCapsuled(this.container.appendChild(document.createElement("select")), options, { language: language,needMultipleSelect:false });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: string|undefined) => void) {
        this.selectInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string|undefined {
        return this.selectInput.getValueAsValue();
    }
    disabled(state:boolean){
        if (state) this.selectInput.disable()
            else this.selectInput.enable()
    }
    refresh(value: string|undefined) {
        if (value === undefined) throw new Error()
        this.selectInput.setSelected(value);
    }
    refreshOption(options:ILabelledDocument[]){
        this.selectInput.clearStore();
        this.selectInput.setChoices(options);
    }
    isFill(): boolean {
        return this.selectInput.getValueAsArray().length !== 0;
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        this.selectInput.destroy();
        this.ulist.destroy();
    }

}
