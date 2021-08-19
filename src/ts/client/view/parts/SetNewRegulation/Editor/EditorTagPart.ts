import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { ITargetItem } from "../../../../../type/list/ITargetItem";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { SelectTagChoicesCapsuled } from "../../Input/SelectTagChoicesCapsuled";
import { IItemOfResolveTableToName } from "../../../../../type/list/IItemOfResolveTableToName";
import { choiceString } from "../../../../../utility/aboutLang";

export class EditorTagPart implements EditorPart<string[]> {
    private container: HTMLElement;
    private language: LanguageInApplication
    private selectInput: SelectTagChoicesCapsuled;
    private htmlCon: HTMLConverter;
    private static _requiredTypeInString = "string[]";
    private _requiredField:boolean;
    private ulist:UListCupsuled;
    private unsubscribe:(()=>void)|null = null;
    get requiredTypeInString(){
        return EditorTagPart._requiredTypeInString
    }
    constructor({container,language,title,description,requiredField,icooon,options}:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        options:IItemOfResolveTableToName[]
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>
        `);
        this.language = language
        this.selectInput = new SelectTagChoicesCapsuled(this.container.appendChild(document.createElement("select")), options.map(option => choiceString(option,language)), { language: language});
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
    }
    addChangeEventListener(callback: (changed: string[]) => void) {
        this.selectInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string[] {
        return this.selectInput.getValueAsArray();
    }
    disabled(state:boolean){
        if (state) this.selectInput.disable()
            else this.selectInput.enable()
    }
    refresh(value: string[]) {
        this.selectInput.setSelected(value);
    }
    refreshOption(options:ITargetItem[]){
        this.selectInput.clearStore();
        this.selectInput.setChoices(options.map(option => choiceString(option,this.language)));
    }
    isFill(): boolean {
        return this.selectInput.getValueAsArray().length === 0;
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        if (this.unsubscribe !== null)this.unsubscribe();
        this.selectInput.destroy();
        this.ulist.destroy();
    }

}
