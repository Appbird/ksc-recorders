import { appendElement } from "../../../utility/aboutElement";
import { IView } from "../../IView";
import { ISentRecordOffer } from "../../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { IRecordWithoutID } from "../../../../type/record/IRecord";
import context from "./language.json"
import { EditorRecordLinkPart } from "../SetNewRegulation/Editor/EditorRecordLinkPart";
import { InputFormObjectWithAllProperties } from "../SetNewRegulation/EditorFormManagerWithAutoDetect";
import { EditorRecordTimePart } from "../SetNewRegulation/Editor/EditorRecordTimePart";
import { EditorMultipleIDPart } from "../SetNewRegulation/Editor/EditorMultipleIDPart";
import { EditorTagPart } from "../SetNewRegulation/Editor/EditorTagPart";
import { EditorIDPart } from "../SetNewRegulation/Editor/EditorIDPart";
import { EditorSimpleMDEPart } from "../SetNewRegulation/Editor/EditorSimpleMDEPart";
import { EditorFormManager } from "../SetNewRegulation/EditorFormManager";
import { createEditorSegmentBaseElement } from "../../state/settingNewRegulationState/utility";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { IAbilityItem } from "../../../../type/list/IAbilityItem";
import { IHashTagItem } from "../../../../type/list/IGameSystemInfo";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../../type/list/AttributeOfAbilityItem";
import { OnePlayerOfAbilityAttribute } from "../../../../type/foundation/IRegulation";
import { elementWithoutEscaping } from "../../../../utility/ViewUtility";
type RecordInputData = {
    link:string;
    score:number;
    difficultyID:string;
    targetID:string;
    abilityIDs:string[]|{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]
    tagNames:string[];
    runnerNote:string;
}
export class OfferFormView implements IView {
    private container: HTMLElement;

    private editors:InputFormObjectWithAllProperties<RecordInputData>;
    private editorFormManager:EditorFormManager<RecordInputData>
    private fetchTargetItems:(difficultyIDs:string[])=>Promise<ITargetItem[]>|ITargetItem[]
    private targetIDPart:EditorIDPart;
    private runnerID:string;
    private isAbilityIDsWithAttributes:boolean;
    private difficultyItems:IGameDifficultyItem[];
    destroy(){
    }
    //#CTODO  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,{language,onDecideEventListener,fetchTargetItems,defaultRecord,difficultyItems,abilityItems,abilityAttributeItems,tagItems,runnerID }:{
       difficultyItems:IGameDifficultyItem[],abilityItems:IAbilityItem[],abilityAttributeItems?:SetOfFlagsOfAbilityAttributeItem[],tagItems:IHashTagItem[],runnerID:string,
       language:LanguageInApplication,
        onDecideEventListener:(input:ISentRecordOffer)=>void,
        fetchTargetItems:(difficultyIDs:string[])=>Promise<ITargetItem[]>|ITargetItem[]
        defaultRecord?:IRecordWithoutID
    }) {
        this.container = container;
        this.container.classList.add("offerForm","u-width95per","u-marginUpDown2emToChildren")
        this.fetchTargetItems = fetchTargetItems
        const requiredField = true;
        const appendNewEditorElement = (editorSegment:HTMLElement) => appendElement(createEditorSegmentBaseElement(editorSegment),"div")
        this.runnerID = runnerID
        this.isAbilityIDsWithAttributes = abilityAttributeItems !== undefined
        this.difficultyItems = difficultyItems
        this.targetIDPart = new EditorIDPart({
            container:      appendNewEditorElement(this.container),
            title:          context.TargetChoices.Header,
            description:    context.TargetChoices.Notice,
            icooon:         "flag",
            language,
            requiredField,
            options:        []
        })
        this.editors = {
            link:   new EditorRecordLinkPart({
                container:      appendNewEditorElement(this.container),
                title:          context.URLInput.Header,
                description:    context.URLInput.Notice,   
                icooon:         "link",
                errorText:      context.URLInput.Error,
                language,
                requiredField
            }),
            score:  new EditorRecordTimePart({
                container:      appendNewEditorElement(this.container),
                title:          context.ScoreInput.Header,
                description:    context.ScoreInput.Notice,
                icooon:         "time",
                errorText:      context.ScoreInput.Error,
                language,
                requiredField,
            }),
            difficultyID: new EditorIDPart({
                container:      appendNewEditorElement(this.container),
                title:          context.DifficultyChoices.Header,
                description:    context.DifficultyChoices.Notice,
                icooon:         "difficulty",
                language,
                requiredField,
                options:        difficultyItems    
            }),
            targetID: this.targetIDPart,
            //#TODO AbilityAttribute専用のエディタを用意する。
                //#NOTE     1属性ごとにEditorAbilityAttributePart, その能力ごとにEditorAbilityWithAttributesPartを用意し
                //*>        最後に、EditorListOfAbilitiesWithAttributesPartを用意して、要求された機能を実現する。
                //#NOTE     AbilityAttributeは一能力につく一属性のことを表すとする。
                //#NOTE     abilityIDs
            abilityIDs: new EditorMultipleIDPart({
                container:      appendNewEditorElement(this.container),
                title:          context.AbilityChoices.Header,
                description:    context.AbilityChoices.Notice,
                icooon:         "star",
                language,
                requiredField,
                options:        abilityItems
            }),
            tagNames: new EditorTagPart({
                container:      appendNewEditorElement(this.container),
                title:          context.TagInput.Header,
                description:    context.TagInput.Notice,
                icooon:         "tag",
                language,
                requiredField,
                options:        tagItems
            }),
            runnerNote: new EditorSimpleMDEPart({
                container:      appendNewEditorElement(this.container),
                title:          context.RunnersNote.Header,
                description:    context.RunnersNote.Notice,
                icooon:         "notebook",
                language,
                requiredField,
            })
        }
        this.editorFormManager = new EditorFormManager(this.editors)
        if (defaultRecord) {
            const difficultyID = defaultRecord.regulation.gameSystemEnvironment.gameDifficultyID;
            this.setTargetOptions(this.getTargetsListFromDifficultyID(difficultyID))
            this.editorFormManager.refresh(this.convertIRecordToRecordData(defaultRecord))
        }
        this.editors.difficultyID.addChangeEventListener( (change) => (change === undefined) ?  undefined: this.setTargetOptions(this.getTargetsListFromDifficultyID(change)))
        this.container.appendChild(elementWithoutEscaping`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
        .addEventListener("click",() => onDecideEventListener(this.convertRecordInputDataToISentRecordOffer(this.editorFormManager.value)))
    }
    private convertRecordInputDataToISentRecordOffer(value:RecordInputData):ISentRecordOffer{
        //#TODO ここの実装
    }
    private convertIRecordToRecordData(value:IRecordWithoutID):RecordInputData{
        //#TODO ここの実装
        //#TODO API:record/modifyの記録データのsetをupdateに置き換えたい
    }
    private getTargetsListFromDifficultyID(difficultyID:string){
        const result = this.difficultyItems.find( difficultyItem => difficultyID === difficultyItem.id )
        if (result === undefined) throw new Error("[OfferFormView:getTargetsListFromDifficultyID] result === undefined")
        return result.TargetIDsIncludedInTheDifficulty
    }
    private async setTargetOptions(difficultyID:string[]){
        const fetchResult = await this.fetchTargetItems(difficultyID)
        this.targetIDPart.refreshOption(fetchResult)
    }


    get htmlElement() {
        return this.container;
    }

}

