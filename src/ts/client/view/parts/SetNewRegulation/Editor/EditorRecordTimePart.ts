import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { converseMiliSecondsIntoTime, convertTimeIntoNumber } from "../../../../../utility/timeUtility";
import { choiceString } from "../../../../../utility/aboutLang";

export class EditorRecordTimePart implements EditorPart<number> {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private language:LanguageInApplication
    private errorText?:string|MultiLanguageString;
    private static readonly _requiredTypeInString = "number";
    get requiredTypeInString(){
        return EditorRecordTimePart._requiredTypeInString;
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
        const textInputSegment = appendElement(this.container,"div");
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.textInput = new TextInputCapsuled(textInputSegment, { defaultValue:"",className:"u-biggerChara",placeHolder:"00:00.00",errorViewer:this.ulist.unshift({},true) });
        this.language = language;
        this.errorText = errorText
        this.addChangeEventListener( (change) => {
            this.refresh(change);
        })
    }
    addChangeEventListener(callback: (changed: number) => void) {
        this.textInput.addEventListener("change", () => {
            try{
                callback(this.value)
            }catch(err){
                if (!(err instanceof Error)) this.displayError(err)
                this.displayError((this.errorText) ? choiceString(this.errorText,this.language):err.message)
            }
        });
    }
    get value(): number {
        try {
            const result = convertTimeIntoNumber(this.textInput.value)
            this.displayError("")
            return result;
        }catch(err) {
            throw new Error( err )
        }
    }
    refresh(value: number) {
        this.textInput.value = converseMiliSecondsIntoTime(value);
    }
    displayError(error:string|MultiLanguageString){
        this.textInput.setError(choiceString(error,this.language))
    }
    disabled(state:boolean){
        this.textInput.disabled(state);
    }
    isFill(): boolean {
        try {
            convertTimeIntoNumber(this.textInput.value)
            return true;
        }catch(err) {
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

