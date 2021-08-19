import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { convertScoreIntoNumber } from "../../../../../utility/timeUtility";
import { choiceString } from "../../../../../utility/aboutLang";

export class EditorScorePart implements EditorPart<number> {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private language:LanguageInApplication
    private static readonly _requiredTypeInString = "number";
    get requiredTypeInString(){
        return EditorScorePart._requiredTypeInString;
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
        this.textInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per",placeHolder:"0" });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.language = language;
    }
    addChangeEventListener(callback: (changed: number|undefined) => void) {
        this.textInput.addEventListener("change", () => callback(this.value));
    }
    get value(): number|undefined {
        try {
            const result = convertScoreIntoNumber(this.textInput.value)
            this.displayError("")
            return result;
        }catch(err) {
            if (!(err instanceof Error)) this.displayError(err)
            this.displayError(err.message)
            return undefined
        }
    }
    refresh(value: number) {
        this.textInput.value = value.toString();
    }
    displayError(error:string|MultiLanguageString){
        this.textInput.setError(choiceString(error,this.language))
    }
    disabled(state:boolean){
        this.textInput.disabled(state);
    }
    isFill(): boolean {
        try {
            convertScoreIntoNumber(this.textInput.value)
            return true;
        }catch(err) {
            if (!(err instanceof Error)) this.displayError(err)
            this.displayError(err.message)
            return false
        }
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.textInput.destroy();
        this.ulist.destroy();
    }
}

