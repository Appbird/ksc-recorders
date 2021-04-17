import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { converseMiliSecondsIntoTime, convertNumberIntoDateString } from "../../../utility/timeUtility";
import { IRecordGroupResolved } from "../../../type/record/IRecordGroupResolved";
import { IRecordInShortResolved } from "../../../type/record/IRecord";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { StateInfoView } from "./StateInfoView";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";

export class RecordGroupView implements IView{
    private _htmlElement = createElementWithIdAndClass({className:"c-recordCardsGroup"})
    private summaryElement = createElementWithIdAndClass({className:"__summary"})
    private recordCardsElement = createElementWithIdAndClass({className:"__recordCards"})
    private app:IAppUsedToReadAndChangeOnlyPageState;
    private option:OptionObjectSet;
    constructor(recordGroup:IRecordGroupResolved,app:IAppUsedToReadAndChangeOnlyPageState,
        {
            displayTags={gameSystemTags:false,targetTags:false,abilityTags:true},
            setClickListener=false
        }:OptionObject = {}){
        this.app = app;
        this.option = {displayTags:displayTags,setClickListener:setClickListener};
        this._htmlElement.appendChild(this.summaryElement)
        this._htmlElement.appendChild(this.recordCardsElement)
        this.setRecordGroupSummary(recordGroup);
        if (recordGroup.records.length === 0)this.recordCardsElement.appendChild(element`<div class="u-width95per"><h2>記録が存在しませんでした</h2></div>`)
        for(const record of recordGroup.records) this.appendRecordCard(record);
    }
    get htmlElement(){
        return this._htmlElement;
    }
    setRecordGroupSummary(recordGroup:IRecordGroupResolved){
        this.summaryElement.innerHTML = "";
        const stateInfoDiv = this.summaryElement.appendChild(elementWithoutEscaping`
        <div>
            <div class = "c-recordGroupHeader">
                <div class="c-title">
                <div class="c-title__main">${recordGroup.groupName}</div>
                ${(recordGroup.groupSubName === undefined) ? "" : `<div class="c-title__sub">${recordGroup.groupSubName}</div>`}
            </div>
            <div class="stateInfo"></div>
            <hr noshade class="u-bold">
        </div>
        `).getElementsByClassName("stateInfo")[0]
        if(stateInfoDiv === undefined) throw new Error("予期しないエラーです。")
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
    appendRecordCard(record:IRecordInShortResolved){
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        const ele = element`
            <div class = "c-recordCard u-width95per">
                <div class = "c-title --withUnderline">
                    <div class = "c-title__main">${converseMiliSecondsIntoTime(record.score)}</div>
                    <div class="c-iconWithDescription">
                        <i class="fas fa-user"></i>${record.runnerName}
                    </div>
                </div>
            ${(!this.option.displayTags.gameSystemTags && !this.option.displayTags.targetTags && this.option.displayTags.abilityTags) ? ``: `<hr noshade class="u-thin">`}
            </div>`
        //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        ele.addEventListener("click",() => {
            const rrg = record.regulation.gameSystemEnvironment
            this.app.transition("detailView",{ gameSystemEnv:{ gameSystemID:rrg.gameSystemID, gameModeID:rrg.gameModeID}, id:record.id, lang:this.app.state.language})
        })
        TagsView.generateTagViewsForRecord( this.app, ele, record, {abilityTags:true,setClickListener:false})
        this.recordCardsElement.appendChild(ele)
        
    }
}

interface OptionObject{
    displayTags?:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
    setClickListener?:boolean
}
interface OptionObjectSet{
    displayTags:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
    setClickListener:boolean
}