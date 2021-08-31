import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";

export class EditorMultiLanguageStringPart implements EditorPart<MultiLanguageString> {
    private container: HTMLElement;
    private JtextInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = "string";
    private EtextInput: TextInputCapsuled;
    get requiredTypeInString(){
        return EditorMultiLanguageStringPart._requiredTypeInString;
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
        this.JtextInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per",placeHolder:"Japanese" });
        this.EtextInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per",placeHolder:"English" });
        
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: MultiLanguageString) => void) {
        this.JtextInput.addEventListener("change", () => callback(this.value));
        this.EtextInput.addEventListener("change", () => callback(this.value));
    }
    get value(): MultiLanguageString{
        return {
            Japanese: this.JtextInput.value,
            English:  this.EtextInput.value
        }
    }
    refresh(value: MultiLanguageString) {
        this.JtextInput.value = value.Japanese ? value.Japanese:"";
        this.EtextInput.value = value.English ? value.English:"";
    }
    disabled(state:boolean){
        this.JtextInput.disabled(state);
    }
    isFill(): boolean {
        return this.JtextInput.value.length * this.EtextInput.value.length !== 0;
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.JtextInput.destroy();
        this.EtextInput.destroy();
        this.ulist.destroy();
        this.container.innerHTML = ""
    }
}

