import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { GameModeCardsGroup } from "../parts/gameModeCardsGroup";
import { PageStateBaseClass } from "./PageStateClass";

export class S_GameModeSelector
    extends PageStateBaseClass<IGameSystemInfoWithoutCollections,IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            this.generateLoadingSpinner("star");
            const result = (await this.app.accessToAPI("list_gameModes", {gameSystemEnv:{gameSystemID:this.requiredObj.id}})).result;
            this.deleteLoadingSpinner();
            new GameModeCardsGroup(this.articleDOM.appendChild(document.createElement("div")),this.requiredObj,result,{
                language:this.app.state.language,
                clickEventListener: (selected) => this.app.transition("mainMenu",selected)
            })
        
        }
}