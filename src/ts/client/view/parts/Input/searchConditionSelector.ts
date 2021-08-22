import { IAbilityItem } from "../../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { elementWithoutEscaping, HTMLConverter } from "../../../../utility/ViewUtility";
import { createElementWithIdAndClass } from "../../../utility/aboutElement";
import { IView } from "../../IView";
import { choiceString } from "../../../../utility/aboutLang";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { IHashTagItem } from "../../../../type/list/IGameSystemInfo";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../../type/list/AttributeOfAbilityItem";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { EditorFormManager, InputFormObject } from "../SetNewRegulation/EditorFormManager";
import { EditorIDPart } from "../SetNewRegulation/Editor/EditorIDPart";
import { EditorMultipleIDPart } from "../SetNewRegulation/Editor/EditorMultipleIDPart";
import { EditorPlayersWithAttributesPart } from "../SetNewRegulation/Editor/EditorPlayersWithAttributesPart";
import { SearchCondition } from "../../../../type/record/SearchCondition";
import { OrderOfRecordArray } from "../../../../type/record/OrderOfRecordArray";
import { OnePlayerOfAbilityAttribute } from "../../../../type/foundation/IRegulation";
import { DecideButtonPart } from "../DecideButtonPart";

const contents = {
    Difficulty : {
        title:{
            Japanese:"難易度(セグメントパック)",
            English:"Difficulty(Segment Pack)"
        },
        description:[{
            Japanese:"検索したい難易度を指定してください。",
            English:"Set the difficulty."
        }],
        icooon:"difficulty"
    },
    Segments:  {
        title:{
            Japanese:"セグメント",
            English:"Segments"
        },
        description:[{
            Japanese:"検索したい記録のセグメントを指定してください。それぞれのセグメントについて並列に検索をします。",
            English:"Set the segment(s). Records will be picked up for each segment."
        },
        {
            Japanese:"何も指定しなかった場合、上で指定した難易度に含まれるセグメントを全て列挙して検索します。", 
            English: "If you don't set any segment here, records will be picked up for every each segment that the difficulty above includes."
        }],
        icooon: "flag"
    },
    Ability: {
        title:{Japanese:"能力",English:"Abilities"},
        description:[{
            Japanese:"検索したい記録の自機の能力を設定して下さい。順序を考慮します。", 
            English: "Set the abilities. The order DOES matter."
        }],
        icooon: "star"
    },
    tag:{
        title:{
            Japanese:"タグ",English:"Hashtag"
        },
        description:[{
            Japanese:`タグが使用された記録を検索できます。`, English: `Set hashtags.`
        }],
        icooon: "tag"
    }

}
type InputType = {
    difficultySelected:string|undefined,
    targetSelected:string[],
    abilitySelected:string[]|{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[],
    hashTagSelected:string[]
}
export class SearchConditionSelectorView implements IView{
    private container:HTMLElement;
    private editors:InputFormObject<InputType>;
    private editorManager:EditorFormManager<InputType>;
    private difficultyColumn:HTMLElement;
    private targetColumn:HTMLElement;
    private abilityColumn:HTMLElement;
    private tagColumn = createElementWithIdAndClass({id:"selector_hashTag"});
    
    private superiorScore:OrderOfRecordArray;
    private gameSystemID:string;
    private targetStoredItems:ITargetItem[] = []
    private gameModeID:string;
    private language:LanguageInApplication
    private difficultyItems:IGameDifficultyItem[]
    private fetchTargetItems:(targetIDs:string[])=>Promise<ITargetItem[]>|ITargetItem[]
    //#CTODO  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,{gameSystemID,gameModeID,superiorScore,onDecideEventListener,fetchTargetItems,difficulties,abilities,hashTags,setsOfFlagsOfAbilityAttributeItem,language,maxPlayerNumber}:{
        gameSystemID:string
        gameModeID:string
        difficulties:IGameDifficultyItem[]
        abilities:IAbilityItem[]
        setsOfFlagsOfAbilityAttributeItem:SetOfFlagsOfAbilityAttributeItem[]
        hashTags:IHashTagItem[]
        maxPlayerNumber:number
        language:LanguageInApplication,
        onDecideEventListener:(input:SearchCondition[])=>void,
        superiorScore:OrderOfRecordArray,

        fetchTargetItems:(targetIDs:string[])=>Promise<ITargetItem[]>|ITargetItem[]
    }){
        this.gameSystemID = gameSystemID
        this.gameModeID = gameModeID
        this.superiorScore = superiorScore
        this.language = language
        this.difficultyItems = difficulties
        this.fetchTargetItems = fetchTargetItems

        this.container = container;
        const context = this.container.appendChild(createElementWithIdAndClass({className:"u-width90per u-marginUpDown2emToChildren"}))
        this.difficultyColumn = context.appendChild(createElementWithIdAndClass())
        context.appendChild(elementWithoutEscaping`<hr noshade class="u-thin">`);
        this.targetColumn = context.appendChild(createElementWithIdAndClass())
        context.appendChild(elementWithoutEscaping`<hr noshade class="u-thin">`);
        this.abilityColumn = context.appendChild(createElementWithIdAndClass())
        context.appendChild(elementWithoutEscaping`<hr noshade class="u-thin">`);
        this.tagColumn = context.appendChild(createElementWithIdAndClass())

        const difficultySelectEditor = new EditorIDPart(
            {
                ...contents.Difficulty,
                container: this.difficultyColumn,
                language,
                requiredField:false,
                options:difficulties
            }
        )
        const targetSelectEditor = new EditorMultipleIDPart(
            {
                ...contents.Segments,
                container: this.targetColumn,
                language,
                requiredField:false,
                options:[]
            }
        )
        const abilitySelectEditor = (setsOfFlagsOfAbilityAttributeItem !== undefined && setsOfFlagsOfAbilityAttributeItem.length !== 0) ?
            new EditorPlayersWithAttributesPart(
                {
                    ...contents.Ability,
                    container: this.abilityColumn,
                    language,
                    requiredField:false,
                    abilityOptions: abilities,
                    setsOfFlagsOfAbilityAttributeItem,minPlayerNumber:0,
                    maxPlayerNumber
                }
            ):
            new EditorMultipleIDPart(
                {
                    ...contents.Ability,
                    container: this.abilityColumn,
                    language,
                    requiredField:false,
                    options:abilities,
                    maxItemCount:maxPlayerNumber
                }
            )
        this.editors = {
            difficultySelected:difficultySelectEditor,
            targetSelected:     targetSelectEditor,
            abilitySelected:    abilitySelectEditor,
            hashTagSelected:    new EditorMultipleIDPart(
                {
                    ...contents.tag,
                    container: this.tagColumn,
                    language,
                    requiredField:false,
                    options:hashTags
                }
            )   
        }
        this.editorManager = new EditorFormManager(this.editors)
        this.editors.difficultySelected.addChangeEventListener(async (changed) => {
            if (changed) {
                const options = await this.getTargetItems(changed)
                targetSelectEditor.refreshOption(options)
                this.targetStoredItems = options
            } else {
                targetSelectEditor.refreshOption([])
                this.targetStoredItems = []
            }
        })
        
        const errorViewer =  this.container.appendChild(elementWithoutEscaping`<div class="u-width90per u-margin2em u-redChara u-bolderChara"></div>`)
        new DecideButtonPart(this.container.appendChild(elementWithoutEscaping`<div class="u-width50per u-margin2em"></div>`) as HTMLElement,{
            text:{Japanese:"決定",English:"Submit"},language,
            onClick:() => {
                if (!(!this.isAbilitySelectEditor(abilitySelectEditor) && abilitySelectEditor.isFillAllAbility())){
                    errorViewer.innerHTML = choiceString({Japanese:"能力欄の入力が不十分です。(能力属性のみを指定した検索は現在できません。)",English:"The input of Ability isn't enough. (For now, searching with only specifying attributes of ability is not implemented.)"},language)
                    return;
                }
                onDecideEventListener(this.generateCondition())
            }
        })

        const difficultyID = this.editors.difficultySelected.value
        if (difficultyID !== undefined) this.getTargetItems(difficultyID).then(targetItems => targetSelectEditor.refreshOption(targetItems))
    
    }
    isAbilitySelectEditor(editor:EditorPlayersWithAttributesPart|EditorMultipleIDPart):editor is EditorMultipleIDPart{
        const value = editor.value
        if (value === undefined) return false
        return typeof value[0] === "string"
    }
    destroy(){
        this.editorManager.destroy()
    }
    private async getTargetItems(selectedDifficulty:string){
        const segments = this.difficultyItems.find(dif => dif.id === selectedDifficulty)?.TargetIDsIncludedInTheDifficulty
        if (segments === undefined) throw new Error("[SearchConditionSelectorView:setTargetItems] ")
        return this.fetchTargetItems(segments)
    }
    private generateCondition():SearchCondition[]{
        const editorInput = this.editorManager.value
        if (editorInput.targetSelected.length === 0){
            return [{
                ...this.convertAbilityAttribute(editorInput.abilitySelected),
                groupName: "", groupSubName:"",
                gameSystemEnv:{
                    gameSystemID:this.gameSystemID, gameModeID:this.gameModeID,
                    gameDifficultyID:(editorInput.difficultySelected === undefined) ? "whole" : editorInput.difficultySelected
                },
                language:this.language, startOfRecordArray:0,limitOfRecordArray:3,
                orderOfRecordArray:this.superiorScore, tagIDs:editorInput.hashTagSelected
            }]
        }
        return editorInput.targetSelected.map( (id,index) => {
            const result = this.targetStoredItems.find((target) => target.id === id);
            return {
                ...this.convertAbilityAttribute(editorInput.abilitySelected),
                groupName: (result === undefined) ? "":choiceString(result,this.language),
                groupSubName:`No. ${index+1}`,
                gameSystemEnv:{gameSystemID:this.gameSystemID, gameModeID:this.gameModeID},
                language:this.language, startOfRecordArray:0,limitOfRecordArray:3, orderOfRecordArray:this.superiorScore,
                targetIDs:[id], tagIDs:editorInput.hashTagSelected
            }
        })
    }
    private convertAbilityAttribute(abilitySelected:string[]|{abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]):{
        abilityIDs:string[],
        abilityAttributeIDs?:OnePlayerOfAbilityAttribute[]
    }{
        if (abilitySelected.length === 0) return {abilityIDs: []}
        if (typeof abilitySelected[0] === "string") return {abilityIDs: abilitySelected as string[]}
        abilitySelected = abilitySelected as {abilityID:string,attribute:OnePlayerOfAbilityAttribute}[]
        return {
            abilityIDs: abilitySelected.map(abilitySelected => abilitySelected.abilityID),
            abilityAttributeIDs: abilitySelected.map(
                player => player.attribute.map(attr => {
                    return {
                        attributeID: attr.attributeID,
                        onFlagIDs:   attr.onFlagIDs   
                    }
                })
            )
        }
    }
   
    
}

