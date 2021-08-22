import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../type/list/AttributeOfAbilityItem";
import { choiceString } from "../../../utility/aboutLang";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { OfferFormView } from "../parts/OfferFormView/OfferFormView";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    title: {
        Japanese: "記録の修正",
        English: "Record Modification"
    }
}

export class S_ModifyRecordForm
    extends PageStateBaseClass<{targetGameMode:TargetGameMode,id:string},IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner();
            if ( this.app.state.gameSystemEnvDisplayed.gameSystem === null || this.app.state.gameSystemEnvDisplayed.gameMode === null) throw new Error("ターゲットゲームモードが定められていません。")
            
            const title = new PageTitleView(
                appendElement(this.articleDOM,"div"),
                choiceString(context.title,this.app.state.language),
                "",
                "fas fa-highlighter"
            );

            if (this.requiredObj.targetGameMode !== undefined) this.app.changeTargetGameMode(this.requiredObj.targetGameMode)
            
            const gameSystemID = this.requiredObj.targetGameMode.gameSystem.id
            const gameModeID = this.requiredObj.targetGameMode.gameMode.id
            const difficultyItems = (await this.app.accessToAPI("list_difficulties",
                    {gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
                })).result
            const abilityItems = (await this.app.accessToAPI("list_abilities",{
                    gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
                })).result
            const tagItems = (await this.app.accessToAPI("list_hashTags_onlyApproved",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed}
            })).result
            const abilityAttributeList = (await this.app.accessToAPI("list_abilityAttributes",{
                gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
            })).result
            let abilityAttributeItems:SetOfFlagsOfAbilityAttributeItem[] | undefined = await Promise.all(
                    abilityAttributeList.map(async attribute => { return {
                        attributeNameInfo: attribute,
                        flagsInAttribute: (await this.app.accessToAPI("list_abilityAttributeFlags",{

                            gameSystemEnv : {gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed},
                            abilityAttributeID:attribute.id

                        })).result
                    } } )
                )
            abilityAttributeItems = (abilityAttributeItems.length === 0) ? undefined : abilityAttributeItems
            const record = (await this.app.accessToAPI("record_rawdata",{
                                gameSystemEnv:{
                                    gameSystemID,
                                    gameModeID
                                },
                                id:this.requiredObj.id,
                                lang:this.app.state.language
                            })).result
            const runnerID = record.runnerID
            const view = new OfferFormView(
                this.articleDOM.appendChild(document.createElement("div")),
                    {   
                        difficultyItems,abilityItems,tagItems,runnerID,abilityAttributeItems,gameSystemID,gameModeID,language:this.app.state.language,
                        tagLanguage:record.languageOfTagName,defaultRecord:record,
                        maxPlayerNumber:this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer,
                        onDecideEventListener:async (input) => this.sendInputInfo(gameSystemID,gameModeID,record.id,input),
                        fetchTargetItems:async (input) => (await this.app.accessToAPI("list_targets",{gameSystemEnv:{gameSystemID,gameModeID},id:input})).result
                    }
            )
            this.deleteLoadingSpinner();
        }
        private async sendInputInfo(gameSystemID:string,gameModeID:string,recordID:string,recordModified:ISentRecordOffer){
            try{
                this.app.goToTop()
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
                    English:"Success in modifying the record! (The record needs another verification.)"
                })
                this.app.transition("detailView",{gameSystemEnv:{gameSystemID:gameSystemID,gameModeID:gameModeID},id:recordID,lang:this.app.state.language})
                
                this.deleteLoadingSpinner();
            }catch(err){
                this.app.errorCatcher(err)
            }
        }
}

