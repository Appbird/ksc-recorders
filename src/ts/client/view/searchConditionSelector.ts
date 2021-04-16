import { IAbilityItem } from "../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../type/list/IGameDifficultyItem";
import { element } from "../../utility/ViewUtility";
import { IAppUsedToReadOptionsAndTransition, IAppUsedToReadOptionsTransitionUseAPI } from "../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";
import Choices from "choices.js"
import { choiceDescription, MultiLanguageDescription, selectAppropriateDescription, selectAppropriateName } from "../../utility/aboutLang";
import { IItemOfResolveTableToName } from "../../type/list/IItemOfResolveTableToName";
import { ITargetItem } from "../../type/list/ITargetItem";
import { StateAdministrator } from "../administers/StateAdminister";

export class SearchConditionSelectorView implements IView{
    private element = createElementWithIdAndClass({id:"searchConditionSelector"})

    private difficultyColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});
    private targetColumn = createElementWithIdAndClass({id:"selector_target",className:"u-width90per"});
    private abilityColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});

    private difficultyChoices:Choices;
    private targetChoices:Choices;
    private abilityChoices:Choices;

    private difficultyChoicesElement:HTMLSelectElement;
    private targetChoicesElement:HTMLSelectElement;
    private abilityChoicesElement:HTMLSelectElement;

    private difficulties:IGameDifficultyItem[];
    private abilities:IAbilityItem[];
    private targets:ITargetItem[];

    private app:IAppUsedToReadOptionsTransitionUseAPI
    private difficultySelectedID:string|null;
    constructor(app:IAppUsedToReadOptionsTransitionUseAPI, difficulties:IGameDifficultyItem[], abilities:IAbilityItem[]){
        this.app = app;
        if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。")
        this.difficultySelectedID = null;

        this.difficulties = difficulties;
        this.abilities = abilities;
        this.targets = [];

        this.element.appendChild(element`
        <div class="articleTitle">
            <div class="c-title">
                <div class = "c-title__main"><i class="fas fa-star"></i>記録検索</div> <div class = "c-title__sub">Set conditions to search records!</div>
            </div>
            <hr noshade class="u-bold">
        </div>`)
        const context = this.element.appendChild(createElementWithIdAndClass({className:"u-width90per"}))
        context.appendChild(this.difficultyColumn)
        context.appendChild(this.targetColumn)
        context.appendChild(this.abilityColumn)
        this.difficultyColumn.appendChild(
            element`
            <div class="c-title is-onMiddle">
                <div class = "c-title__sub u-biggerChara">難易度</div> <div class = "c-title__sub">Difficulty</div>
            </div>`
        )
        this.targetColumn.appendChild(
            element`
            <div class="c-title is-onMiddle">
                <div class = "c-title__sub u-biggerChara">計測対象</div> <div class = "c-title__sub">Target</div>
            </div>`
        )
        this.abilityColumn.appendChild(
            element`
            <div class="c-title is-onMiddle">
                <div class = "c-title__sub u-biggerChara">能力</div> <div class = "c-title__sub">Ability</div>
            </div>`
        )
        this.difficultyChoicesElement= this.difficultyColumn.appendChild( document.createElement("select") )
        this.difficultyChoices = this.generateChoices(this.difficultyChoicesElement,this.difficulties)

        this.targetChoicesElement = this.targetColumn.appendChild( document.createElement("select"))
        this.targetChoices = this.generateChoices(this.targetChoicesElement,[],{maxItemCount:10,disable:true})
        
        //#CTODO 思えばモードによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        const maxNubmerOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer;
        this.abilityChoicesElement = this.abilityColumn.appendChild( document.createElement("select") )
        this.abilityChoices = this.generateChoices(this.abilityChoicesElement,this.abilities,
            {   maxItemCount:maxNubmerOfPlayer,needDuplicatedSelect:true,needMultipleSelect:true,
                placeholderValue:`Select at most ${maxNubmerOfPlayer} abilities of players to search`,
                maxItemText:{JDescription:`このゲームモードは最大${maxNubmerOfPlayer}人プレイまで対応しています。`,EDescription:`This mode can be played with at most ${maxNubmerOfPlayer} kirbys (friends)!`}
            })
        
        this.difficultyChoicesElement.addEventListener("hideDropdown",() => {
            this.targetChoices.enable();
            if (this.difficultySelectedID === this.difficultyChoices.getValue(true) || this.difficultyChoices === undefined) return;
            const selected = this.difficultyChoices.getValue(true);
            this.difficultySelectedID = (Array.isArray(selected)) ? selected[0] : selected;
            this.setTargetChoices()
        })

        //#CTODO いいボタンのデザインを探してくる。
        this.element.appendChild(element`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
        .addEventListener("click",() => this.whenDecideCondition())
    }
    private whenDecideCondition(){
            const abilitySelectedValue = this.abilityChoices.getValue(true);
        const abilitySelected = (Array.isArray(abilitySelectedValue)) ? abilitySelectedValue:[abilitySelectedValue]
            const targetSelectedValue = this.targetChoices.getValue(true);
        const targetSelected = (Array.isArray(targetSelectedValue)) ? targetSelectedValue:[targetSelectedValue]
        
        if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。")
        const gameSystemID = this.app.state.gameSystemEnvDisplayed.gameSystem.id
        const gameModeID = this.app.state.gameSystemEnvDisplayed.gameMode.id
        
        this.app.transition("searchResultView",{
            title:"検索画面",
            required:{ 
            condition: this.generateCondition(targetSelected,abilitySelected,gameSystemID,gameModeID)
        }});
    }
    private generateCondition(targetSelected:string[],abilitySelected:string[],gameSystemID:string,gameModeID:string){
        return targetSelected.map( (id,index) => {
            const result = this.targets.find((target) => target.id === id)?.JName;
            console.log(id)
            return {
                groupName: (result === undefined) ? "":result,
                groupSubName:`${index+1}戦目`,
                gameSystemEnv:{
                    gameSystemID:gameSystemID,
                    gameModeID:gameModeID,
                    gameDifficultyID:(this.difficultySelectedID === null) ? undefined: this.difficultySelectedID
                },
                language:this.app.state.language,
                startOfRecordArray:0,limitOfRecordArray:3,
                orderOfRecordArray:this.app.state.superiorScore,
                abilityIDs:abilitySelected,
                targetIDs:(id === undefined) ? undefined:[id]
            }
        })
    }
    private async setTargetChoices(){
        this.targetChoices.clearChoices();
        this.targetChoices.clearStore()
        try{
            const selectedTargetItem = this.difficulties.find((ele) => ele.id === this.difficultySelectedID)
            if (selectedTargetItem === undefined)throw new Error(`# エラーの内容\n\nID${selectedTargetItem}に対応した難易度が存在しません。`)

            const asg = this.app.state.gameSystemEnvDisplayed;
            if (asg.gameSystem === null || asg.gameMode === null) throw new Error()
            const result = await this.app.accessToAPI("list_targets",{
                gameSystemEnv:{gameSystemID:asg.gameSystem.id,gameModeID:asg.gameMode.id},
                id:selectedTargetItem.TargetIDsIncludedInTheDifficulty
            })
            this.targetChoices.setChoices(result.result.map(ele => {
               return {value:ele.id, label:selectAppropriateName(ele,this.app.state.language)}
            }))
        } catch(error) {
            console.error(error);
            if (!(error instanceof Error)) return [];
            this.app.transition("errorView",{title:"難易度に対応する計測対象の取得に失敗しました。", message:`${error.message}`})
        }
    }
    private generateChoices(insertedElement:HTMLSelectElement,data:IItemOfResolveTableToName[],{
            needMultipleSelect=false,maxItemCount=1,needDuplicatedSelect=false,
            removeItemButton=true,disable=false,
            maxItemText,placeholderValue = undefined
        }:{needMultipleSelect?:boolean,placeholderValue?:string,needDuplicatedSelect?:boolean,maxItemCount?:number,removeItemButton?:boolean,disable?:boolean,maxItemText?:MultiLanguageDescription} = {} 
        ){
        insertedElement.multiple = needMultipleSelect;
        insertedElement.disabled = disable;
        const result = new Choices(
            insertedElement
            ,{
                choices:data.map( (ele) => {return { value:ele.id, label:selectAppropriateName(ele,this.app.state.language)}}),
                placeholderValue: placeholderValue,
                maxItemCount: maxItemCount,
                maxItemText: choiceDescription(maxItemText,this.app.state.language),
                removeItemButton: removeItemButton,
                shouldSort:true
            })
        if (!needDuplicatedSelect) return result;
        insertedElement.addEventListener("addItem",(event:any) => {
            result.setChoices([{label:event.detail.label,value:event.detail.value}])
        })
        insertedElement.addEventListener("removeItem",(event:any) => {
            result.clearStore();
            result.setChoices(data.map( (ele) => {return { value:ele.id, label:selectAppropriateName(ele,this.app.state.language)}}))
        })
        return result;
    }

    get htmlElement(){
        return this.element;
    }
    
}
