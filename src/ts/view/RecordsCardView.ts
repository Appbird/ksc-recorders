import { element } from "../utility/ViewUtility";
import { RecordInNutShellModel } from "../model/RecordInNutShellModel";
import { TagsView } from "./TagsView";
import { IRecordGroup } from "../type/record/IRecordGroup";

export class RecordCardsView{
    private _htmlElement:Element = document.createElement("div");
    constructor(recordGroup:IRecordGroup){
        this._htmlElement.classList.add("c-recordCardsGroup");
        this._htmlElement.appendChild(
            element`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
            <div class="c-title__main">${recordGroup.groupName}</div>
            <div class="c-title__sub">${recordGroup.groupSubName}</div>
            </div>
        <div class="c-stateInfo">
            <div class = "c-stateInfo__unit">
                <div class ="c-iconWithDescription"> <i class="fas fa-list"></i> ${recordGroup.numberOfRecords} Records </div>
                </div>
            <div class = "c-stateInfo__unit">
                <div class ="c-iconWithDescription"> <i class="fas fa-running"></i> ${recordGroup.numberOfRunners} Runners </div>
                </div>
            <div class = "c-stateInfo__unit">
                <div class ="c-iconWithDescription"> <i class="fas fa-history"></i> Last post </div> ${recordGroup.lastPost}
                </div>
            </div>
        <hr noshade class="u-bold">
        </div>
        `
        )
        for(const record of recordGroup.records)this.appendRecordCard(new RecordInNutShellModel(record));
    }
    get htmlElement(){
        return this._htmlElement;
    }
    appendRecordCard(recordCardModel:RecordInNutShellModel){
        console.log(recordCardModel.gameSystemEnvironment);
        const gameEnv = recordCardModel.gameSystemEnvironment;
        recordCardModel.gameSystemEnv.gameSystemName
        //TODO:これをElementとして出力して、TagをDOM操作で後付けしたい v
        const ele = element`<div class = "c-recordCard u-width95per">
        <div class = "c-title --withUnderline">
            <div class = "c-title__main">${recordCardModel.time}</div>
                <div class="c-iconWithDescription">
                <i class="fas fa-user"></i>${recordCardModel.runner}
            </div>
        </div>
        
        <hr noshade class="u-thin">

        <div class = "c-tags">
            <div class = "c-tag --gameSystem">
                <div class="c-iconWithDescription">
                    <i class="fas fa-star"></i>${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}
                </div>
            </div>
            <div class = "c-tag --target">
                <div class="c-iconWithDescription">
                    <i class="fas fa-flag"></i>${recordCardModel.target}
                </div>
            </div>
        </div>
        `;
        const tagsView = new TagsView();
        for (const ability of recordCardModel.ability) tagsView.generateTag((ability === undefined ? "Not Found" : ability),"ability")
        ele.appendChild(tagsView.getElement());
        this._htmlElement.append(ele);
    }
}
