import { IAbilityItem } from "../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../type/list/IGameDifficultyItem";
import { element } from "../../utility/ViewUtility";
import { APIAdministrator } from "../administers/APICaller";
import { IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";
import Choices from "choices.js"
import { selectAppropriateDescription, selectAppropriateName } from "../../utility/aboutLang";
import { IItemOfResolveTableToName } from "../../type/list/IItemOfResolveTableToName";

class SearchConditionSelectorView implements IView{
    private element = createElementWithIdAndClass({id:"searchConditionSelector"})
    private difficultyColumn = createElementWithIdAndClass({id:"selector_difficulty"});
    private targetColumn = createElementWithIdAndClass({id:"selector_target"});
    private abilityColumn = createElementWithIdAndClass({id:"selector_difficulty"});
    private app:IAppUsedToReadOptionsAndTransition
    private api:APIAdministrator;
    private difficultySelectedID:string|null;
    constructor(app:IAppUsedToReadOptionsAndTransition,api:APIAdministrator, difficulties:IGameDifficultyItem[], abilities:IAbilityItem[]){
        this.app = app;
        this.difficultySelectedID = null;
        this.api = api;
        this.element.appendChild(element`
        <div class="articleTitle">
            <div class="c-title">
                <div class = "c-title__main"><i class="fas fa-star"></i>記録検索</div>
                <div class = "c-title__sub">Set conditions to search records!</div>
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
                <div class = "c-title__sub u-biggerChara">難易度</div>
                <div class = "c-title__sub">Difficulty</div>
            </div>`
        )
        this.prepareChoices(difficulties,abilities)

        //#TODO いいボタンのデザインを探してくる。
    }


    private prepareChoices( difficulties:IGameDifficultyItem[], abilities:IAbilityItem[]){
        
        const difficultyChoices = this.generateChoices(this.difficultyColumn.appendChild( document.createElement("select") ),difficulties,"Select 1 difficulty to search.")

        //#TODO 思えばゲームによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        const maxNubmerOfPlayer = this.app.state.gameSystemEnvDisplayed.gameSystem.maxNumPlayer;

        const abilityChoices = this.generateChoices(this.abilityColumn.appendChild( document.createElement("select") ),abilities,
            `Select at most ${maxNubmerOfPlayer} abilities of players to search`,{needMultipleSelect:true,maxItemCount:maxNubmerOfPlayer})
    

        const targetChoicesElement = this.targetColumn.appendChild( document.createElement("select"))
        const targetChoices = this.generateChoices(targetChoicesElement,[],"target",{needMultipleSelect:true,disable:true})
        

        targetChoicesElement.addEventListener("showDropdown",() => {

            if (this.difficultySelectedID === difficultyChoices.getValue(true)) return;
            const selected = difficultyChoices.getValue(true);
            this.difficultySelectedID = (Array.isArray(selected)) ? selected[0] : selected;

            targetChoices.setChoices(async () => {
                try{

                    
                    const selectedTargetItem = difficulties.find((ele) => ele.id === this.difficultySelectedID)
                    if (selectedTargetItem === undefined)throw new Error(`ID${selectedTargetItem}に対応した難易度が存在しません。`)

                    const asg = this.app.state.gameSystemEnvDisplayed;
                    const result = await this.api.access("list_targets",{
                        gameSystemEnv:{gameSystemID:asg.gameSystem.id,gameModeID:asg.gameMode.id},
                        id:selectedTargetItem.TargetIDsIncludedInTheDifficulty
                    })
                    return result.result;


                } catch(error) {
                    console.error(error);
                    if (!(error instanceof Error)) return
                    this.app.transition("errorView",{title:"難易度に対応する計測対象の取得に失敗しました。",message:error.message})
                }
            })
        })
    }
    private generateChoices(insertedElement:HTMLSelectElement,data:IItemOfResolveTableToName[],placeholderValue:string,{
        needMultipleSelect=false,maxItemCount=1,removeItemButton=true,disable=false}:{needMultipleSelect?:boolean,maxItemCount?:number,removeItemButton?:boolean,disable?:boolean} = {} 
        ){
        insertedElement.multiple = needMultipleSelect
        return new Choices(
            insertedElement
            ,{
                choices:data.map( (ele) => {return {
                    value:ele.id, label:selectAppropriateName(ele,this.app.state.language),
                    selected:false, disabled:false,
                    customProperties:{describe:selectAppropriateDescription(ele,this.app.state.language)}
                }}),
                placeholderValue: placeholderValue,
                maxItemCount: maxItemCount,
                removeItemButton: removeItemButton,
            })
    }

    get htmlElement(){
        return this.element;
    }
    
}