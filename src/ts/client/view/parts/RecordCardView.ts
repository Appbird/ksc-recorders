import { IRecordInShortResolved } from "../../../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../utility/timeUtility";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { IView } from "../IView";
import { TagsView } from "./TagsView";

export class RecordCardView implements IView{
    private app:IAppUsedToReadAndChangeOnlyPageState
    private ele:HTMLElement;
    constructor(app:IAppUsedToReadAndChangeOnlyPageState,record:IRecordInShortResolved,option:OptionObjectSet&{setClickListener?:boolean}) {
        this.app = app;
            //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
            this.ele = element`
                <div class = "c-recordCard u-width95per">
                    <div class = "c-title --withUnderline">
                        <div class = "c-title__main">${(() => {switch(this.app.state.scoreType){
                            case "time" :return converseMiliSecondsIntoTime(record.score)
                            case "score" :return record.score;
                        }})()}</div>
                        <div class="c-iconWithDescription">
                            <i class="fas fa-user"></i>${record.runnerName}
                        </div>
                    </div>
                ${(!option.displayTags.gameSystemTags && !option.displayTags.targetTags && option.displayTags.abilityTags) ? ``: `<hr noshade class="u-thin">`}
                </div>`
            //#CTODO カード要素をクリックすると記録詳細画面へ移る。
            if (!option.setClickListener) return;
            this.ele.addEventListener("click",() => {
                const rrg = record.regulation.gameSystemEnvironment
                this.app.transition("detailView",{ gameSystemEnv:{ gameSystemID:rrg.gameSystemID, gameModeID:rrg.gameModeID}, id:record.id, lang:this.app.state.language})
            })
            TagsView.generateTagViewsForRecord( this.app, this.ele, record, {
                abilityTags:option.displayTags.abilityTags,
                gameSystemTags:option.displayTags.gameSystemTags,
                targetTags:option.displayTags.targetTags,
                setClickListener:false
            })
            
    }
    get htmlElement(){
        return this.ele;
    }
}
export interface OptionObject{
    displayTags?:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
    setClickListener?:boolean
}
export interface OptionObjectSet{
    displayTags:{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean}
    setClickListener:boolean
}