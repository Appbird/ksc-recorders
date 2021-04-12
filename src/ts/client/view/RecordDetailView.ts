import { IRecordResolved } from "../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../utility/timeUtility";
import {  elementWithoutEscaping } from "../../utility/ViewUtility";
import { IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { IView } from "./IView";
import { TagsView } from "./TagsView";
import { convertNumberToRank } from "../../utility/rankUtility";
import { IRegulationResolved } from "../../type/foundation/IRegulation";
import { MovieWidgetCreator } from "./MovieWidgetCreator";
const marked = require("marked")

export class RecordDetailView implements IView{
    private _htmlElement = document.createElement("div");
    private app:IAppUsedToReadOptionsAndTransition
    /**
     * @param rankOfTheRecord 0を指定すると順位表記を消すことが出来る。
     */
    constructor(recordDetail:IRecordResolved,app:IAppUsedToReadOptionsAndTransition,rankOfTheRecord:number){
        this.app = app;
        this.adjustViewAccordingToRecord(recordDetail,rankOfTheRecord)
    }
    get htmlElement(){
        return this._htmlElement;
    }
    adjustViewAccordingToRecord(recordDetail:IRecordResolved,rankOfTheRecord:number){
        const recordDetailElement = this._htmlElement.appendChild(
            elementWithoutEscaping`
            <div class="recordDetail">

                    <div class="c-title">
                        <div class="c-title__main">記録の基本情報</div>
                    </div>

                <hr noshade class="u-bold">

                <div class="u-width95per standardInfo">

                    <div class = "c-evidenceMovie evidenceMovie">
                    </div>
                    <div class="c-title">
                        <div class="c-title__sub u-underline"><i class="fas fa-link"></i> <a>${recordDetail.link[0]}</a> </div>
                    </div>
                    
                    <div class="c-title">
                        <div class="c-title__main u-biggerChara">${converseMiliSecondsIntoTime(recordDetail.score)}</div>
                        <div class="c-title__sub u-biggerChara onClickFirer_RunnerName">${(rankOfTheRecord === 0) ? "" : convertNumberToRank(rankOfTheRecord)}: <i class="fas fa-user"></i>${recordDetail.runnerName}</div>
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
            
            //#TODO クリックすると走者ページに飛ぶようにしたい

            const standardInfoDiv = recordDetailElement.getElementsByClassName("standardInfo")[0]
            if (standardInfoDiv === undefined) throw new Error("予期せぬエラーです。") 
            const evidenceMovieDiv = recordDetailElement.getElementsByClassName("evidenceMovie")[0]
            if (evidenceMovieDiv === undefined) throw new Error("予期せぬエラーです。")
            new MovieWidgetCreator(recordDetail.link[0]).setWidget(evidenceMovieDiv)
            TagsView.generateTagViewsForRecord(this.app,standardInfoDiv,recordDetail,{gameSystemTags:true,targetTags:true,abilityTags:true,hashTags:true})
        
        return this;
    }
}