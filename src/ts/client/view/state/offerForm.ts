import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { SetOfFlagsOfAbilityAttributeItem } from "../../../type/list/AttributeOfAbilityItem";
import { choiceString } from "../../../utility/aboutLang";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { MenuView } from "../parts/MenuView";
import { OfferFormView } from "../parts/OfferFormView/OfferFormView";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./Base/PageStateClass";

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
            
            this.generateRuleIntroduction()

            if (this.requiredObj.targetGameMode !== undefined) this.app.changeTargetGameMode(this.requiredObj.targetGameMode)
            const gameSystemID = this.app.state.gameSystemIDDisplayed
            const gameModeID = this.app.state.gameModeIDDisplayed
            const runnerID = this.app.loginAdministratorReadOnly.loginUserID
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
            const view = new OfferFormView(
                this.articleDOM.appendChild(document.createElement("div")),
                {   difficultyItems,abilityItems,tagItems,runnerID,abilityAttributeItems,gameSystemID,gameModeID,
                    tagLanguage:this.app.state.language,
                    maxPlayerNumber:this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer,language:this.app.state.language,
                    onDecideEventListener:async (input) => this.decide(input),
                    fetchTargetItems:   async (input) => (await this.app.accessToAPI("list_targets",{gameSystemEnv:{gameSystemID,gameModeID},id:input})).result
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
                const rrg = detailRecord.regulation.gameSystemEnvironment
                
                await this.app.transition("detailView",{gameSystemEnv:{gameSystemID:rrg.gameSystemID,gameModeID:rrg.gameModeID},id:detailRecord.id,lang:this.app.state.language});
                
            } catch(error){
                this.app.errorCatcher(error,"記録の登録に失敗しました。")
            }
        }
        private generateRuleIntroduction(){
            const mainMenu = new MenuView(appendElement(this.articleDOM,"div","u-width90per u-marginUpDown2em"),this.app.state.language,null)
        
                mainMenu.generateMenuItem({
                    title:{
                        Japanese:"ルール",
                        English:"Rules",
                        icon:"contract"
                    },
                    description:{
                        Japanese:"<p>このゲームモードにおけるルールを確認することが出来ます。<strong>記録を投稿する前に読んでください。</strong></p>",
                        English:"<p>Rules in this game mode is written in this page. <strong>Please read this rules before you submit a record.</strong></p>"
                    },
                    isDisabled:false,
                    biggerTitle:false,
                    to:() => {this.app.transition("gameRuleView",{gameSystemID:this.app.state.gameSystemIDDisplayed,gameModeID:this.app.state.gameModeIDDisplayed})}
                })
            appendElement(this.articleDOM,"hr","u-thin")
        }
}

