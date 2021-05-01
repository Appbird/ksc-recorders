import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { GameModeCardsGroup } from "../parts/gameModeCardsGroup";
import { PageStateBaseClass } from "./PageStateClass";

export class S_GameModeSelector
    extends PageStateBaseClass<IGameSystemInfoWithoutCollections,IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            const result = (await this.app.accessToAPI("list_gameModes", {gameSystemEnv:{gameSystemID:this.requiredObj.id}})).result;
            new GameModeCardsGroup(this.articleDOM.appendChild(document.createElement("div")),this.requiredObj,result,this.app)
        
        }
}