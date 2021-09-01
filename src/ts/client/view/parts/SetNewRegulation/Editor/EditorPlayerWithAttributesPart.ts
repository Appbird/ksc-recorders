import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../../utility/ViewUtility";
import { appendElement, generateIcooonHTML } from "../../../../utility/aboutElement";
import { SelectChoicesCapsuled } from "../../Input/SelectChoicesCapsuled";
import { UListCupsuled } from "../../Input/UListCupsuled";
import { context_required, EditorPart } from "./EditorPart";
import { MultiLanguageDescription } from "../../../../../utility/aboutLang";
import { ILabelledDocument } from "../../../../../type/list/ILabelledDocument";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../../../type/list/AttributeOfAbilityItem";
import { OnePlayerOfAbilityAttribute } from "../../../../../type/foundation/IRegulation";
import { EditorCheckButtonPart } from "./EditorCheckButtonPart";

type HandledType ={abilityID:string|undefined,attribute:OnePlayerOfAbilityAttribute}
export class EditorPlayerWithAttributesPart implements EditorPart<HandledType> {
    //#CTODO {能力ID,属性ID}の形で扱えるEditorにする。
    private container: HTMLElement;
    private selectInput: SelectChoicesCapsuled<ILabelledDocument>;
    private htmlCon: HTMLConverter;
    private _requiredField:boolean;
    private ulist:UListCupsuled;
    private attributeChoices: {attributeID:string,editor:EditorCheckButtonPart<string>}[]
    private unsubscribe:(()=>void)|null = null;
    constructor({
        container,language,title,
        description,requiredField,icooon="star",abilityOptions,
        setsOfFlagsOfAbilityAttributeItem,maxItemCount, maxItemText,
    }:{
        container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        description:MultiLanguageString[],
        requiredField:boolean,
        maxItemCount?:number,
        icooon?:string,
        maxItemText?:MultiLanguageDescription,
        abilityOptions:ILabelledDocument[],
        setsOfFlagsOfAbilityAttributeItem:SetOfFlagsOfAbilityAttributeItem[]
    }
    ) {
        description = [...description];
        if(requiredField && description.length !== 0) description.unshift(context_required)
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this._requiredField = requiredField;
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h2 class="u-noUnderline">${generateIcooonHTML({icooonName:icooon})}${title}</h2>
        `);
        this.selectInput = new SelectChoicesCapsuled(appendElement(this.container,"select"), abilityOptions, { language: language,maxItemCount,maxItemText });
        this.attributeChoices = setsOfFlagsOfAbilityAttributeItem.map(
            set => {
                this.container.appendChild(this.htmlCon.elementWithoutEscaping`
                    <h3 class="u-noUnderline">${generateIcooonHTML(set.attributeNameInfo)}${set.attributeNameInfo}</h3>
                `);
                const options = set.flagsInAttribute.map(flag => {
                    return { 
                        optionLabel: flag,
                        value: flag.id
                    }
                })
                return {
                    attributeID:set.attributeNameInfo.id,
                    editor:new EditorCheckButtonPart({
                        container:appendElement(this.container,"div","u-marginUpDown2em"),
                        name:set.attributeNameInfo.English,
                        language,
                        options,
                        requiredItemCount:set.attributeNameInfo.requiredItemCount,
                        maxItemCount: set.attributeNameInfo.maxItemCount,
                        requiredField:true })
                }
            }
        )
        
        this.ulist = new UListCupsuled(appendElement(this.container,"ul"),language,description)

    }
    addChangeEventListener(callback: (changed: HandledType) => void) {
        this.selectInput.addEventListener("change", () => callback(this.value));
        for (const {editor} of this.attributeChoices) editor.addChangeEventListener( () => callback(this.value));
    }
    get value():HandledType {
        const abilityID = this.selectInput.getValueAsValue()
        return {
            abilityID,
            attribute: this.attributeChoices.map(attributeChoice => {return {
                attributeID: attributeChoice.attributeID,
                onFlagIDs: attributeChoice.editor.value
            }})
        };
    }
    disabled(state:boolean){
        if (state) {
            this.selectInput.disable()
            for (const chocie of this.attributeChoices) chocie.editor.disabled(state)
        } else {
            this.selectInput.enable()
            for (const chocie of this.attributeChoices) chocie.editor.disabled(state)
        }
    }
    refresh(value:{abilityID:string,attribute:OnePlayerOfAbilityAttribute}) {
        this.selectInput.setSelected(value.abilityID);
        for (const attribute of value.attribute){
            const targetAttribute = this.attributeChoices.find(attributeChoice => attributeChoice.attributeID === attribute.attributeID)
            if (targetAttribute === undefined) throw new Error("[EditorAbilityWithAttributesPart:refresh] targetAttribute === undefined")
            targetAttribute.editor.refresh(attribute.onFlagIDs)
        }
    }
    refreshOption(options:ILabelledDocument[]){
        this.selectInput.clearStore();
        this.selectInput.setChoices(options);
    }
    isFill(): boolean {
        return this.selectInput.getValueAsArray()[0] !== undefined && this.attributeChoices.every(attributeChoice => attributeChoice.editor.isFill())
    }
    get requiredField(){
        return this._requiredField;
    }
    isFillAllAbility(){
        const abilityFill = this.selectInput.getValueAsArray()[0] !== undefined 
        const attributeEmpty = this.selectInput.getValueAsArray().length === 0
        return (abilityFill && attributeEmpty) || !attributeEmpty
    }
    destroy(){
        if (this.unsubscribe !== null)this.unsubscribe();
        this.selectInput.destroy();
        for (const chocie of this.attributeChoices) chocie.editor.destroy()
        this.ulist.destroy();
        this.container.innerHTML = ""
    }

}
