import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { generateIcooonHTML, writeElement } from "../../utility/aboutElement";
import { IView } from "../IView";
import {IGameSystemInfoWithoutCollections} from "../../../type/list/IGameSystemInfo"
import {convertNumberIntoDateString}from "../../../utility/timeUtility"
import { selectAppropriateDescription, choiceString } from "../../../utility/aboutLang"
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
export class GameModeCardsGroup implements IView{
    //#CTODO 実装する。
        private app:IAppUsedToReadAndChangeOnlyPageState;
        private gameSystemInfo:IGameSystemInfoWithoutCollections;
        private container:HTMLElement;
       //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
        constructor(container:HTMLElement,gameSystemInfo:IGameSystemInfoWithoutCollections,info:IGameModeItemWithoutCollections[],app:IAppUsedToReadAndChangeOnlyPageState){
            this.container = container;
            this.container.classList.add("c-list","u-width90per");
            this.gameSystemInfo = gameSystemInfo;
            this.app = app;
            this.container.appendChild(elementWithoutEscaping`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main"> ${generateIcooonHTML(gameSystemInfo)} ${choiceString(gameSystemInfo,this.app.state.language)}</div>
                            <div class="c-title__sub">select the item of game mode where records you're looking for was set.</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `);
            for (const ele of info) this.appendCard(ele);
        }
        destroy(){
            this.container.innerHTML = "";
        }
        appendCard(info:IGameModeItemWithoutCollections){
            const card = this.container.appendChild(elementWithoutEscaping`
            <div class="c-list__item">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara">${generateIcooonHTML(info)} ${choiceString(info,this.app.state.language)}</div>
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
            return this.container;
        }
}
