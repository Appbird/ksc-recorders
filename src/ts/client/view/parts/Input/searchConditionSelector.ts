import { IAbilityItem } from "../../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { element, HTMLConverter } from "../../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../../interface/AppInterfaces";
import { createElementWithIdAndClass, generateIcooonHTML } from "../../../utility/aboutElement";
import { IView } from "../../IView";
import { choiceString } from "../../../../utility/aboutLang";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { StateAdministrator } from "../../../Administrator/StateAdminister";
import { SelectChoicesCapsuled } from "./SelectChoicesCapsuled";

const contents = {
    Difficulty : {
        Japanese:"検索したい難易度を指定してください。",
        English:"Set the difficulty."
    },
    Segments:  [
        {
            Japanese:"検索したい記録のセグメントを指定してください。それぞれのセグメントについて並列に検索をします。",
            English:"Set the segment(s). Records will be picked up for each segment."
        },
        {
            Japanese:"何も指定しなかった場合、上で指定した難易度に含まれるセグメントを全て列挙して検索します。", 
            English: "If you don't set any segment here, records will be picked up for every each segment that the difficulty above includes."
        }
    ],
    Ability: {
        Japanese:"検索したい記録の自機の能力を設定して下さい。順序を考慮します。", 
        English: "Set the abilities. The order DOES matter."
    }

}

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
        this.container.classList.add("searchConditionSelector","u-marginUpDown2emToChildren");
        
        const context = this.container.appendChild(createElementWithIdAndClass({className:"u-width90per u-marginUpDown2emToChildren"}))
        this.htmlConverter = new HTMLConverter(this.app.state.language)
        context.appendChild(this.difficultyColumn)
        context.appendChild(this.targetColumn)
        context.appendChild(this.abilityColumn)
        
        //#CTODO ヘッダの下にp要素を加えて説明を書く。
        this.difficultyColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"difficulty"})}${{Japanese:"難易度(セグメントパック)",English:"Difficulty(Segment Pack)"}}</div> 
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                    <li>${contents.Difficulty}</li>
                </ul>
            </div>`
        )
        this.targetColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"flag"})}${{Japanese:"セグメント",English:"Segments"}}</div>
                    
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                        <li>${contents.Segments[0]}</li>
                        <li>${contents.Segments[1]}</li>
                </ul>
            </div>`
        )
        const maxNumberOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer;
        this.abilityColumn.appendChild(
            this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class = "c-title__sub u-biggerChara">${generateIcooonHTML({icooonName:"star"})}${{Japanese:"能力",English:"Abilities"}}</div>
                </div>
                <hr noshade class="u-thin">
                <ul class="u-margin05em">
                        <li>${contents.Ability}</li>
                        <li>${{Japanese:`このゲームモードは${maxNumberOfPlayer}人プレイにまで対応しています。`, English: `At most ${maxNumberOfPlayer} players can play this game mode at once.`}}</li>
                </ul>
            </div>`
        )
        this.difficultyChoices = new SelectChoicesCapsuled(this.difficultyColumn.appendChild( document.createElement("select") ),difficulties,{language:this.app.state.language})

        this.targetChoices = new SelectChoicesCapsuled(this.targetColumn.appendChild( document.createElement("select")),[],{language:this.app.state.language,maxItemCount:10,needMultipleSelect:true})
        
        //#CTODO 思えばモードによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        
        this.abilityChoices = new SelectChoicesCapsuled(this.abilityColumn.appendChild( document.createElement("select") ),abilities,
            {   maxItemCount:maxNumberOfPlayer,needDuplicatedSelect:true,needMultipleSelect:true,language:this.app.state.language,
                maxItemText:
                    {
                        JDescription:`このゲームモードは最大${maxNumberOfPlayer}人プレイまで対応しています。`,
                        EDescription:`This mode can be played with at most ${maxNumberOfPlayer} kirbys (friends)!`
                    }
            })
        this.setTargetChoices()
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
        },{title:""});
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
                groupSubName:`No. ${index+1}`,
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

