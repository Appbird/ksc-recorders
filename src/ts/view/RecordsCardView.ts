import { element } from "../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { converseMiliSecondsIntoTime, convertNumberIntoDateString } from "../utility/timeUtility";
import { IRecordGroup } from "../type/record/IRecordGroup";
import { IRecordInShort, IRecordInShortResolved } from "../type/record/IRecord";

export class RecordGroupView{
    private _htmlElement:Element = document.createElement("div");
    
    constructor(recordGroup:IRecordGroup,options:OptionObject = {
        displayTags:{gameSystemTags:false,targetTags:false,abilityTags:true}
    }){
        this._htmlElement.classList.add("c-recordCardsGroup");
        this._htmlElement.appendChild(
            element`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
            <div class="c-title__main">${recordGroup.groupName}</div>
            <div class="c-title__sub">${"サブタイトル"}</div>
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
        for(const record of recordGroup.records)this.appendRecordCard(record,options);
    }
    get htmlElement(){
        return this._htmlElement;
    }
    appendRecordCard(record:IRecordInShortResolved,options:OptionObject){
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        const ele = element`
            <div class = "c-recordCard u-width95per">
            <div class = "c-title --withUnderline">
                <div class = "c-title__main">${converseMiliSecondsIntoTime(record.score)}</div>
                    <div class="c-iconWithDescription">
                    <i class="fas fa-user"></i>${record.runnerName}
                </div>
            </div>

            ${(!options.displayTags.gameSystemTags && !options.displayTags.targetTags && options.displayTags.abilityTags) ? ``: `<hr noshade class="u-thin">`}`

        const tagsViews = [new TagsView(),new TagsView()];
        const gameEnv = record.regulation.gameSystemEnvironment;

        if (options.displayTags.gameSystemTags)tagsViews[0].generateTag(`${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}`,"gameSystem");
        if (options.displayTags.targetTags)tagsViews[0].generateTag(record.regulation.targetName,"target");
        if (options.displayTags.abilityTags)for (const ability of record.regulation.abilityNamesOfPlayerCharacters) tagsViews[1].generateTag((ability === undefined ? "Not Found" : ability),"ability")
        
        if (options.displayTags.gameSystemTags || options.displayTags.targetTags)ele.appendChild(tagsViews[0].getElement());
        if (options.displayTags.abilityTags)ele.appendChild(tagsViews[1].getElement());
        
        this._htmlElement.append(ele);
    }
}

interface OptionObject{
    displayTags:{gameSystemTags:boolean,targetTags:boolean,abilityTags:boolean}
}