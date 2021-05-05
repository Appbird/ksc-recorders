import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import flatPicker from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { Japanese } from "flatpickr/dist/l10n/ja.js"
export class EditorDatePart implements EditorPart<number>{
    private datePickerElement:HTMLInputElement;
    private datePicker:Instance;
    private container:HTMLElement;
    private ulist:UListCupsuled;
    private _requiredField:boolean;
    
    private static reqT = "number";
    constructor({container,requiredField,language,title,description,icooon}:{
        container:HTMLElement,
        requiredField:boolean,
        language:LanguageInApplication,
        title:MultiLanguageString,
        description:MultiLanguageString[],
        icooon?:string
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        
        this.container = container;
        this._requiredField = requiredField;
        const htmlConverter = new HTMLConverter(language);

        this.container.appendChild(htmlConverter.elementWithoutEscaping`<h1>${generateIcooonHTML({icooonName:icooon})}${title}</h1>`);
        this.datePickerElement = appendElement(this.container,"input")
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        
        this.datePicker = flatPicker(this.datePickerElement,{
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            defaultHour: 6,
            altInputClass: "c-textInput u-width90per u-underline",
            locale: ( () => {
                switch(language){
                    case "Japanese":return Japanese;
                    case "English":return undefined;
                }
            })()
        })
    }
   
    addChangeEventListener(callback: (changed: number) => void): void {
        this.datePicker.input.addEventListener("change",() => callback(this.value))
    }
    refresh(value: number): void {
        const time = new Date(value);
        this.datePicker.setDate(fixTime(time));
    }
    isFill(): boolean {
        return this.datePicker.selectedDates.length !== 0;
    }
    disabled(state: boolean): void {
        const classList = this.datePicker.element.classList;
        if (state)classList.add("u-unused")
        else classList.add("u-unused")
    }
    destroy(): void {
        this.datePicker.destroy();
        this.ulist.destroy();
        this.container.innerHTML = "";
    }
    get value(): number{
        return fixTime(this.datePicker.selectedDates[0]).getTime();
    };
    get requiredTypeInString(): string{
        return EditorDatePart.reqT;
    };
    get requiredField(): boolean{
        return this._requiredField;
    };
}
function fixTime(time:Date){
    time.setHours(6)
    time.setMinutes(0)
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
}