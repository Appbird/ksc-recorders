import { TargetGameMode } from "../../administers/StateAdminister";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { OfferFormView } from "../parts/OfferFormView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_OfferForm
    extends PageStateBaseClass<{targetGameMode:TargetGameMode,runnerID:string},IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            const difficulties = (await this.app.accessToAPI("list_difficulties",
                {gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const abilities = (await this.app.accessToAPI("list_abilities",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const view = new OfferFormView(this.app,this.requiredObj.targetGameMode,difficulties,abilities,this.requiredObj.runnerID)
            this.articleDOM.appendChild(view.htmlElement);
        }
}

