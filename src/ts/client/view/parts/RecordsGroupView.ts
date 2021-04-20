import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { TagsView } from "./TagsView";
import { converseMiliSecondsIntoTime, convertNumberIntoDateString } from "../../../utility/timeUtility";
import { IRecordGroupResolved } from "../../../type/record/IRecordGroupResolved";
import { IRecordInShortResolved } from "../../../type/record/IRecord";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { StateInfoView } from "./StateInfoView";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { OptionObjectSet, OptionObject, RecordCardView } from "./RecordCardView";

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
        this._htmlElement.appendChild(new RecordCardView(this.app,record,this.option).htmlElement)
        
    }
}

