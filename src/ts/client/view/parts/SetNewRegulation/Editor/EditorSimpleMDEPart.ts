import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { MovieWidgetCreator } from "../../MovieWidgetCreator";
import SimpleMDE from "simplemde";

export class EditorSimpleMDEPart implements EditorPart<string> {
    private container: HTMLElement;
    private textInput: SimpleMDE;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = "string";
    get requiredTypeInString(){
        return EditorSimpleMDEPart._requiredTypeInString;
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
        this.textInput = new SimpleMDE(appendElement(this.container,"div"));
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        
    }
    addChangeEventListener(callback: (changed: string) => void) {
        throw new Error("[EditorSimpleMDEPart] addChangeEventListener doesn't be implemented")
    }
    get value(): string {
        return this.textInput.value();
    }
    refresh(value: string) {
        this.textInput.value(value);
    }
    disabled(state:boolean){
        (state) ? this.container.classList.add("u-unused") : this.container.classList.remove("u-unused")
    }
    isFill(): boolean {
        return this.value.length !== 0
    }
    get requiredField():boolean{
        return this._requiredField
    }
    clearAutoSavedText(){
        this.textInput.value("")
        this.textInput.clearAutosavedValue()
    }
    destroy(){
        this.container.innerHTML = "";
        this.ulist.destroy();
    }
}

