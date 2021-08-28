import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { generateIcooonHTML, appendElement } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { RadioButtonCupsuled } from "../../Input/RadioButtonCupsuled";

const context = {
    option_score:{
        Japanese:"真",
        English:"True"
    },
    option_time:{
        Japanese:"偽",
        English:"False"
    }
}
export class EditorBooleanPart implements EditorPart<boolean>{
    
    private container: HTMLElement;
    private input: RadioButtonCupsuled<boolean>;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = `boolean`;
    constructor(
        {container,language,title,requiredField,description,icooon,indentifiedName}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description: MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        indentifiedName:string
    }) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);

        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`<h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>`);
        this.input = new RadioButtonCupsuled<boolean>(appendElement(this.container,"div"), indentifiedName,language,
            [
                { optionLabel:context.option_time,value:true  },
                { optionLabel:context.option_score,value:false }
            ]);
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: boolean) => void): void {
        this.input.onChangeEventListener(callback);
    }
    refresh(value: boolean): void {
        this.input.value = value;
    }
    isFill(): boolean {
        return true;
    }
    disabled(state: boolean): void {
        this.input.disabled(state)
    }
    destroy(): void {
        this.input.destroy();
        this.ulist.destroy();
    }
    get requiredTypeInString():string{
        return EditorBooleanPart._requiredTypeInString;
    }
    get requiredField(): boolean{
        return this._requiredField;
    }
    get value(): boolean{
        return this.input.value;
    }
    
}