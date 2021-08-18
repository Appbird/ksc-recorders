import { ScoreType } from "../../../type/list/IGameModeItem";
import { IRecordInShortResolved } from "../../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../utility/timeUtility";
import { element, HTMLConverter, writeAbilityNameWithAttribute } from "../../../utility/ViewUtility";
import { IView } from "../IView";
import { TagsView } from "./TagsView";

export class RecordCardView implements IView{
    private container:HTMLElement;
    private record:IRecordInShortResolved;
    private tagsViews:TagsView[] = [];
    constructor(container:HTMLElement,scoreType:ScoreType,record:IRecordInShortResolved,option:OptionObjectSet) {
        this.record = record;
        this.container = container;
        this.container.classList.add("c-recordCard","u-width95per")
        const htmlC = new HTMLConverter("English")
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        this.container.appendChild(htmlC.elementWithoutEscaping`
                <div class = "c-title --withUnderline">
                    <div class = "c-title__main">
                    ${(() => {switch(scoreType){
                        case "time" :return converseMiliSecondsIntoTime(record.score)
                        case "score" :return record.score.toString();
                    }})()}</div>
                    <div class="c-iconWithDescription">
                        ${option.verifiedCheck ? `<i class="far fa${record.isVerified ? "-check" : ""}-circle"></i>` : ""}
                        <i class="fas fa-user"></i>${record.runnerName}
                    </div>
                </div>
        `)
        this.container.appendChild(element`<hr noshade class="u-thin">`)
        //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        this.tagsViews = [
            new TagsView(this.container.appendChild(document.createElement("div"))),
            new TagsView(this.container.appendChild(document.createElement("div")))
        ]
        const tagOption = option.displayTags;
        
        const rr = record.regulation;
        const rrg = rr.gameSystemEnvironment;

        if (tagOption.gameSystemTags) this.tagsViews[0].appendTag(`${rrg.gameSystemName}/${rrg.gameModeName}/${rrg.gameDifficultyName}`,"gameSystem")
        if (tagOption.targetTags) this.tagsViews[0].appendTag(rr.targetName,"target")
        if (tagOption.abilityTags) 
            rr.abilityNames.forEach( (abilityName,index) => this.tagsViews[1].appendTag(writeAbilityNameWithAttribute(rr,abilityName,index),"ability"))
        
    }
    addClickEventListener(callback:(clickedRecord:IRecordInShortResolved) => void){
        this.container.addEventListener("click", () => callback(this.record))
    }
    destroy(){
        for (const tagsView of this.tagsViews) tagsView.destroy();
        return;
    }
}
export interface OptionObject{
    displayTags?:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
}
export interface OptionObjectSet{
    displayTags:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean},
    verifiedCheck:boolean
}