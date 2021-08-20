import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { elementWithoutEscaping, HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { OnePlayerOfAbilityAttribute } from "../../../../../type/foundation/IRegulation";
import { EditorPlayerWithAttributesPart } from "./EditorPlayerWithAttributesPart";
import { IAbilityItem } from "../../../../../type/list/IAbilityItem";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../../../type/list/AttributeOfAbilityItem";
import { createEditorSegmentBaseElement } from "../../../state/settingNewRegulationState/utility";

type HandledType ={abilityID:string,attribute:OnePlayerOfAbilityAttribute}
export class EditorPlayersWithAttributesPart implements EditorPart<HandledType[]> {
    //#TODO {能力ID,属性ID}の形で扱えるEditorにする。
    private container: HTMLElement;
    private playersWithAttributesChoices:EditorPlayerWithAttributesPart[] = [];
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private abilityOptions:IAbilityItem[]
    private setsFlagsofAbilityAttributeItem:SetOfFlagsOfAbilityAttributeItem[]
    private ulist:UListCupsuled;
    private language:LanguageInApplication
    private maxPlayerNumber:number;
    private callbacks:((changed:HandledType[]) => void)[] = [];
    private editorSegment:HTMLElement
    constructor({
        container,language,title,
        description,requiredField,icooon="star",maxPlayerNumber,
        setsOfFlagsOfAbilityAttributeItem,abilityOptions
    }:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        maxPlayerNumber:number,
        icooon?:string,
        abilityOptions:IAbilityItem[],
        setsOfFlagsOfAbilityAttributeItem:SetOfFlagsOfAbilityAttributeItem[]
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.maxPlayerNumber = maxPlayerNumber
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.language = language
        this.abilityOptions = abilityOptions;
        this.setsFlagsofAbilityAttributeItem = setsOfFlagsOfAbilityAttributeItem
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h1>
        `);
        
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)
        this.editorSegment = appendElement(this.container,"ul")
        this.addEditor()

        container.appendChild(elementWithoutEscaping`<hr noshade class="u-thin u-width90per">`)

        const deleteItemButton = this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <div class="u-width90per u-marginUpDown05em c-itemAddButton --disabled --red"><i class="fas fa-trash"></i><div class="__text">${{
                Japanese:"削除",
                English: "Remove"
            }}</div></div>
        `) as HTMLElement;
        deleteItemButton.addEventListener("click",() => {
            if (this.playersWithAttributesChoices.length === 1) return;
            addNewItemButton.classList.remove("--disabled")
            if (this.playersWithAttributesChoices.length === 2) deleteItemButton.classList.add("--disabled")
            this.removeEditor()
        })

        const addNewItemButton = this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <div class="u-width90per u-marginUpDown05em c-itemAddButton"><i class="far fa-plus-square"></i><div class="__text">${{
                Japanese:"追加",
                English: "Add"
            }}</div></div>
        `) as HTMLElement;
        addNewItemButton.addEventListener("click",() => {
            const difference = this.maxPlayerNumber - this.playersWithAttributesChoices.length
            if (difference === 0) return
            deleteItemButton.classList.remove("--disabled")
            if (difference === 1) addNewItemButton.classList.add("--disabled")
            this.addEditor()
        })
    }
    addChangeEventListener(callback: (changed: HandledType[]) => void) {
        this.callbacks.push(callback)
    }
    private addEditor(){
        const editorNumber = this.playersWithAttributesChoices.length;
        const container = appendElement(this.editorSegment,"div","u-width90per")
        container.appendChild(elementWithoutEscaping`<hr noshade class="u-thin">`)
        const newEditor = new EditorPlayerWithAttributesPart({
            container,
            language:this.language,
            title:`Player ${editorNumber + 1}`,
            description:[],
            requiredField:this._requiredField,
            abilityOptions:[], setsOfFlagsOfAbilityAttributeItem:this.setsFlagsofAbilityAttributeItem
        })
        newEditor.refreshOption(this.abilityOptions)
        newEditor.addChangeEventListener(
            () => this.callbacks.forEach(callback => {
                const value = this.value
                if (value === undefined) return;
                callback(value) 
            })
        )
        this.playersWithAttributesChoices.push(newEditor)
    }
    private removeEditor(){
        const removedEditor = this.playersWithAttributesChoices.pop()
        removedEditor?.destroy()
    }
    get value():HandledType[]|undefined {
        if (this.playersWithAttributesChoices.some( (choice,index) => (choice.value.abilityID === undefined) && index !== this.playersWithAttributesChoices.length - 1)) return undefined
        const array =  this.playersWithAttributesChoices.map(
            choice => {
                return {
                    abilityID:choice.value.abilityID,
                    attribute:choice.value.attribute
                }
            }
        )
        if (this.playersWithAttributesChoices[this.playersWithAttributesChoices.length - 1].value.abilityID === undefined) array.pop()
        return array as HandledType[]
    }
    disabled(state:boolean){
        for (const editor of this.playersWithAttributesChoices) editor.disabled(state)
    }
    refresh(values:{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]) {
        while (values.length !== this.playersWithAttributesChoices.length){
            if (values.length >= this.playersWithAttributesChoices.length) this.addEditor()
            if (values.length <= this.playersWithAttributesChoices.length) this.removeEditor()
        }
        for (let i = 0; i < values.length; i++) this.playersWithAttributesChoices[i].refresh(values[i])
    }
    refreshOption(options:IAbilityItem[]){
        this.playersWithAttributesChoices.forEach(choice => choice.refreshOption(options))
    }
    isFill(): boolean {
        return this.playersWithAttributesChoices.every(choice => choice.isFill())
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        this.playersWithAttributesChoices.forEach(choice => choice.destroy())
    }

}
