import { element } from "../../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { converseMiliSecondsIntoTime, convertNumberIntoDateString } from "../../utility/timeUtility";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";
import { IRecordInShortResolved } from "../../type/record/IRecord";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";
import { IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { StateInfoView } from "./StateInfoView";
import { title } from "node:process";

export class RecordGroupView implements IView{
    private _htmlElement = createElementWithIdAndClass({className:"c-recordCardsGroup"})
    private summaryElement = createElementWithIdAndClass({className:"__summary"})
    private recordCardsElement = createElementWithIdAndClass({className:"__recordCards"})
    private app:IAppUsedToReadOptionsAndTransition;
    constructor(recordGroup:IRecordGroupResolved,app:IAppUsedToReadOptionsAndTransition,options:OptionObject = {
        displayTags:{gameSystemTags:false,targetTags:false,abilityTags:true}
    }){
        this.app = app;
        this._htmlElement.appendChild(this.summaryElement)
        this._htmlElement.appendChild(this.recordCardsElement)
        this.setRecordGroupSummary(recordGroup);
        for(const record of recordGroup.records) this.appendRecordCard(record,options);
    }
    get htmlElement(){
        return this._htmlElement;
    }
    setRecordGroupSummary(recordGroup:IRecordGroupResolved){
        this.summaryElement.innerHTML = "";
        const stateInfoDiv = this.summaryElement.appendChild(element`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
            <div class="c-title__main">${recordGroup.groupName}</div>
            <div class="c-title__sub">${"サブタイトル"}</div>
        </div>
        <div class="stateInfo"></div>
        <hr noshade class="u-bold">
        `).getElementsByClassName("stateInfo")[0]
        stateInfoDiv.appendChild(
            new StateInfoView()
                .appendInfo(`${recordGroup.numberOfRecords} records`,"list")
                .appendInfo(`${recordGroup.numberOfRunners} runners`,"running")
                .appendInfo(convertNumberIntoDateString(recordGroup.lastPost), "history")
                .htmlElement
            )
        
    }
    clearRecordCards(){
        this.recordCardsElement.innerHTML = "";
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
            ${(!options.displayTags.gameSystemTags && !options.displayTags.targetTags && options.displayTags.abilityTags) ? ``: `<hr noshade class="u-thin">`}
            </div>`
        //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        ele.addEventListener("click",() => {
            const rrg = record.regulation.gameSystemEnvironment
            this.app.transition("detailView",{ gameSystemEnv:{ gameSystemID:rrg.gameSystemID, gameModeID:rrg.gameModeID}, id:record.id, lang:this.app.language})
        })
        TagsView.generateTagViewsForRecord( this.app, ele, record, {abilityTags:true})
        
    }
}

interface OptionObject{
    displayTags:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
}