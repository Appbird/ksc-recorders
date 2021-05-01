import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { createElementWithIdAndClass, generateIcooonHTML, writeElement } from "../../utility/aboutElement";
import { IView } from "../IView";
import {IGameSystemInfoWithoutCollections} from "../../../type/list/IGameSystemInfo"
import {convertNumberIntoDateString}from "../../../utility/timeUtility"
import { selectAppropriateName, selectAppropriateDescription, choiceString } from "../../../utility/aboutLang"
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
export class GameSystemCardGroup implements IView{
    //#CTODO 実装する。
        private app:IAppUsedToReadAndChangeOnlyPageState;
        private container:HTMLElement;
        //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
        constructor(container:HTMLElement,info:IGameSystemInfoWithoutCollections[],app:IAppUsedToReadAndChangeOnlyPageState){
            this.container = container;
            this.container.classList.add("c-recordCardGroup","u-width90per")
            this.app = app;
            this.container.appendChild(element`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main">検索対象とするゲームシステム</div>
                            <div class="c-title__sub">select the item of title where records you're looking for was set.</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `);
            for (const ele of info) this.appendCard(ele);
        }
        destroy(){
            this.container.innerHTML = "";
        }
        appendCard(info:IGameSystemInfoWithoutCollections){
            const card = this.container.appendChild(elementWithoutEscaping`
            <div class="c-recordCard">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara">${generateIcooonHTML(info)} ${choiceString(info,this.app.state.language)}</div>
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
            card.addEventListener("click",() => this.app.transition("gameModeSeletor",info));
        }
        get htmlElement(){
            return this.container;
        }
}
