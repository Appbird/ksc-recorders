import { element } from "../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { IRecordGroupWithName } from "../type/record/IRecordGroup";
import { IRecordInShortWithName } from "../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../utility/timeUtility";

export class RecordGroupView{
    private _htmlElement:Element = document.createElement("div");
    constructor(recordGroup:IRecordGroupWithName){
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
        for(const record of recordGroup.records)this.appendRecordCard(record);
    }
    get htmlElement(){
        return this._htmlElement;
    }
    appendRecordCard(record:IRecordInShortWithName){
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        const ele = element`
            <div class = "c-recordCard u-width95per">
            <div class = "c-title --withUnderline">
                <div class = "c-title__main">${converseMiliSecondsIntoTime(record.score)}</div>
                    <div class="c-iconWithDescription">
                    <i class="fas fa-user"></i>${record.runnerName}
                </div>
            </div>

            <hr noshade class="u-thin">`

        const tagsView = new TagsView();
        const gameEnv = record.regulation.gameSystemEnvironment;
        tagsView.generateTag(`${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}`,"gameSystem");
        tagsView.generateTag(record.regulation.targetName,"target");
        for (const ability of record.regulation.abilityNamesOfPlayerCharacters) tagsView.generateTag((ability === undefined ? "Not Found" : ability),"ability")
        ele.appendChild(tagsView.getElement());
        
        this._htmlElement.append(ele);
    }
}
