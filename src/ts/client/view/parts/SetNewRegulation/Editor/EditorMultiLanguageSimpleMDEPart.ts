import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import SimpleMDE from "simplemde";
import { choiceString } from "../../../../../utility/aboutLang";

export class EditorMultiLanguageSimpleMDEPart implements EditorPart<MultiLanguageString> {
    private container: HTMLElement;
    private JtextInput: SimpleMDE;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = undefined;
    private EtextInput: SimpleMDE;
    private Jtextarea: HTMLTextAreaElement;
    private Etextarea: HTMLTextAreaElement;
    get requiredTypeInString(){
        return EditorMultiLanguageSimpleMDEPart._requiredTypeInString;
    }
    constructor(
        {container,language,title,requiredField,description,icooon}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title?: string|MultiLanguageString,
        description: MultiLanguageString[],
        requiredField:boolean,
        icooon?:string
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        if (title !== undefined) this.container.appendChild(this.htmlCon.elementWithoutEscaping `<h1 class="u-noUnderline">${generateIcooonHTML({icooonName:(icooon)})}${title}</h1>`);
        
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.Jtextarea = appendElement(this.container,"textarea")
        this.Etextarea = appendElement(this.container,"textarea")
        this.JtextInput = new SimpleMDE({
            element:    this.Jtextarea,
            autosave:{
                enabled:false,
                uniqueId:`EditorSimpleMDEPart__${choiceString(title,language)}`
            },
            spellChecker:false,
            placeholder:"Japanese"
        });
        this.EtextInput = new SimpleMDE({
            element:    this.Etextarea,
            autosave:{
                enabled:false,
                uniqueId:`EditorSimpleMDEPart__${choiceString(title,language)}`
            },
            spellChecker:false,
            placeholder:`English`
        });
        
    }
    addChangeEventListener(callback: (changed: MultiLanguageString) => void) {
        this.Jtextarea.addEventListener("change", () => callback(this.value))
        this.Etextarea.addEventListener("change", () => callback(this.value))
    }
    get value():  MultiLanguageString {
        return {
            Japanese:this.JtextInput.value(),
            English:this.EtextInput.value()
        }
    }
    refresh(value: MultiLanguageString) {
        this.JtextInput.value(value.Japanese ? value.Japanese : "");
        this.EtextInput.value(value.English ? value.English : "");
    }
    disabled(state:boolean){
        (state) ? this.container.classList.add("u-unused") : this.container.classList.remove("u-unused")
    }
    isFill(): boolean {
        return this.JtextInput.value().length * this.EtextInput.value().length !== 0
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.ulist.destroy();
        this.container.innerHTML = "";
    }
}

