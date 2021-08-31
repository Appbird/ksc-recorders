import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { generateIcooonHTML, appendElement } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { RadioButtonCupsuled } from "../../Input/RadioButtonCupsuled";

const context = {
    option_True:{
        Japanese:"真",
        English:"True"
    },
    option_False:{
        Japanese:"偽",
        English:"False"
    }
}
export class EditorMultipleTogglePart implements EditorPart<boolean[]>{
    
    private container: HTMLElement;
    private input: RadioButtonCupsuled<boolean>[];
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = `boolean[]`;
    constructor(
        {container,language,title,requiredField,description,icooon,indentifiedName,toggleNumber}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description: MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        indentifiedName:string,toggleNumber:number
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);

        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`<h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>`);
        this.input = []
        for (let i = 0; i < toggleNumber; i++){
            this.input.push(
                new RadioButtonCupsuled<boolean>(appendElement(this.container,"div"), indentifiedName,language,
                [
                    { optionLabel:context.option_False,value:false  },
                    { optionLabel:context.option_True,value:true }
                ])
            )
        }
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: boolean[]) => void): void {
        for (const editor of this.input) editor.onChangeEventListener(() => callback(this.value))
    }
    refresh(value: boolean[]): void {
        if (this.input.length !== value.length) throw new Error("this.input.length !== value.length")
        this.input.forEach((editor,index) => editor.value = value[index])
    }
    isFill(): boolean {
        return true;
    }
    disabled(state: boolean): void {
        for (const editor of this.input)editor.disabled(state)
    }
    destroy(): void {
        for (const editor of this.input)editor.destroy();
        this.ulist.destroy();
    }
    get requiredTypeInString():string{
        return EditorMultipleTogglePart._requiredTypeInString;
    }
    get requiredField(): boolean{
        return this._requiredField;
    }
    get value(): boolean[]{
        return this.input.map(toggle => toggle.value)
    }
    
}