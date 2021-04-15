import { elementWithoutEscaping } from "../../utility/ViewUtility";
import { createElementWithIdAndClass, writeElement } from "../utility/aboutElement";
import { IView } from "./IView";
import {IGameSystemInfoWithoutCollections} from "../../type/list/IGameSystemInfo"
import {convertNumberIntoDateString}from "../../utility/timeUtility"
import { selectAppropriateName, selectAppropriateDescription } from "../../utility/aboutLang"
import { IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
export class GameSystemCardGroup implements IView{
    //#CTODO 実装する。
        private app:IAppUsedToReadOptionsAndTransition;
        private element = createElementWithIdAndClass({className:"c-recordCardGroup u-width90per"})
        constructor(info:IGameSystemInfoWithoutCollections[],app:IAppUsedToReadOptionsAndTransition){
            this.app = app;
            for (const ele of info) this.appendCard(ele);
        }
        appendCard(info:IGameSystemInfoWithoutCollections){
            const card = this.element.appendChild(elementWithoutEscaping`
            <div class="c-recordCard">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara"><i class="fas fa-star"></i> ${selectAppropriateName(info,this.app.state.language)}</div>
                </div>
                ${writeElement(selectAppropriateDescription(info,this.app.state.language),"p")}
                <hr noshade class="u-thin">
                <div class="c-stateInfo u-left-aligined-forFlex">
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-list"></i> ${info.recordsNumber} Records</div>
                    </div>
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-running"></i> ${info.runnersNumber} Runners</div>
                    </div>
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-history"></i> ${convertNumberIntoDateString(info.dateOfLatestPost)} </div>
                    </div>
                </div>
            </div>`) as HTMLElement;
            //#TODO clickイベントで、gameModeSelector画面への遷移を行う。
            //#TODO GameModeListGroupの実装。
        }
        get htmlElement(){
            return this.element;
        }
}
