import { element } from "../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { converseMiliSecondsIntoTime, convertNumberIntoDateString } from "../utility/timeUtility";
import { IRecordGroup } from "../type/record/IRecordGroup";
import { IRecordInShort, IRecordInShortResolved } from "../type/record/IRecord";

export class RecordGroupView{
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
                <div class ="c-iconWithDescription"> <i class="fas fa-history"></i> Last post </div> ${convertNumberIntoDateString(recordGroup.lastPost)}
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
    appendRecordCard(record:{resolved:IRecordInShortResolved;notResolved:IRecordInShort;}){
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        const ele = element`
            <div class = "c-recordCard u-width95per">
            <div class = "c-title --withUnderline">
                <div class = "c-title__main">${converseMiliSecondsIntoTime(record.notResolved.score)}</div>
                    <div class="c-iconWithDescription">
                    <i class="fas fa-user"></i>${record.resolved.runnerName}
                </div>
            </div>

            <hr noshade class="u-thin">`

        const tagsViews = [new TagsView(),new TagsView()];
        const rrr = record.resolved.regulation;
        const gameEnv = record.resolved.regulation.gameSystemEnvironment;

        tagsViews[0].generateTag(`${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}`,"gameSystem");
        tagsViews[0].generateTag(rrr.targetName,"target");
        for (const ability of rrr.abilityNamesOfPlayerCharacters) tagsViews[1].generateTag((ability === undefined ? "Not Found" : ability),"ability")
        
        for (const tagsView of tagsViews) ele.appendChild(tagsView.getElement());
        
        this._htmlElement.append(ele);
    }
}
