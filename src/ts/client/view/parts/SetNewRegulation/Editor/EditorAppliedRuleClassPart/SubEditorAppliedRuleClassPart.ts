import { LanguageInApplication } from "../../../../../../type/LanguageInApplication";
import { IAppliedClassInfo } from "../../../../../../type/list/GameModeRule";
import { IDefinedRuleClassItem } from "../../../../../../type/list/IDefinedRuleClassItem";
import { ILabelledDocument } from "../../../../../../type/list/ILabelledDocument";
import { HTMLConverter } from "../../../../../../utility/ViewUtility";
import { appendElement } from "../../../../../utility/aboutElement";
import { SelectChoicesCapsuled } from "../../../Input/SelectChoicesCapsuled";
import { EditorMultiLanguageStringPart } from "../EditorMultiLanguageStringPart";
import { EditorPart } from "../EditorPart";


export class SubeditorAppliedRuleClassesPart implements EditorPart<IAppliedClassInfo> {
    private container: HTMLElement;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private static readonly _requiredTypeInString = undefined;
    private classSelector: SelectChoicesCapsuled<ILabelledDocument>;
    private noteEditor : EditorMultiLanguageStringPart;
    private scopeEditor: EditorMultiLanguageStringPart;
    get requiredTypeInString(){
        return SubeditorAppliedRuleClassesPart._requiredTypeInString;
    }
    constructor(
        {container,language,requiredField,options,index}:{
        container: HTMLElement,
        language: LanguageInApplication,
        requiredField:boolean,
        options:IDefinedRuleClassItem[],
        index:number
    }) {
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h2>${{Japanese:`(${index}) 適用するクラス`,English:`${index} : Applied Class`}}</h2>
        `)
        this.classSelector = new SelectChoicesCapsuled(appendElement(this.container,"select","u-width90per"),options,{
            needDuplicatedSelect:false,needMultipleSelect:false,language
        })
        
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h3>${{Japanese:"このルールクラスの適用範囲",English:"The scope of this rule class."}}</h3>
        `)
        this.scopeEditor = new EditorMultiLanguageStringPart({
            container:appendElement(this.container,"div","u-marginUpDown05em"),
            requiredField: true, language,
            description:[]
        })
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h3>${{Japanese:"注釈",English:"Note"}}</h3>
        `)
        this.noteEditor = new EditorMultiLanguageStringPart({
            container:appendElement(this.container,"div","u-marginUpDown05em"),
            requiredField: true, language,
            description:[]
        })
        
        
    }
    addChangeEventListener(callback: (changed: IAppliedClassInfo|undefined) => void) {
        this.classSelector.addEventListener("change",() => {callback(this.value)})
        this.scopeEditor.addChangeEventListener(() => callback(this.value))
        this.noteEditor.addChangeEventListener(() => callback(this.value))
    }
    get value():  IAppliedClassInfo|undefined {
        const classSelected =  this.classSelector.getValueAsValue()
        if (classSelected === undefined) return undefined
        return {
            id: classSelected,
            scope:this.scopeEditor.value,
            note: this.noteEditor.value
        }
    }
    refresh(value: IAppliedClassInfo) {
        this.classSelector.setSelected(value.id)
        this.scopeEditor.refresh(value.scope)
        this.noteEditor.refresh(value.note)
    }
    refreshOptions(options:IDefinedRuleClassItem[]){
        this.classSelector.setChoices(options)
    }
    disabled(state:boolean){
        (state) ? this.container.classList.add("u-unused") : this.container.classList.remove("u-unused")
    }
    isFill(): boolean {
        return this.classSelector.getValueAsArray()[0] !== undefined && this.scopeEditor.isFill()
    }
    get requiredField():boolean{
        return this._requiredField
    }
    destroy(){
        this.classSelector.destroy()
        this.scopeEditor.destroy()
        this.noteEditor.destroy();
        this.container.innerHTML = ""
    }
}

