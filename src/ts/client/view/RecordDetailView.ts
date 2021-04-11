import { IRecordResolved } from "../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../utility/timeUtility";
import {  elementWithoutEscaping } from "../../utility/ViewUtility";
import { IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { IView } from "./IView";
import { TagsView } from "./TagsView";
import { convertNumberToRank } from "../../utility/rankUtility";
import { IRegulationResolved } from "../../type/foundation/IRegulation";
const marked = require("marked")

export class RecordDetailView implements IView{
    private _htmlElement = document.createElement("div");
    private app:IAppUsedToReadOptionsAndTransition
    constructor(recordDetail:IRecordResolved,app:IAppUsedToReadOptionsAndTransition,rankOfTheRecord?:number){
        this.app = app;
        this.adjustViewAccordingToRecord(recordDetail,rankOfTheRecord)
    }
    get htmlElement(){
        return this._htmlElement;
    }
    adjustViewAccordingToRecord(recordDetail:IRecordResolved,rankOfTheRecord?:number){
        const recordDetailElement = this._htmlElement.appendChild(
            elementWithoutEscaping`
            <div class="recordDetail">

                    <div class="c-title">
                        <div class="c-title__main">記録の基本情報</div>
                    </div>

                <hr noshade class="u-bold">

                <div class="u-width95per">

                    <div class = "c-evidenceMovie">
                    </div>
                    <div class="c-title">
                        <div class="c-title__sub u-underline"><i class="fas fa-link"></i> <a>${recordDetail.link[0]}</a> </div>
                    </div>
                    
                    <div class="c-title">
                        <div class="c-title__main u-biggerChara">${converseMiliSecondsIntoTime(recordDetail.score)}</div>
                        <div class="c-title__sub u-biggerChara onClickFirer_RunnerName">${(rankOfTheRecord === undefined) ? "" : convertNumberToRank(rankOfTheRecord)}:<i class="fas fa-user"></i>${recordDetail.runnerName}</div>
                    </div>
                    <hr noshade class="u-thin">
                    <div class="tagsDetail"></div>

                </div>


                <div class="u-space3em"></div>


                <div class="c-title">
                    <div class="c-title__main">走者ノート</div>
                </div>

                <hr noshade class="u-bold">

                <div class="u-width95per">
                    <div class="c-runnerNote">
                        ${marked(recordDetail.note)}
                    </div>
                    <div class="u-space3em"></div>
                </div>

            </div>
            `)
            const runnersDiv = this._htmlElement.getElementsByClassName("onClickFirer_RunnerName")[0]
            //#TODO クリックすると走者ページに飛ぶようにしたい
            
            TagsView.generateTagViewsForRecord(this.app,recordDetailElement,recordDetail,{gameSystemTags:true,targetTags:true,abilityTags:true,hashTags:true})
        
        return this;
    }
}