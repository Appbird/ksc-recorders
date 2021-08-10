import { IRunner } from "../../../type/record/IRunner";
import { choiceString } from "../../../utility/aboutLang";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement, createElementWithIdAndClass } from "../../utility/aboutElement";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { UserInformationBoard } from "../parts/UserInformationBoard";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    menuHeader:{
        Japanese:"メニュー",
        English:"Menu"
    }
}
export class S_UserPageInSpecific
    extends PageStateBaseClass<TargetGameMode&{runnerID:string},IAppUsedToReadAndChangePage>{
    async init(){
        this.generateLoadingSpinner("people");
        const runnerInfo = (await this.app.accessToAPI("list_runner",{id:this.requiredObj.runnerID})).result
        new UserInformationBoard(appendElement(this.articleDOM,"div"),this.app.state.language,runnerInfo)
        const menuDiv = new MenuView(appendElement(this.articleDOM,"div"),this.app.state.language,context.menuHeader,{displayDisabled:false});
        for(const item of this.generateMenuItem(runnerInfo)) menuDiv.generateMenuItem(item);

        const records = (await this.app.accessToAPI("record_search",{
            condition:[{
                groupName:choiceString({
                    Japanese:`${this.app.state.gameSystemEnvDisplayed.gameSystem?.Japanese}/${this.app.state.gameSystemEnvDisplayed.gameMode?.Japanese}での投稿`,
                    English: `The Runner's post in ${this.app.state.gameSystemEnvDisplayed.gameSystem?.English}/${this.app.state.gameSystemEnvDisplayed.gameMode?.English}`
                },this.app.state.language),
                gameSystemEnv:{
                    gameSystemID:this.app.state.gameSystemIDDisplayed,
                    gameModeID: this.app.state.gameModeIDDisplayed,
                },
                limitOfRecordArray:200,
                orderOfRecordArray:"LaterFirst",
                runnerIDs:[this.requiredObj.runnerID],
                language:this.app.state.language,
                searchTypeForVerifiedRecord: "All"
            }]
        })).result[0]
        this.articleDOM.appendChild(createElementWithIdAndClass({className:"u-space3em"}));
        new RecordGroupView(this.articleDOM.appendChild(createElementWithIdAndClass({className:"u-width90per"})),records,this.app.state.scoreType,{
            clickOnCardEventListener:(record) => this.app.transition("detailView",{
                gameSystemEnv:{
                    gameSystemID:this.app.state.gameSystemIDDisplayed,
                    gameModeID:  this.app.state.gameModeIDDisplayed
                },
                id:record.id,
                lang: this.app.state.language
            }),
                verifiedCheck:true,
                displayTags:{
                    gameSystemTags:true,
                    targetTags:true,
                    abilityTags:true
                }
            })
        this.deleteLoadingSpinner();
        }
        generateMenuItem(runnerInfo:IRunner):RequiredObjectToGenerateItem[]{
            return [{
            
                title:{
                    Japanese:"ゲームモードリスト",
                    English:"Gamemode List",
                    icon:"list"
                },
                description:{
                    Japanese: "ここで、走者が今まで記録を投稿したゲームモードの一覧を確認することが出来ます。",
                    English: "You can see the list of gamemodes where the runner has submit records here."
                },
                isDisabled:false,
                biggerTitle:true,
                to:async () =>this.app.transition("gamemodeListOfPlayersPlayed",{runnersInfo:runnerInfo})
            }
            ]
        }
}
    
