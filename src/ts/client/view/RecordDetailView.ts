import { IRecordResolved } from "../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../utility/timeUtility";
import { element, elementWithoutEscaping } from "../../utility/ViewUtility";
import { TagsView } from "./TagsView";
const marked = require("marked")

export class RecordDetailView{
    readonly htmlElement = document.createElement("div");
    constructor(recordDetail:IRecordResolved){
        this.adjustViewAccordingToRecord(recordDetail)
    }
    adjustViewAccordingToRecord(recordDetail:IRecordResolved){
        this.htmlElement.appendChild(
            elementWithoutEscaping`
            <div>
                <div class="c-title">
                    <div class="c-title__main">記録の基本情報</div>
                </div>
                <hr noshade class="u-bold">
            <div class="u-width95per">
                <div class = "c-evidenceMovie">
                    <div class = "c-evidenceMovie__placeholder"></div>
                </div>
                <div class="c-title">
                    <div class="c-title__sub u-underline"><i class="fas fa-link"></i> <a>${recordDetail.link[0]}</a> </div>
                </div>
                
                <div class="c-title">
                    <div class="c-title__main u-biggerChara">${converseMiliSecondsIntoTime(recordDetail.score)}</div>
                    <div class="c-title__sub u-biggerChara onClickFirer_RunnerName"><i class="fas fa-user"></i>${recordDetail.runnerName}</div>
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
            console.log(this.htmlElement)
            const runnersDiv = this.htmlElement.getElementsByClassName("onClickFirer_RunnerName")[0]
            //#TODO クリックすると走者ページに飛ぶようにしたい
            const tagDiv = this.htmlElement.getElementsByClassName("tagsDetail")[0]
            const tagViews = [new TagsView(),new TagsView(),new TagsView()]
            const rrg = recordDetail.regulation.gameSystemEnvironment;
            tagViews[0].generateTag(`${rrg.gameSystemName}/${rrg.gameModeName}/${rrg.gameDifficultyName}`,"gameSystem");
            for(const ability of recordDetail.regulation.abilityNames) tagViews[1].generateTag(ability,"ability");
            tagViews[1].generateTag(recordDetail.regulation.targetName,"target");
            for(const tag of recordDetail.tagName) tagViews[2].generateTag(tag,"hashTag");
    
            for(const tag of tagViews) tagDiv.appendChild(tag.getElement());
    }
}