import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { choiceString } from "../../../utility/aboutLang";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { OfferFormView } from "../parts/OfferFormView/OfferFormView";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    title:{
        Japanese: "記録の申請",
        English: "Submit a Record"
    }
}

export class S_OfferForm
    extends PageStateBaseClass<{targetGameMode:TargetGameMode}|null,IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner();
            const title = new PageTitleView(
                appendElement(this.articleDOM,"div"),
                choiceString(context.title,this.app.state.language),
                "",
                "c-icooon u-background--notification"
            );
        
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
            const view = new OfferFormView(
                this.articleDOM.appendChild(document.createElement("div")),
                this.app,difficulties,abilities,{
                    onDecideEventListener:async (input) => this.decide(input)
                }
            )
            this.deleteLoadingSpinner();
        }

        private async decide(input:ISentRecordOffer){
            try {
                this.app.goToTop();
                this.generateLoadingSpinner("cloud");
                const detailRecord = (await this.app.accessToAPI("record_write",{
                    record:input,
                    language:this.app.state.language,
                    IDToken:await this.app.loginAdministratorReadOnly.getIDToken()
                })).result
                this.deleteLoadingSpinner();
                
                this.app.notie.successAlert({Japanese:"記録の登録に成功しました！",English:"Registering Record is Completed Successfully!"})
                
                await this.app.transition("detailView",{recordResolved:detailRecord});
                
            } catch(error){
                this.app.errorCatcher(error,"記録の登録に失敗しました。")
            }
        }
}

