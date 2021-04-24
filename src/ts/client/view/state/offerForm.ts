import { gameSystem } from "../../../server/function/list/pickUp";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { OfferFormView } from "../parts/OfferFormView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_OfferForm
    extends PageStateBaseClass<{targetGameMode:TargetGameMode}|null,IAppUsedToReadAndChangePage>{
        async init(){
            if ( this.app.state.gameSystemEnvDisplayed.gameSystem === null || this.app.state.gameSystemEnvDisplayed.gameMode === null) throw new Error("ターゲットゲームモードが定められていません。")
            if (this.requiredObj === null) this.requiredObj = {
                    targetGameMode:this.app.state.gameSystemEnvDisplayed
                }

            if (this.requiredObj.targetGameMode !== undefined) this.app.changeTargetGameMode(this.requiredObj.targetGameMode)
            const difficulties = (await this.app.accessToAPI("list_difficulties",
                {gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const abilities = (await this.app.accessToAPI("list_abilities",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            const view = new OfferFormView(this.app,difficulties,abilities,await this.app.loginAdministratorReadOnly.getIDToken())
            this.articleDOM.appendChild(view.htmlElement);
        }
}

