import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { IRunner } from "../../../type/record/IRunner";
import { choiceString, selectAppropriateDescription } from "../../../utility/aboutLang";
import { convertNumberIntoDateString } from "../../../utility/timeUtility";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { generateIcooonHTML, writeElement } from "../../utility/aboutElement";
import { PageStateBaseClass } from "./PageStateClass";

export class S_GamemodeListOfPlayersPlayed extends PageStateBaseClass<{runnersInfo:IRunner},IAppUsedToReadAndChangePage>{
    private listCache:Map<string,IGameSystemInfoWithoutCollections> = new Map<string,IGameSystemInfoWithoutCollections>();
    async init(){
        const list = this.requiredObj.runnersInfo.idOfGameModeRunnerHavePlayed;
        const gameModeListTitle = {
            Japanese:`${this.requiredObj.runnersInfo.Japanese}のゲームモードリスト`,
            English:`${this.requiredObj.runnersInfo.English}'s Gamemode List`
        }
        const listElement = this.articleDOM.appendChild(elementWithoutEscaping`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main">${choiceString(gameModeListTitle,this.app.state.language)}</div>
                            <div class="c-title__sub">Gamemode List</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `) as HTMLElement;
        for(const item of list){
            const [gameSystem,gameMode] = item.id.split("/")
            this.appendCard(listElement,await this.fetchGameSystemData(gameSystem),(await (await this.app.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:gameSystem},id:gameMode})).result));
        }
    }
    private async fetchGameSystemData(id:string){
        if (!this.listCache.has(id)) this.listCache.set(id,(await this.app.accessToAPI("list_gameSystem",{id:id})).result)
        const result = this.listCache.get(id) 
        if (result === undefined) throw new Error();
        return result;
    }
    appendCard(container:HTMLElement,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
        const card = container.appendChild(elementWithoutEscaping`
        <div class="c-list__item">
            <div class = "c-title">
                <div class = "c-title__main u-smallerChara">
                    ${generateIcooonHTML(gameSystem)}${choiceString(gameSystem,this.app.state.language)}/${generateIcooonHTML(gameMode)}${choiceString(gameMode,this.app.state.language)}
                </div>
                
            </div>
            ${writeElement(selectAppropriateDescription(gameMode,this.app.state.language),"p")}
            
            <div class="c-stateInfo u-left-aligined-forFlex">
                <div class = "c-stateInfo__unit">
                    <div class ="c-iconWithDescription"> <i class="fas fa-list"></i> ${gameMode.recordsNumber} Records</div>
                </div>
                <div class = "c-stateInfo__unit">
                    <div class ="c-iconWithDescription"> <i class="fas fa-running"></i> ${gameMode.runnersNumber} Runners</div>
                </div>
                <div class = "c-stateInfo__unit">
                    <div class ="c-iconWithDescription"> <i class="fas fa-history"></i> ${convertNumberIntoDateString(gameMode.dateOfLatestPost)} </div>
                </div>
            </div>
        </div>`) as HTMLElement

        card.addEventListener("click",() =>{
            this.app.changeTargetGameMode({gameSystem,gameMode})
            this.app.transition("userPageInSpecific",{gameMode,gameSystem,runnerID:this.requiredObj.runnersInfo.id})
        })
        
    }
}

