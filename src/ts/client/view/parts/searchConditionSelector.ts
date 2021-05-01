import { IAbilityItem } from "../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../type/list/IGameDifficultyItem";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass, generateIcooonHTML } from "../../utility/aboutElement";
import { IView } from "../IView";
import { choiceString } from "../../../utility/aboutLang";
import { ITargetItem } from "../../../type/list/ITargetItem";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { SelectChoicesCapsuled } from "./SelectChoicesCapsuled";

export class SearchConditionSelectorView implements IView{
    private container:HTMLElement;

    private difficultyColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});
    private targetColumn = createElementWithIdAndClass({id:"selector_target",className:"u-width90per"});
    private abilityColumn = createElementWithIdAndClass({id:"selector_difficulty",className:"u-width90per"});

    private difficultyChoices:SelectChoicesCapsuled<IGameDifficultyItem>;
    private targetChoices:SelectChoicesCapsuled<ITargetItem>;
    private abilityChoices:SelectChoicesCapsuled<IAbilityItem>;
    private htmlConverter:HTMLConverter;

    private app:IAppUsedToReadAndChangeOnlyPageState
    //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,app:IAppUsedToReadAndChangeOnlyPageState, difficulties:IGameDifficultyItem[], abilities:IAbilityItem[]){
        this.app = app;
        if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。")
        this.container = container;
        this.container.classList.add("searchConditionSelector");
        this.container.appendChild(element`
        <div class="articleTitle">
            <div class="c-title">
                <div class = "c-title__main"><i class="fas fa-star"></i>記録検索</div> <div class = "c-title__sub">Set conditions to search records!</div>
            </div>
            <hr noshade class="u-bold">
        </div>`)
        const context = this.container.appendChild(createElementWithIdAndClass({className:"u-width90per"}))
        this.htmlConverter = new HTMLConverter(this.app.state.language)
        context.appendChild(this.difficultyColumn)
        context.appendChild(this.targetColumn)
        context.appendChild(this.abilityColumn)
        
        //#CTODO ヘッダの下にp要素を加えて説明を書く。
        this.difficultyColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"difficulty"})}難易度</div> <div class = "c-title__sub">Difficulty</div>
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                    <li>${{Japanese:"検索したい難易度を指定してください。"}}</li>
                </ul>
            </div>`
        )
        this.targetColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"flag"})}計測対象</div> <div class = "c-title__sub">Target</div>
                    
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                        <li>${{Japanese:"検索したい記録の敵を指定してください。それぞれの敵について並列に検索をします。"}}</li>
                        <li>${{Japanese:"何も指定しなかった場合、難易度の敵を全て列挙して検索します。"}}</li>
                </ul>
            </div>`
        )
        const maxNumberOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer;
        this.abilityColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"star"})}能力</div> <div class = "c-title__sub">Ability</div>
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                        <li>${{Japanese:"検索したい記録の自機の能力を検索して下さい。順序を考慮します。"}}</li>
                        <li>${{Japanese:`このゲームモードは${maxNumberOfPlayer}人プレイにまで対応しています。`}}</li>
                </ul>
            </div>`
        )
        this.difficultyChoices = new SelectChoicesCapsuled(this.difficultyColumn.appendChild( document.createElement("select") ),difficulties,{language:this.app.state.language})

        this.targetChoices = new SelectChoicesCapsuled(this.targetColumn.appendChild( document.createElement("select")),[],{language:this.app.state.language,maxItemCount:10,disable:true,needMultipleSelect:true})
        
        //#CTODO 思えばモードによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        
        this.abilityChoices = new SelectChoicesCapsuled(this.abilityColumn.appendChild( document.createElement("select") ),abilities,
            {   maxItemCount:maxNumberOfPlayer,needDuplicatedSelect:true,needMultipleSelect:true,language:this.app.state.language,
                maxItemText:
                    {
                        JDescription:`このゲームモードは最大${maxNumberOfPlayer}人プレイまで対応しています。`,
                        EDescription:`This mode can be played with at most ${maxNumberOfPlayer} kirbys (friends)!`
                    }
            })
        
        this.difficultyChoices.addEventListener("change",() => {
            this.targetChoices.enable();
            if (this.difficultyChoices.getValue(true) === undefined) { this.targetChoices.disable(); return; }
            this.setTargetChoices()
        })

        //#CTODO いいボタンのデザインを探してくる。
        this.container.appendChild(element`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
        .addEventListener("click",() => this.whenDecideCondition())
    }

    destroy(){
        this.targetChoices.destroy();
        this.difficultyChoices.destroy();
        this.abilityChoices.destroy();
        this.container.innerHTML = "";
    }
    
    private whenDecideCondition(){
        const abilitySelected = this.abilityChoices.getValueAsArray(true);
        const targetSelected = this.targetChoices.getValueAsArray(true);
        
        this.app.transition("searchResultView",{
            condition: this.generateCondition(targetSelected,abilitySelected,this.app.state.gameSystemIDDisplayed,this.app.state.gameModeIDDisplayed)
        },{title:"検索画面"});
    }
    private generateCondition(targetSelected:string[],abilitySelected:string[],gameSystemID:string,gameModeID:string){
        const difficultySelectedID = this.difficultyChoices.getValueAsValue();
        if (targetSelected.length === 0){
            return [{
                groupName: "", groupSubName:"",
                gameSystemEnv:{
                    gameSystemID:gameSystemID, gameModeID:gameModeID,
                    gameDifficultyID:(difficultySelectedID === null) ? "whole": difficultySelectedID
                },
                language:this.app.state.language, startOfRecordArray:0,limitOfRecordArray:3,
                orderOfRecordArray:this.app.state.superiorScore, abilityIDs:abilitySelected
            }]
        }
        return targetSelected.map( (id,index) => {
            const result = this.targetChoices.data.find((target) => target.id === id);
            return {
                groupName: (result === undefined) ? "":choiceString(result,this.app.state.language),
                groupSubName:`${index+1}戦目`,
                gameSystemEnv:{gameSystemID:gameSystemID, gameModeID:gameModeID},
                language:this.app.state.language, startOfRecordArray:0,limitOfRecordArray:3, orderOfRecordArray:this.app.state.superiorScore,
                abilityIDs:abilitySelected, targetIDs:[id]
            }
        })
    }
    private async setTargetChoices(){
        const difficultySelectedID = this.difficultyChoices.getValueAsValue();
        this.targetChoices.clearChoices();
        this.targetChoices.clearStore()
        try{
            const selectedTargetItem = this.difficultyChoices.data.find((ele) => ele.id === difficultySelectedID)
            if (selectedTargetItem === undefined)throw new Error(`# エラーの内容\n\nID${difficultySelectedID}に対応した難易度が存在しません。`)

            const result = await this.app.accessToAPI("list_targets",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed,gameModeID:this.app.state.gameModeIDDisplayed},id:selectedTargetItem.TargetIDsIncludedInTheDifficulty
            })

            this.targetChoices.setChoices(result.result)
            return;
        } catch(error) {
            console.error(error);
            if (!(error instanceof Error)) return [];
            this.app.transition("errorView",{title:"難易度に対応する計測対象の取得に失敗しました。", message:`${error.message}`})
        }
        return;
    }
   
    
}

