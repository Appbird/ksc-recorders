import { IRunner } from "../../../type/record/IRunner";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { StateInfoView } from "../parts/StateInfoView";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    menuHeader:{
        Japanese:"メニュー",
        English:"Menu"
    }
}

export class S_UserPageInWhole
    extends PageStateBaseClass<{runnerID:string},IAppUsedToReadAndChangePage>{
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
    }   
    generateMenuItem(runnerInfo:IRunner):RequiredObjectToGenerateItem[]{
        return [
            {
                title:{
                    Japanese:"ゲームモードリスト",
                    English:"Gamemode List",
                    icon:"list"
                },
                description:{
                    Japanese: "ここで、走者が今まで活動してきたゲームモードを確認することが出来ます。",
                    English: "You can see the list of gamemodes you have post records here."
                },
                isDisabled:false,
                biggerTitle:true,
                to:async () =>this.app.transition("gamemodeListOfPlayersPlayed",{runnersInfo:runnerInfo})
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
