import { IRunner } from "../../../type/record/IRunner";
import { choiceString } from "../../../utility/aboutLang";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { StateInfoView } from "../parts/StateInfoView";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    recordListHeader:{
        Japanese:"このゲームモード内での投稿",
        English: "The Runner's post in this gamemode"
    },
    menuHeader:{
        Japanese:"メニュー",
        English:"Menu"
    }
}
export class S_UserPageInSpecific
    extends PageStateBaseClass<TargetGameMode&{runnerID:string},IAppUsedToReadAndChangePage>{
    async init(){
        const htmlC = new HTMLConverter(this.app.state.language)
        const runnerInfo = await (await this.app.accessToAPI("list_runner",{id:this.requiredObj.runnerID})).result
        const titleView = this.articleDOM.appendChild(htmlC.elementWithoutEscaping`
            <div class="u-width90per">
                <div class="c-title">
                    <div class="c-title__main">${runnerInfo}</div>
                    <div class="c-title__main"><img href="${runnerInfo.photoURL}"></img></div>
                </div>
            </div>
        `) as HTMLElement
        new StateInfoView(appendElement(this.articleDOM,"div"))
                                .appendInfo(`${runnerInfo.theNumberOfPost} Records`,"list")
                                .appendInfo(`${runnerInfo.theDateOfLastPost} Records`,"history")
        this.articleDOM.appendChild(htmlC.elementWithoutEscaping`<hr noshade class="u-bold">`)
        this.articleDOM.appendChild(htmlC.elementWithoutEscaping`<p class="u-width90per">${{Japanese:runnerInfo.JDescription,English:runnerInfo.EDescription}}</p>`)
        this.articleDOM.appendChild(htmlC.elementWithoutEscaping`<p class="u-width90per"><i class="fab fa-twitter"></i><a href="${runnerInfo.twitterLink}">${runnerInfo.twitterLink}</a></p>`)
        this.articleDOM.appendChild(htmlC.elementWithoutEscaping`<p class="u-width90per"><i class="fab fa-youtube"></i><a href="${runnerInfo.youtubeLink}">${runnerInfo.youtubeLink}</a></p>`)
        
        const menuDiv = new MenuView(appendElement(titleView,"div"),this.app.state.language,context.menuHeader,{displayDisabled:false});
        for(const item of this.generateMenuItem(runnerInfo)) menuDiv.generateMenuItem(item);

        const records = (await this.app.accessToAPI("record_search",{
            condition:[{
                groupName:choiceString(context.recordListHeader,this.app.state.language),
                gameSystemEnv:{
                    gameSystemID:this.app.state.gameSystemIDDisplayed,
                    gameModeID: this.app.state.gameModeIDDisplayed,
                },
                limitOfRecordArray:200,
                orderOfRecordArray:"LaterFirst",
                runnerIDs:[this.requiredObj.runnerID],
                language:this.app.state.language
            }]
        })).result[0]
        const recordViewer = new RecordGroupView(appendElement(titleView,"div"),records,this.app.state.scoreType,{
            clickOnCardEventListener:(record) => this.app.transition("detailView",{
                gameSystemEnv:{
                    gameSystemID:this.app.state.gameSystemIDDisplayed,
                    gameModeID:  this.app.state.gameModeIDDisplayed
                },
                id:record.id,
                lang: this.app.state.language
            })
            })
        }
        generateMenuItem(runnerInfo:IRunner):RequiredObjectToGenerateItem[]{
            return [
                {
                    title:{
                        Japanese:"全体のユーザーページへ戻る",
                        English:"Return to the user page of whole.",
                        icon:"person"
                    },
                    description:{
                        Japanese: "全体の作品についてのユーザーの情報が載ったページへ戻ります。",
                        English: "Click here to back to the page includes user's information about whole of the series."
                    },
                    isDisabled:(this.app.loginAdministratorReadOnly.loginUserID !== runnerInfo.id),
                    biggerTitle:true,
                    to:async () => { 
                        try{await this.app.logout();}catch(err){this.app.errorCatcher(err)}
                        this.app.transition("userPageInWhole",{runnerID:this.requiredObj.runnerID})
                    }
                },
                {
                title:{
                    Japanese:"ログアウト",
                    English:"Log out",
                    icon:"logout"
                },
                remarks:{
                    Japanese:runnerInfo.Japanese,
                    English:runnerInfo.English,
                    icon:"person"
                },
                description:{
                    Japanese: "サービスからログアウトします。",
                    English: "Click here to logout from this service."
                },
                isDisabled:(this.app.loginAdministratorReadOnly.loginUserID !== runnerInfo.id),
                biggerTitle:true,
                to:async () => { 
                    try{await this.app.logout();}catch(err){this.app.errorCatcher(err)}
                    this.app.transition("mainMenu",null)
                }
            },
            {
                title:{
                    Japanese:"ユーザー情報の設定",
                    English:"Setting user information",
                    icon:"list"
                },
                description:{
                    Japanese: "ここで、自身の情報を設定することが出来ます。",
                    English: "You can edit your user information here."
                },
                isDisabled:(this.app.loginAdministratorReadOnly.loginUserID !== runnerInfo.id),
                biggerTitle:true,
                to:async () =>this.app.transition("settingUserInfo",null)
            },{
                title:{
                    Japanese:"通知",
                    English:"Notification",
                    icon:"notification"
                },
                remarks:{
                    Japanese:`<strong class="u-redChara">${(runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+"件の未読"}</strong>`,
                    English:`<strong class="u-redChara">${(runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+" unread notifications"}</strong>`,
                    icon:""
                },
                description:{
                    Japanese: "通知を確認することが出来ます。",
                    English: "You can check notifications from the service here."
                },
                isDisabled:(this.app.loginAdministratorReadOnly.loginUserID !== runnerInfo.id),
                biggerTitle:true,
                to:() => this.app.transition("notificationList",null)
            }
            ]
        }
}
    
