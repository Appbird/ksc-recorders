import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement, generateIcooonHTML, writeElement } from "../../utility/aboutElement";
import { PageStateBaseClass } from "./PageStateClass";
import { UserInformationBoard } from "../parts/UserInformationBoard";
import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { choiceString, selectAppropriateDescription } from "../../../utility/aboutLang";
import { convertNumberIntoDateString } from "../../../utility/timeUtility";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";


export class S_UserPageInWhole
    extends PageStateBaseClass<{runnerID:string},IAppUsedToReadAndChangePage>{
        
    private listCache:Map<string,IGameSystemInfoWithoutCollections> = new Map<string,IGameSystemInfoWithoutCollections>();
    async init(){
        this.generateLoadingSpinner("people")
        const runnerInfo = (await this.app.accessToAPI("list_runner",{id:this.requiredObj.runnerID})).result
        new UserInformationBoard(appendElement(this.articleDOM,"div"),this.app.state.language,runnerInfo)
        
        this.deleteLoadingSpinner();
        this.generateLoadingSpinner("people")
        const list = runnerInfo.idOfGameModeRunnerHavePlayed;
        const gameModeListTitle = {
            Japanese:`今まで記録を投稿したゲームモードの一覧`,
            English:`The list of gamemodes where the runner has submit records`
        }
        const listElement = this.articleDOM.appendChild(elementWithoutEscaping`
                <div id="articleTitle" class="u-width90per">
                    <div class="c-title">
                            <div class="c-title__main u-smallerChara">${choiceString(gameModeListTitle,this.app.state.language)}</div>
                    </div>
                    <hr noshade class="u-thin">
                </div>
        `) as HTMLElement;
        for(const item of list){
            const [gameSystem,gameMode] = item.id.split("/")
            this.appendCard(listElement,await this.fetchGameSystemData(gameSystem),(await this.app.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:gameSystem},id:gameMode})).result);
        }
        this.deleteLoadingSpinner();
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
            ${writeElement(selectAppropriateDescription(gameMode,this.app.state.language),"p","u-marginLeftRight2em")}
            
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
            this.app.transition("userPageInSpecific",{gameMode,gameSystem,runnerID:this.requiredObj.runnerID})
        })
        
    }
}

