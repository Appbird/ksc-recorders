import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { createElementWithIdAndClass, writeElement } from "../../utility/aboutElement";
import { IView } from "../IView";
import {IGameSystemInfoWithoutCollections} from "../../../type/list/IGameSystemInfo"
import {convertNumberIntoDateString}from "../../../utility/timeUtility"
import { selectAppropriateName, selectAppropriateDescription } from "../../../utility/aboutLang"
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
export class GameModeCardsGroup implements IView{
    //#CTODO 実装する。
        private app:IAppUsedToReadAndChangeOnlyPageState;
        private gameSystemInfo:IGameSystemInfoWithoutCollections;
        private element = createElementWithIdAndClass({className:"c-list u-width90per"})
        constructor(gameSystemInfo:IGameSystemInfoWithoutCollections,info:IGameModeItemWithoutCollections[],app:IAppUsedToReadAndChangeOnlyPageState){
            this.gameSystemInfo = gameSystemInfo;
            this.app = app;
            this.element.appendChild(element`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main"><i class="fas fa-star"></i>${selectAppropriateName(gameSystemInfo,this.app.state.language)}</div>
                            <div class="c-title__sub">select the item of game mode where records you're looking for was set.</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `);
            for (const ele of info) this.appendCard(ele);
        }
        appendCard(info:IGameModeItemWithoutCollections){
            const card = this.element.appendChild(elementWithoutEscaping`
            <div class="c-list__item">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara"><i class="far fa-star"></i> ${selectAppropriateName(info,this.app.state.language)}</div>
                </div>
                ${writeElement(selectAppropriateDescription(info,this.app.state.language),"p")}
                
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
            </div>`) as HTMLElement
            card.addEventListener("click",() => this.app.transition("mainMenu",{gameSystem:this.gameSystemInfo,gameMode:info}))
            
        }
        get htmlElement(){
            return this.element;
        }
}
