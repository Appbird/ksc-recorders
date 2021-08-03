import { element, elementWithoutEscaping } from "../../../utility/ViewUtility";
import { generateIcooonHTML, writeElement } from "../../utility/aboutElement";
import { IView } from "../IView";
import {IGameSystemInfoWithoutCollections} from "../../../type/list/IGameSystemInfo"
import {convertNumberIntoDateString}from "../../../utility/timeUtility"
import { selectAppropriateDescription, choiceString } from "../../../utility/aboutLang"
import { LanguageInApplication } from "../../../type/LanguageInApplication";
export class GameSystemCardGroup implements IView{
    //#CTODO 実装する。
        private language:LanguageInApplication;
        private container:HTMLElement;
        private clickEventListener?:(selected:IGameSystemInfoWithoutCollections)=>void
        constructor(container:HTMLElement,info:IGameSystemInfoWithoutCollections[],{
            language,
            clickEventListener,
            onReady,
            title={
                main:"検索対象とするゲームシステム",
                sub:"Select the title."
            }
        }:{
            language:LanguageInApplication,
            clickEventListener?:(selected:IGameSystemInfoWithoutCollections)=>void,
            onReady?:()=>void,
            title?:{
                main:string,
                sub:string
            }
        }){
            this.container = container;
            this.container.classList.add("c-recordCardGroup","u-width90per")
            this.language = language,
            this.clickEventListener = clickEventListener;
            this.container.appendChild(element`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main">${title.main}</div>
                            <div class="c-title__sub">${title.sub}</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `);
            for (const ele of info) this.appendCard(ele);
            if (onReady) onReady();
        }
        destroy(){
            this.container.innerHTML = "";
        }
        appendCard(info:IGameSystemInfoWithoutCollections){
            const card = this.container.appendChild(elementWithoutEscaping`
            <div class="c-recordCard">
                <div class = "c-title">
                    <div class = "c-title__main u-smallerChara">${generateIcooonHTML(info)} ${choiceString(info,this.language)}</div>
                </div>
                ${writeElement(selectAppropriateDescription(info,this.language),"p")}
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
            card.addEventListener("click",() => {
                if (this.clickEventListener !== undefined) this.clickEventListener(info)
            });
        }
        get htmlElement(){
            return this.container;
        }
}
