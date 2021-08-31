import { MultiLanguageString } from "../../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../../type/LanguageInApplication";
import { elementWithoutEscaping, HTMLConverter } from "../../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../../utility/aboutElement";
import { UListCupsuled } from "../../../Input/UListCupsuled";
import { context_required, EditorPart } from "../EditorPart";
import { SmallButtonPart } from "../../../MultiButtonPart";
import { IAppliedClassInfo } from "../../../../../../type/list/GameModeRule";
import { IDefinedRuleClassItem } from "../../../../../../type/list/IDefinedRuleClassItem";
import { SubeditorAppliedRuleClassesPart } from "./SubEditorAppliedRuleClassPart";

type HandledType = IAppliedClassInfo
export class EditorAppliedRuleClassesPart implements EditorPart<HandledType[]> {
    private container: HTMLElement;
    private playersWithAttributesChoices:SubeditorAppliedRuleClassesPart[] = [];
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ruleClassOptions:IDefinedRuleClassItem[]
    private ulist:UListCupsuled;
    private language:LanguageInApplication
    private callbacks:((changed:HandledType[]) => void)[] = [];
    private editorSegment:HTMLElement
    private deleteItemButton:SmallButtonPart
    private addNewItemButton:SmallButtonPart
    constructor({
        container,language,title,
        description,requiredField,icooon="star",ruleClassOptions
    }:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        icooon?:string,
        ruleClassOptions:IDefinedRuleClassItem[]
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.language = language
        this.ruleClassOptions = ruleClassOptions;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>
        `);
        
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.editorSegment = appendElement(this.container,"ul")
        container.appendChild(elementWithoutEscaping`<hr noshade class="u-thin u-width90per">`)

        this.deleteItemButton = new SmallButtonPart(appendElement(this.container,"div"),{
            text:{
                Japanese:"削除",
                English: "Remove",
                iconCSS: "fas fa-trash"
            },color:"--red",
            language,
            switchValue:true,
            onClick:() => {
                this.removeEditor()
            }
        })

        this.addNewItemButton = new SmallButtonPart(appendElement(this.container,"div"),{
            text:{
                Japanese:"追加",
                English: "Add",
                iconCSS:"far fa-plus-square"
            },
            language,
            switchValue:true,
            onClick:() => {
                this.addEditor()
            }
        })
        this.addEditor()
    }
    addChangeEventListener(callback: (changed: HandledType[]) => void) {
        this.callbacks.push(callback)
    }
    private addEditor(){
        const editorNumber = this.playersWithAttributesChoices.length;
        const container = appendElement(this.editorSegment,"div","u-width90per")
        container.appendChild(elementWithoutEscaping`<hr noshade class="u-thin">`)
        const newEditor = new SubeditorAppliedRuleClassesPart({
            container: appendElement(this.editorSegment,"div"),
            language:this.language, requiredField:false,index:editorNumber+1,
            options:[]
        })
        newEditor.refreshOptions(this.ruleClassOptions)
        newEditor.addChangeEventListener(
            () => this.fireCallbacks()
        )
        this.playersWithAttributesChoices.push(newEditor)
        this.resetButtonState()
        
        this.fireCallbacks()
    }
    private fireCallbacks(){
        this.callbacks.forEach(callback => {
            const value = this.value
            if (value === undefined) return;
            callback(value) 
        })
    }
    private removeEditor(){
        const removedEditor = this.playersWithAttributesChoices.pop()
        removedEditor?.destroy()
        this.resetButtonState()
        this.fireCallbacks()
    }
    private resetButtonState(){
        this.deleteItemButton.toggle(1 < this.playersWithAttributesChoices.length)
    }
    get value():HandledType[]|undefined {
        if (this.requiredField && this.playersWithAttributesChoices.some( (editor,index) => (editor.value === undefined) && index !== this.playersWithAttributesChoices.length - 1)) return undefined
        const array =  this.playersWithAttributesChoices.map(editor => editor.value)
        if (this.playersWithAttributesChoices[this.playersWithAttributesChoices.length - 1].value === undefined) array.pop()
        return array as HandledType[]
    }
    disabled(state:boolean){
        for (const editor of this.playersWithAttributesChoices) editor.disabled(state)
    }
    refresh(values:HandledType[]) {
        while (true){
            if (values.length > this.playersWithAttributesChoices.length) this.addEditor()
            if (values.length === this.playersWithAttributesChoices.length) break;
            if (values.length < this.playersWithAttributesChoices.length) this.removeEditor()
        }
        for (let i = 0; i < values.length; i++) this.playersWithAttributesChoices[i].refresh(values[i])
    }
    refreshOption(options:IDefinedRuleClassItem[]){
        this.ruleClassOptions = options
        this.playersWithAttributesChoices.forEach(choice => choice.refreshOptions(options))
    }
    isFill(): boolean {
        return 1 <= this.playersWithAttributesChoices.length && this.playersWithAttributesChoices.every(choice => choice.isFill())
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        this.playersWithAttributesChoices.forEach(choice => choice.destroy())
    }

}
