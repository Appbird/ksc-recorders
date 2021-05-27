import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { IItemOfResolveTableToNameLackingOfID } from "../../../../../type/list/IItemOfResolveTableToName";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { TextInputCapsuled } from "../../TextInputCapsuled";
import { UListCupsuled } from "../../UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";

export class EditorCSVForInputingItemPart implements EditorPart<IItemOfResolveTableToNameLackingOfID[]> {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled
    private static readonly _requiredTypeInString = "string";
    get requiredTypeInString(){
        return EditorCSVForInputingItemPart._requiredTypeInString;
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
        this.textInput = new TextInputCapsuled(appendElement(this.container,"div"), { defaultValue:"",className:"u-width90per", allowNewLine:true });
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: IItemOfResolveTableToNameLackingOfID[]) => void) {
        this.textInput.addEventListener("change", () => callback(this.value));
    }
    get value(): IItemOfResolveTableToNameLackingOfID[] {
        //#TODO ここを変更する
        //*> テキストデータをCSVとして読み取り、型に合うようなデータに変換する。
        return ;
    }
    refresh(value: IItemOfResolveTableToNameLackingOfID[]) {
        //#TODO ここを変更する。
        this.textInput.value = value;
    }
    disabled(state:boolean){
        this.textInput.disabled(state);
    }
    isFill(): boolean {
        //#TODO ここの条件を変更する。
        //*> CSVの形式を満たしていなければ、満たされていないとみなす。
        return this.textInput.value.length !== 0;
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.textInput.destroy();
        this.ulist.destroy();
    }
}


function convertCSVToData(input:string):IItemOfResolveTableToNameLackingOfID[]{
    const lines = input.split("\n");
    const header = lines.shift()?.replace(/\s/g,"").split(",");
    if (header === undefined) throw new Error("CSVで表される表のカラムが未定義です。")
    if (!checkIfColumnsAreCorrect(header,["Japanese","English"]) && !checkIfColumnsAreCorrect(header,["Japanese","English","JDescription","EDescription"])) throw new Error("CSVで表される表のカラムが未定義です。")
    const dataInLines = lines.map(line => line.replace(/\s/g,"").split(","))
    if (!dataInLines.every(dataInLine => dataInLine.length === header.length)) throw new Error("CSVで表されるの行ごとの要素数が不揃いです。")
    return dataInLines.map( dataInLine => { 
        return (header.length === 2) ?
            {
                Japanese:dataInLine[0], English:dataInLine[1]
            }:
            {
                Japanese:dataInLine[0], English:dataInLine[1],
                JDescription:dataInLine[2], EDescription:dataInLine[3]
            }
    })
    
}
function checkIfColumnsAreCorrect(expecteds:string[],actuals:string[]):boolean{
    const expectedCopied = expecteds.concat().sort()
    const actualsCopied = actuals.concat().sort()
    return expectedCopied.every((expected,index) => actualsCopied[index] === expected)
}