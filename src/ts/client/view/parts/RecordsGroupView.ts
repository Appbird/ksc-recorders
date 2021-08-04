import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { convertNumberIntoDateString } from "../../../utility/timeUtility";
import { IRecordGroupResolved } from "../../../type/record/IRecordGroupResolved";
import { IRecordInShortResolved } from "../../../type/record/IRecord";
import { createElementWithIdAndClass, findElementByClassNameWithErrorPossibility } from "../../utility/aboutElement";
import { IView } from "../IView";
import { StateInfoView } from "./StateInfoView";
import { OptionObjectSet, RecordCardView } from "./RecordCardView";
import { ScoreType } from "../../../type/list/IGameModeItem";

export class RecordGroupView implements IView{
    private container:HTMLElement;
    private summaryElement = createElementWithIdAndClass({className:"__summary"})
    private recordCardsElement = createElementWithIdAndClass({className:"__recordCards"})

    private recordCards:RecordCardView[] = [];
    private stateInfoView:StateInfoView;
    private option:OptionObjectSet;
    private scoreType:ScoreType;
    constructor(container:HTMLElement,recordGroup:IRecordGroupResolved,scoreType:ScoreType,
        {
            clickOnCardEventListener,
            verifiedCheck=false,
            displayTags={gameSystemTags:false,targetTags:false,abilityTags:true}
        }:{
            displayTags?:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean},
            verifiedCheck?:boolean,
            clickOnCardEventListener?:(record:IRecordInShortResolved) => void
        } = {})
    {

        this.container = container;
        this.container.classList.add("c-recordCardsGroup");

        this.scoreType = scoreType;
        this.option = {
            displayTags:displayTags, verifiedCheck:verifiedCheck
        };
        this.container.appendChild(this.summaryElement)
        this.container.appendChild(this.recordCardsElement)

        const recordGroupHeader = this.summaryElement.appendChild(elementWithoutEscaping`
        <div>
            <div class = "c-recordGroupHeader">
                <div class="c-title">
                <div class="c-title__main">${recordGroup.groupName}</div>
                ${(recordGroup.groupSubName === undefined) ? "" : `<div class="c-title__sub">${recordGroup.groupSubName}</div>`}
            </div>
            <div class="stateInfo"></div>
            <hr noshade class="u-bold">
        </div>
        `)
        const stateInfoDiv = findElementByClassNameWithErrorPossibility(recordGroupHeader,"stateInfo")
        this.stateInfoView = new StateInfoView(stateInfoDiv.appendChild(document.createElement("div")))
                .appendInfo(`${recordGroup.numberOfRecords} records`,"list")
                .appendInfo(`${recordGroup.numberOfRunners} runners`,"running")
                .appendInfo(convertNumberIntoDateString(recordGroup.lastPost), "history")

        if (recordGroup.records.length === 0) this.recordCardsElement.appendChild(element`<div class="u-width95per"><h2>記録が存在しませんでした</h2></div>`)
        
        for(const record of recordGroup.records) this.appendRecordCard(record,clickOnCardEventListener);
    }
    destroy(){
        for(const recordCard of this.recordCards) recordCard.destroy();
        this.stateInfoView.destroy();
        this.container.innerHTML = "";
    }
    clearRecordCards(){
        this.recordCardsElement.innerHTML = "";
    }
    appendRecordCard(record:IRecordInShortResolved,clickEventListener?:(clickedRecord:IRecordInShortResolved) => void){
        const card = new RecordCardView(this.recordCardsElement.appendChild(document.createElement("div")),this.scoreType,record,this.option)
        this.recordCards.push(card);
        if (clickEventListener) card.addClickEventListener(clickEventListener);
    }
}

