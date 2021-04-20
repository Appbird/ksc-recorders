import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { OfferFormView } from "../parts/OfferFormView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_OfferForm
    extends PageStateBaseClass<{targetGameMode?:TargetGameMode,runnerID:string},IAppUsedToReadAndChangePage>{
        async init(){
            
            if (this.requiredObj.targetGameMode !== undefined) this.app.changeTargetGameMode(this.requiredObj.targetGameMode)
            const difficulties = (await this.app.accessToAPI("list_difficulties",
                {gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const abilities = (await this.app.accessToAPI("list_abilities",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const view = new OfferFormView(this.app,difficulties,abilities,this.requiredObj.runnerID)
            this.articleDOM.appendChild(view.htmlElement);
        }
}

