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
import { SmallButtonPart } from "../../MultiButtonPart";

type HandledType ={abilityID:string,attribute:OnePlayerOfAbilityAttribute}
export class EditorPlayersWithAttributesPart implements EditorPart<HandledType[]> {
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
    private deleteItemButton:SmallButtonPart
    private addNewItemButton:SmallButtonPart
    private minPlayerNumber:number;
    constructor({
        container,language,title,
        description,requiredField,icooon="star",maxPlayerNumber,
        setsOfFlagsOfAbilityAttributeItem,abilityOptions,minPlayerNumber=1
    }:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        minPlayerNumber?:number,
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
        this.minPlayerNumber = minPlayerNumber
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
                if (this.playersWithAttributesChoices.length === this.minPlayerNumber) return;
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
                if (this.maxPlayerNumber === this.playersWithAttributesChoices.length) return
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
        this.resetButtonState()
    }
    private removeEditor(){
        const removedEditor = this.playersWithAttributesChoices.pop()
        removedEditor?.destroy()
        this.resetButtonState()
    }
    private resetButtonState(){
        this.deleteItemButton.toggle(this.minPlayerNumber < this.playersWithAttributesChoices.length)
        this.addNewItemButton.toggle(this.maxPlayerNumber > this.playersWithAttributesChoices.length)
    }
    get value():HandledType[]|undefined {
        if (this.playersWithAttributesChoices.length === 0) return []
        if (this.requiredField && this.playersWithAttributesChoices.some( (choice,index) => (choice.value.abilityID === undefined) && index !== this.playersWithAttributesChoices.length - 1)) return undefined
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
    isFillAllAbility(){
        return this.playersWithAttributesChoices.every((editor) => editor.isFillAllAbility())
    }
    refresh(values:{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]) {
        while (true){
            if (values.length > this.playersWithAttributesChoices.length) this.addEditor()
            if (values.length === this.playersWithAttributesChoices.length) break;
            if (values.length < this.playersWithAttributesChoices.length) this.removeEditor()
        }
        for (let i = 0; i < values.length; i++) this.playersWithAttributesChoices[i].refresh(values[i])
    }
    refreshOption(options:IAbilityItem[]){
        this.playersWithAttributesChoices.forEach(choice => choice.refreshOption(options))
    }
    isFill(): boolean {
        return this.minPlayerNumber <= this.playersWithAttributesChoices.length && this.playersWithAttributesChoices.length <= this.maxPlayerNumber && this.playersWithAttributesChoices.every(choice => choice.isFill())
    }
    get requiredField(){
        return this._requiredField;
    }
    destroy(){
        this.playersWithAttributesChoices.forEach(choice => choice.destroy())
    }

}
