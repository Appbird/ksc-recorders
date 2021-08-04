import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { OfferFormView } from "../parts/OfferFormView/OfferFormView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_ModifyRecordForm
    extends PageStateBaseClass<{targetGameMode:TargetGameMode,id:string},IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner();
            if ( this.app.state.gameSystemEnvDisplayed.gameSystem === null || this.app.state.gameSystemEnvDisplayed.gameMode === null) throw new Error("ターゲットゲームモードが定められていません。")
            
            if (this.requiredObj.targetGameMode !== undefined) this.app.changeTargetGameMode(this.requiredObj.targetGameMode)
            const difficulties = (await this.app.accessToAPI("list_difficulties",
                    {gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
                })).result
            const abilities = (await this.app.accessToAPI("list_abilities",{
                    gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
                })).result
            const record = (await this.app.accessToAPI("record_rawdata",{
                                gameSystemEnv:{
                                    gameSystemID:this.requiredObj.targetGameMode.gameSystem.id,
                                    gameModeID:this.requiredObj.targetGameMode.gameMode.id
                                },
                                id:this.requiredObj.id,
                                lang:this.app.state.language
                            })).result
            const view = new OfferFormView(
                this.articleDOM.appendChild(document.createElement("div")),
                this.app,difficulties,abilities,{
                    onDecideEventListener:async (input) => {
                        this.app.goToTop();
                        this.sendInputInfo(this.app.state.gameSystemIDDisplayed,this.app.state.gameModeIDDisplayed,this.requiredObj.id,input)
                        
                    },
                    defaultRecord:record
                }
            )
            this.deleteLoadingSpinner();
        }
        private async sendInputInfo(gameSystemID:string,gameModeID:string,recordID:string,recordModified:ISentRecordOffer){
            try{
                
                this.generateLoadingSpinner("cloud")

                const language = this.app.state.language;
                await this.app.accessToAPI("record_modify",{
                    gameSystemEnv:{
                        gameSystemID,gameModeID
                    },
                    recordID, recordModified,
                    language:language,
                    IDToken:await this.app.loginAdministratorReadOnly.getIDToken()
                })
                this.app.notie.successAlert({
                    Japanese:"記録の修正に成功しました！(再度承認が必要です。)",
                    English:"Successed in modifying the record!(The record needs another verification.)"
                })
                this.app.transition("detailView",{gameSystemEnv:{gameSystemID:gameSystemID,gameModeID:gameModeID},id:recordID,lang:this.app.state.language})
                
                this.deleteLoadingSpinner();
            }catch(err){
                this.app.errorCatcher(err)
            }
        }
}

