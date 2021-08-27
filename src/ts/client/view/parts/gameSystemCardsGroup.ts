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
        private isUserManager:boolean;
        constructor(container:HTMLElement,info:IGameSystemInfoWithoutCollections[],{
            language,isUserManager=false,
            clickEventListener,
            onReady,
        }:{
            language:LanguageInApplication,
            clickEventListener?:(selected:IGameSystemInfoWithoutCollections)=>void,
            onReady?:()=>void,isUserManager?:boolean
        }){
            this.isUserManager = isUserManager;
            this.container = container;
            this.container.classList.add("c-recordCardGroup","u-width90per")
            this.language = language,
            this.clickEventListener = clickEventListener;
            info.sort((a,b) => b.releasedDate - a.releasedDate )
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
                ${writeElement(selectAppropriateDescription(info,this.language),"p",`class="u-marginLeftRight2em"`)}
                <hr noshade class="u-thin">
                <div class="c-stateInfo u-left-aligined-forFlex">
                    ${
                        (this.isUserManager && info.UnverifiedRecordNumber !== 0 && info.UnverifiedRecordNumber !== undefined) ? 
                        `<div class = "c-stateInfo__unit">
                            <div class ="c-iconWithDescription u-redChara"> <i class="fas fa-envelope"></i> ${info.UnverifiedRecordNumber} Unverified Records</div>
                        </div>` : ``
                    }
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-list"></i> ${info.recordsNumber} Records</div>
                    </div>
                    <div class = "c-stateInfo__unit">
                        <div class ="c-iconWithDescription"> <i class="fas fa-running"></i> ${info.runnerIDList.length} Runners</div>
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
