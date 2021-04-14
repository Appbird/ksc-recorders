import { element } from "../../utility/ViewUtility";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";

class GameSystemCardGroup implements IView{
    //#TODO 実装する。
        private element = createElementWithIdAndClass({className:""})
        constructor(){
        }
        appendCard(info:GameSystemInfo){
            this.element.appendChild(element`
            <div class="c-recordCard">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara"><i class="fas fa-star"></i> 星のカービィ スターアライズ</div>
                </div>
                <p>なかまを とっかえひっかえして だいぼうけん。フレンズ能力で 道をきりひらけ！</p>
                <hr noshade class="u-thin">
                <div class="c-stateInfo u-left-aligined-forFlex">
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-list"></i> 13 Records</div>
                    </div>
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-running"></i> 13 Runners</div>
                    </div>
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-history"></i> 4 hours ago </div>
                    </div>
                </div>
            </div>`)
        }
}