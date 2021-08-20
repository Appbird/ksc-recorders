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
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { EditorPlayersWithAttributesPart } from "../SetNewRegulation/Editor/EditorPlayersWithAttributesPart";
import { choiceString } from "../../../../utility/aboutLang";
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
    private gameSystemID:string;
    private gameModeID:string;
    private language:LanguageInApplication
    private isAbilityIDsWithAttributes:boolean;
    private difficultyItems:IGameDifficultyItem[];
    destroy(){
    }
    //#TODO エラー3 INVALID_ARGUMENT: Cannot convert an array value in an array value.を解決する。
    //#CTODO  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,{tagLanguage: language,onDecideEventListener,maxPlayerNumber,fetchTargetItems,defaultRecord,gameSystemID,gameModeID,difficultyItems,abilityItems,abilityAttributeItems,tagItems,runnerID }:{
       difficultyItems:IGameDifficultyItem[],
       abilityItems:IAbilityItem[],
       abilityAttributeItems?:SetOfFlagsOfAbilityAttributeItem[],
       tagItems:IHashTagItem[],
       runnerID:string,
       gameSystemID:string,
       gameModeID:string,maxPlayerNumber:number
       tagLanguage:LanguageInApplication,
        onDecideEventListener:(input:ISentRecordOffer)=>void,
        fetchTargetItems:(targetIDs:string[])=>Promise<ITargetItem[]>|ITargetItem[]
        defaultRecord?:IRecordWithoutID
    }) {
        this.gameSystemID = gameSystemID
        this.gameModeID = gameModeID
        this.language = language
        this.container = container;
        this.container.classList.add("offerForm","u-width95per","u-marginUpDown2emToChildren")
        this.fetchTargetItems = fetchTargetItems
        const appendNewEditorElement = (editorSegment:HTMLElement) => appendElement(createEditorSegmentBaseElement(editorSegment),"div")
        this.runnerID = runnerID
        this.isAbilityIDsWithAttributes = abilityAttributeItems !== undefined
        this.difficultyItems = difficultyItems
        const htmlCon = new HTMLConverter(language)
        const link = new EditorRecordLinkPart({
            container:      appendNewEditorElement(this.container),
            title:          context.URLInput.Header,
            description:    context.URLInput.Notice,   
            icooon:         "link",
            errorText:      context.URLInput.Error,
            language,
            requiredField:  true
        })
        const score = new EditorRecordTimePart({
            container:      appendNewEditorElement(this.container),
            title:          context.ScoreInput.Header,
            description:    context.ScoreInput.Notice,
            icooon:         "time",
            errorText:      context.ScoreInput.Error,
            language,
            requiredField:  true
        })
        const difficultyID = new EditorIDPart({
            container:      appendNewEditorElement(this.container),
            title:          context.DifficultyChoices.Header,
            description:    context.DifficultyChoices.Notice,
            icooon:         "difficulty",
            language,
            requiredField:  true,
            options:        difficultyItems    
        })
        this.targetIDPart = new EditorIDPart({
            container:      appendNewEditorElement(this.container),
            title:          context.TargetChoices.Header,
            description:    context.TargetChoices.Notice,
            icooon:         "flag",
            language,
            requiredField:  true,
            options:        []
        })
        const abilityIDs = (abilityAttributeItems !== undefined) ? 
            new EditorPlayersWithAttributesPart({
                container:      appendNewEditorElement(this.container),
                title:          context.AbilityChoices.Header,
                description:    context.AbilityChoices.Notice,
                maxPlayerNumber:     maxPlayerNumber,
                icooon:         "star",
                language,
                requiredField:  true,
                abilityOptions: abilityItems,
                setsOfFlagsOfAbilityAttributeItem: abilityAttributeItems
            })
            : new EditorMultipleIDPart({
                container:      appendNewEditorElement(this.container),
                title:          context.AbilityChoices.Header,
                description:    context.AbilityChoices.Notice,
                maxItemCount:   maxPlayerNumber,
                icooon:         "star",
                language,
                requiredField:  true,
                options:        abilityItems
            })
        const tagNames = new EditorTagPart({
            container:      appendNewEditorElement(this.container),
            title:          context.TagInput.Header,
            description:    context.TagInput.Notice,
            icooon:         "tag",
            language,
            requiredField:  false,
            options:        tagItems
        })
        const runnerNote = new EditorSimpleMDEPart({
            container:      appendNewEditorElement(this.container),
            title:          context.RunnersNote.Header,
            description:    context.RunnersNote.Notice,
            icooon:         "notebook",
            language,
            requiredField:  false,
        })
        this.editors = {
            link, score,
            difficultyID,
            targetID: this.targetIDPart,
            abilityIDs, tagNames,runnerNote
        }
         //#CTODO AbilityAttribute専用のエディタを用意する。

        this.editorFormManager = new EditorFormManager(this.editors)

        if (defaultRecord) {
            const difficultyID = defaultRecord.regulation.gameSystemEnvironment.gameDifficultyID;
            this.setTargetOptions(this.getTargetsListFromDifficultyID(difficultyID))
            this.editorFormManager.refresh(this.convertIRecordToRecordData(defaultRecord))
        }
        const errorViewer =  this.container.appendChild(htmlCon.elementWithoutEscaping`<div class="u-width90per u-margin2em u-redChara u-bolderChara"></div>`)
        this.container.appendChild(htmlCon.elementWithoutEscaping`<div class="u-width50per u-margin2em"><div class="c-button">${{Japanese:"決定",English:"Submit"}}</div></div>`)
            .addEventListener("click",() => {
                if (!this.editorFormManager.isFill()){
                    errorViewer.innerHTML = choiceString({Japanese:"入力が不十分です。",English:"The input of the form is not enough."},language)
                }
                onDecideEventListener(this.convertRecordInputDataToISentRecordOffer(this.editorFormManager.value))
            })
        
        this.editors.difficultyID.addChangeEventListener( (change) => (change === undefined) ?  undefined: this.setTargetOptions(this.getTargetsListFromDifficultyID(change)))
        if (this.editors.difficultyID.value !== undefined) this.setTargetOptions(this.getTargetsListFromDifficultyID(this.editors.difficultyID.value))
    }


    private convertRecordInputDataToISentRecordOffer(value:RecordInputData):ISentRecordOffer{
        //#CTODO ここの実装
        let abilityInfo:{abilityIDs:string[],abilitiesAttributeIDs?:OnePlayerOfAbilityAttribute[]};
        if (this.isAbilityIDsWithAttributeID(value.abilityIDs)){
            abilityInfo = {
                abilityIDs: value.abilityIDs.map(info => info.abilityID),
                abilitiesAttributeIDs: value.abilityIDs.map(info => info.attribute)
            }
        } else abilityInfo = { abilityIDs: value.abilityIDs }
        return {
            score:value.score,
            regulation:{
                gameSystemEnvironment:{
                    gameSystemID:       this.gameSystemID,
                    gameModeID:         this.gameModeID,
                    gameDifficultyID:   value.difficultyID
                },
                ...abilityInfo,
                targetID: value.targetID
            },
            tagName: value.tagNames,
            languageOfTagName:this.language,
            link: [value.link],
            note: value.runnerNote

        }
    }


    private convertIRecordToRecordData(value:IRecordWithoutID):RecordInputData{
        //#CTODO ここの実装
        //#TODO API:record/modifyの記録データのsetをupdateに置き換えたい
        const vr = value.regulation
        const vrg = vr.gameSystemEnvironment
        return {
            link:           value.link[0],
            score:          value.score,
            difficultyID:   vrg.gameDifficultyID,
            targetID:       vr.targetID,
            tagNames:       value.tagName,
            abilityIDs:     (vr.abilitiesAttributeIDs === undefined) ? 
                vr.abilityIDs : 
                vr.abilityIDs.map((abilityID,index) => {
                    if (vr.abilitiesAttributeIDs === undefined) throw new Error("[OfferFormView:convertIRecordToRecordData] vr.abilitiesAttributeIDs === undefined")
                    return {
                        abilityID,
                        attribute: vr.abilitiesAttributeIDs[index]
                    }
                }),
            runnerNote:     value.note
        }
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
    private isAbilityIDsWithAttributeID(value:string[]|{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]):value is {abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]{
        return this.isAbilityIDsWithAttributes
    }

    get htmlElement() {
        return this.container;
    }

}

