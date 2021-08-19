import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { MovieWidgetCreator } from "../../MovieWidgetCreator";
import { choiceString } from "../../../../../utility/aboutLang";

export class EditorRecordLinkPart implements EditorPart<string> {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private evidenceMovie: MovieWidgetCreator;
    private static readonly _requiredTypeInString = "string";
    get requiredTypeInString(){
        return EditorRecordLinkPart._requiredTypeInString;
    }
    constructor(
        {container,language,title,requiredField,description,icooon,errorText}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description: MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        errorText?:string|MultiLanguageString
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping `<h1 class="u-noUnderline">${generateIcooonHTML({icooonName:(icooon)})}${title}</h1>`);
        this.evidenceMovie = new MovieWidgetCreator(appendElement(this.container,"div"))
        this.textInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per" });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.addChangeEventListener((changed) => {
            try {
                this.evidenceMovie.set(changed)
                this.evidenceMovie.setWidget()
                this.displayError("")
            }catch(err){
                if (!(err instanceof Error)) this.displayError(err)
                this.displayError((errorText) ? choiceString(errorText,language):err.message)
            }
        })
    }
    addChangeEventListener(callback: (changed: string) => void) {
        this.textInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string {
        return this.textInput.value;
    }
    refresh(value: string) {
        this.textInput.value = value;
    }
    disabled(state:boolean){
        this.textInput.disabled(state);
    }
    displayError(err:string){
        this.textInput.setError(err)
    }
    isFill(): boolean {
        try {
            this.evidenceMovie.set(this.value)
            this.displayError("")
            return true;
        }catch(err){
            return false;
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

