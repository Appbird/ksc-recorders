import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { ScoreType } from "../../../../../type/list/IGameModeItem";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { generateIcooonHTML, appendElement } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { RadioButtonCupsuled } from "../../Input/RadioButtonCupsuled";

const context = {
    option_score:{
        Japanese:"スコア",
        English:"Score"
    },
    option_time:{
        Japanese:"時間",
        English:"Time"
    }
}
export class EditorScoreTypePart implements EditorPart<ScoreType>{
    
    private container: HTMLElement;
    private input: RadioButtonCupsuled<ScoreType>;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = `"score"|"time"`;
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
        this.input = new RadioButtonCupsuled<ScoreType>(appendElement(this.container,"div"), indentifiedName,language,
            [
                {optionLabel:context.option_time,value:"time"},
                {optionLabel:context.option_score,value:"score"}
            ]);
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: ScoreType) => void): void {
        this.input.onChangeEventListener(callback);
    }
    refresh(value: ScoreType): void {
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
        return EditorScoreTypePart._requiredTypeInString;
    }
    get requiredField(): boolean{
        return this._requiredField;
    }
    get value(): ScoreType{
        return this.input.value;
    }
    
}