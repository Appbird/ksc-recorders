import { IAbilityItem } from "../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../type/list/IGameDifficultyItem";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { selectAppropriateDescription, selectAppropriateName } from "../../../utility/aboutLang";
import { ITargetItem } from "../../../type/list/ITargetItem";
import { StateAdministrator } from "../../administers/StateAdminister";
import { SelectChoicesCapsuled } from "./SelectChoicesCapsuled";

export class SearchConditionSelectorView implements IView{
    private element = createElementWithIdAndClass({id:"searchConditionSelector"})

    private difficultyColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});
    private targetColumn = createElementWithIdAndClass({id:"selector_target",className:"u-width90per"});
    private abilityColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});

    private difficultyChoices:SelectChoicesCapsuled<IGameDifficultyItem>;
    private targetChoices:SelectChoicesCapsuled<ITargetItem>;
    private abilityChoices:SelectChoicesCapsuled<IAbilityItem>;


    private app:IAppUsedToReadAndChangeOnlyPageState
    private difficultySelectedID:string|null;
    constructor(app:IAppUsedToReadAndChangeOnlyPageState, difficulties:IGameDifficultyItem[], abilities:IAbilityItem[]){
        this.app = app;
        if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。")
        this.difficultySelectedID = null;

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

        //#TODO ヘッダの下にp要素を加えて説明を書く。
        this.difficultyColumn.appendChild(
            element`
            <div class="c-title">
                <div class = "c-title__sub u-biggerChara">難易度</div> <div class = "c-title__sub">Difficulty</div>
            </div>`
        )
        this.targetColumn.appendChild(
            element`
            <div class="c-title">
                <div class = "c-title__sub u-biggerChara">計測対象</div> <div class = "c-title__sub">Target</div>
            </div>`
        )
        this.abilityColumn.appendChild(
            element`
            <div class="c-title">
                <div class = "c-title__sub u-biggerChara">能力</div> <div class = "c-title__sub">Ability</div>
            </div>`
        )
        this.difficultyChoices = new SelectChoicesCapsuled(this.difficultyColumn.appendChild( document.createElement("select") ),difficulties,{language:this.app.state.language})

        this.targetChoices = new SelectChoicesCapsuled(this.targetColumn.appendChild( document.createElement("select")),[],{language:this.app.state.language,maxItemCount:10,disable:true,needMultipleSelect:true})
        
        //#CTODO 思えばモードによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        const maxNubmerOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer;
        this.abilityChoices = new SelectChoicesCapsuled(this.abilityColumn.appendChild( document.createElement("select") ),abilities,
            {   maxItemCount:maxNubmerOfPlayer,needDuplicatedSelect:true,needMultipleSelect:true,language:this.app.state.language,
                maxItemText:
                    {JDescription:`このゲームモードは最大${maxNubmerOfPlayer}人プレイまで対応しています。`,
                    EDescription:`This mode can be played with at most ${maxNubmerOfPlayer} kirbys (friends)!`}
            })
        
        this.difficultyChoices.addEventListener("hideDropdown",() => {
            this.targetChoices.enable();
            if (this.difficultySelectedID === this.difficultyChoices.getValue(true)) return;
            if (this.difficultyChoices.getValue(true) === undefined) { this.targetChoices.disable(); return; }
            this.difficultySelectedID = this.difficultyChoices.getValueAsValue(true)
            this.setTargetChoices()
        })

        //#CTODO いいボタンのデザインを探してくる。
        this.element.appendChild(element`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
        .addEventListener("click",() => this.whenDecideCondition())
    }
    private whenDecideCondition(){
        const abilitySelected = this.abilityChoices.getValueAsArray(true);
        const targetSelected = this.targetChoices.getValueAsArray(true);
        
        if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。")
        const gameSystemID = this.app.state.gameSystemEnvDisplayed.gameSystem.id
        const gameModeID = this.app.state.gameSystemEnvDisplayed.gameMode.id
        
        this.app.transition("searchResultView",{
            condition: this.generateCondition(targetSelected,abilitySelected,gameSystemID,gameModeID)
        },{title:"検索画面"});
    }
    private generateCondition(targetSelected:string[],abilitySelected:string[],gameSystemID:string,gameModeID:string){
        if (targetSelected.length === 0){
            return [{
                groupName: "", groupSubName:"",
                gameSystemEnv:{
                    gameSystemID:gameSystemID, gameModeID:gameModeID,
                    gameDifficultyID:(this.difficultySelectedID === null) ? "whole": this.difficultySelectedID
                },
                language:this.app.state.language, startOfRecordArray:0,limitOfRecordArray:3,
                orderOfRecordArray:this.app.state.superiorScore, abilityIDs:abilitySelected
            }]
        }
        return targetSelected.map( (id,index) => {
            const result = this.targetChoices.data.find((target) => target.id === id);
            return {
                groupName: (result === undefined) ? "":selectAppropriateName(result,this.app.state.language),
                groupSubName:`${index+1}戦目`,
                gameSystemEnv:{gameSystemID:gameSystemID, gameModeID:gameModeID},
                language:this.app.state.language, startOfRecordArray:0,limitOfRecordArray:3, orderOfRecordArray:this.app.state.superiorScore,
                abilityIDs:abilitySelected, targetIDs:[id]
            }
        })
    }
    private async setTargetChoices(){
        this.targetChoices.clearChoices();
        this.targetChoices.clearStore()
        try{
            const selectedTargetItem = this.difficultyChoices.data.find((ele) => ele.id === this.difficultySelectedID)
            if (selectedTargetItem === undefined)throw new Error(`# エラーの内容\n\nID${selectedTargetItem}に対応した難易度が存在しません。`)

            const result = await this.app.accessToAPI("list_targets",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed,gameModeID:this.app.state.gameModeIDDisplayed},id:selectedTargetItem.TargetIDsIncludedInTheDifficulty
            })

            this.targetChoices.setChoices(result.result)

        } catch(error) {
            console.error(error);
            if (!(error instanceof Error)) return [];
            this.app.transition("errorView",{title:"難易度に対応する計測対象の取得に失敗しました。", message:`${error.message}`})
        }
    }
   
    get htmlElement(){
        return this.element;
    }
    
}

