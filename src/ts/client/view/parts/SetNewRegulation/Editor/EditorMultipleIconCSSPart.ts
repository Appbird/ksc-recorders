import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";

export class EditorMultipleIconCSSPart implements EditorPart<string[]> {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = "string";
    private iconSegment: HTMLElement;
    get requiredTypeInString(){
        return EditorMultipleIconCSSPart._requiredTypeInString;
    }
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
        this.container.appendChild(this.htmlCon.elementWithoutEscaping `<h1 class="u-noUnderline">${generateIcooonHTML({icooonName:(icooon)})}${title}</h1>`);
        this.iconSegment = appendElement(this.container,"div","u-flex-center u-biggerChara")
        this.textInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per" });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.addChangeEventListener((value) => {
            this.iconSegment.innerHTML = ""
            for (const icon of value) appendElement(this.iconSegment,"i",icon)
        })
    }
    addChangeEventListener(callback: (changed: string[]) => void) {
        this.textInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string[] {
        return this.textInput.value.replace(/\s*\,\s*/g,",").split(",");
    }
    refresh(value: string[]) {
        this.textInput.value = value.join(", ");
    }
    disabled(state:boolean){
        this.textInput.disabled(state);
    }
    isFill(): boolean {
        return this.textInput.value.length !== 0;
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.textInput.destroy();
        this.ulist.destroy();
    }
}

