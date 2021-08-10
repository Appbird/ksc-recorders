import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import { MenuView, RequiredObjectToGenerateItem } from "../parts/MenuView";
import { appendElement } from "../../utility/aboutElement";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import context from "./mainMenu.json"
import { NoticeView } from "../parts/notice";
export class S_MainMenu
    extends PageStateBaseClass<null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections},IAppUsedToReadAndChangePage>{
        private htmlConverter:HTMLConverter = new HTMLConverter(this.app.state.language);
        
        async init(){
            //#CTODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
            this.generateLoadingSpinner("star")
            
            if (this.requiredObj !== null) this.app.changeTargetGameMode(this.requiredObj);
            if (!this.app.checkIfIntroductionIsOver()) this.app.transition("introduction",null)
            const gsed = this.app.state.gameSystemEnvDisplayed
            const menuGenerators:[MultiLanguageString,RequiredObjectToGenerateItem[]][] = [
                [
                    {Japanese:"",English:""},
                    this.generateModeChangeInfo()
                ],
                [{
                    Japanese:"メインメニュー",
                    English:"Main menu"
                }, this.generateMainMenuInfo()],
                [{
                    Japanese:"設定",
                    English:"Settings"
                },this.generateSettingMenuInfo()],
                [{
                    Japanese:"その他",
                    English:"etc"
                },this.generateDetailMenuInfo()]
            ]
            const notice = new NoticeView(appendElement(this.articleDOM,"div"),"mainMenu","headerDescription",context.mainManu,this.app.state.language)
            const main = (gsed.gameSystem !== null && gsed.gameMode !== null) ? this.generateMainMenuDescriptionWithTargetMode():this.generateMainMenuDescription()
            for (const generator of menuGenerators){
                const mainMenu = new MenuView(appendElement(main,"div"),this.app.state.language,generator[0])
                
                generator[1].map((info) => mainMenu.generateMenuItem(info));
                main.appendChild(element`<div class="u-space3em"></div>`)
            }

            
            
            this.deleteLoadingSpinner();
        }
        generateMainMenuDescription(){
            return this.articleDOM.appendChild(this.htmlConverter.elementWithoutEscaping`
            <div>
                
                <div class="p-KSSRsHeader">
                    <i class="__icon c-icooon u-background--kssrs u-margin1em"></i>
                    <div class="__title">Welcome to <br>Kirby-Speed/Score-Recorders!</div>
                </div>
                <hr noshade class="u-bold">
                
                <div class="u-space2em"></div>
                
                <br>
                <div class="u-width90per">
                ${context.description[0]}
                </div>
                <br>
                <div class="u-width90per">
                ${context.description[1]}
                </div>
            </div>
            `) as HTMLElement;
        }
        generateMainMenuDescriptionWithTargetMode(){
            const gsed = this.app.state.gameSystemEnvDisplayed
            return this.articleDOM.appendChild(this.htmlConverter.elementWithoutEscaping`
            <div>
                <div class="p-KSSRsHeader">
                    <i class="__icon c-icooon u-background--kssrs u-margin1em"></i>
                    <div class="__title">${ `${gsed.gameSystem?.English}/${gsed.gameMode?.English}<br>Top Menu`}</div>
                </div>
                <hr noshade class="u-bold">
                 
                <div class="u-space2em"></div>
                <div class="u-width90per">
                ${{
                    Japanese:`ここでは、${gsed.gameSystem?.Japanese}/${gsed.gameMode?.Japanese}の記録を閲覧することが出来ます。`,
                    English:`You can check the record of ${gsed.gameSystem?.English}/${gsed.gameMode?.English} here.`
                }}
                </div>
                <br>
                <div class="u-width90per">
                ${{
                    Japanese:`閲覧したいゲームモードを変更したければ、下の<strong>KSSRs全体に戻る</strong>を選択し、もう一度選択することで変更できます。`,
                    English:`If you want to change the target gamemode, select the <strong>"return to the Whole of KSSRs"</strong> below, then select the gamemode again.`
                }}
                </div>
                
            `) as HTMLElement;
        }
        generateModeChangeInfo(){
            const asg = this.app.state.gameSystemEnvDisplayed;
            const isSetTargetGameMode = asg.gameSystem!==null && asg.gameMode!==null
            const targetGameMode = {
                ja:(isSetTargetGameMode) ? `${asg.gameSystem?.Japanese} / ${asg.gameMode?.Japanese}`:`未設定`,
                en:(isSetTargetGameMode) ? `${asg.gameSystem?.English} / ${asg.gameMode?.English}`:`unset`
            }
            return [(isSetTargetGameMode) ? {
                title:{
                    Japanese:"KSSRs全体に戻る",
                    English:"return to the Whole of KSSRs",
                    icon:"star"
                },
                remarks:{
                    Japanese:targetGameMode.ja,
                    English:targetGameMode.en,
                    icon:"ds"
                },
                description:{
                    Japanese:"閲覧するゲームタイトルとゲームモードの設定を外します。",
                    English: "Unset the target gamemode."
                },
                isDisabled:false,
                biggerTitle:false,
                to:() => {
                    this.app.changeTargetGameMode(null)
                    this.app.transition("mainMenu",null)
                }
            } : {
                title:{
                    Japanese:"ゲームタイトル/モードの設定",
                    English:"Set Target Title/Mode",
                    icon:"star"
                },
                remarks:{
                    Japanese:targetGameMode.ja,
                    English:targetGameMode.en,
                    icon:"ds"
                },
                description:{
                    Japanese:"ここで閲覧したいゲームタイトルとゲームモードを予め設定します。",
                    English: "Set the target gamemode to look records."
                },
                isDisabled:false,
                biggerTitle:false,
                to:() => this.app.transition("gameSystemSelector",null)
            }]
        }

        generateMainMenuInfo():RequiredObjectToGenerateItem[]{
           const asg = this.app.state.gameSystemEnvDisplayed;
           const isSetTargetGameMode = asg.gameSystem!==null && asg.gameMode!==null
           const runnerInfo = (this.app.loginAdministratorReadOnly.isUserLogin) ? {...this.app.loginAdministratorReadOnly.userInformation,...this.app.loginAdministratorReadOnly.userInformation_uneditable}: undefined;
            
           const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin;
           const targetGameMode = {
               ja:(isSetTargetGameMode) ? `${asg.gameSystem?.Japanese} / ${asg.gameMode?.Japanese}`:`未設定`,
               en:(isSetTargetGameMode) ? `${asg.gameSystem?.English} / ${asg.gameMode?.English}`:`未設定`
           }
           
           //#CTODO まともに日本語訳をする
            return [
            {
                title:{
                    Japanese:"ユーザーページ",
                    English:"User Page",
                    icon:"person"
                },
                description:{
                    Japanese: (isLogIn) ? "あなたのユーザーページを見ることが出来ます。" : "ログインしてください。",
                    English: (isLogIn) ? "clicking here takes you to your personal page." : "You need to login first to see here."
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:false,
                to:() => {
                    if(StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) this.app.transition("userPageInSpecific",{...this.app.state.gameSystemEnvDisplayed,runnerID:this.app.loginAdministratorReadOnly.loginUserID})
                    else  this.app.transition("userPageInWhole",{runnerID:this.app.loginAdministratorReadOnly.loginUserID})
                }
            },{
                title:{
                    Japanese:"通知",
                    English:"Notification",
                    icon:"notification"
                },
                remarks:{
                    Japanese:`<strong class="u-redChara">${(runnerInfo === undefined || runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+"件の未読"}</strong>`,
                    English:`<strong class="u-redChara">${(runnerInfo === undefined || runnerInfo.numberOfUnreadNotification === 0) ? "":runnerInfo.numberOfUnreadNotification+" unread notifications"}</strong>`,
                    icon:""
                },
                description:{
                    Japanese: "通知を確認することが出来ます。",
                    English: "You can check notifications from the service here."
                },
                isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:false,
                to:() => this.app.transition("notificationList",null)
            },{
                title:{
                    Japanese:"記録の閲覧",
                    English:"Search a Record",
                    icon:"menu"
                },
                description:{
                    Japanese:
                        (isSetTargetGameMode) ?  `今まで投稿された「${targetGameMode.ja}」の記録を検索して閲覧することが出来ます。`:`<strong>閲覧するゲームタイトル/モードを設定してください。</strong>`,
                    English:
                        (isSetTargetGameMode) ?  `In this page, you can search records in ${targetGameMode.en}.`:`<strong>You need to set your target gamemode first.</strong>`
                
                },
                isDisabled:!isSetTargetGameMode,
                biggerTitle:false,
                to:(isSetTargetGameMode) ? () => this.app.transition("searchConditionSelectorView",null) : undefined
            },{
                title:{
                    Japanese:"記録の申請",
                    //#NOTE ここの英訳本当に大丈夫？
                    English:"Submit a Record",
                    icon:"cloud"
                },
                description:{
                    Japanese:(() => {
                        if (!isLogIn) return "<strong>申請にはログインが必要です。</strong>"
                        if (!isSetTargetGameMode) return "<strong>閲覧するゲームタイトル/モードを設定してください。</strong>"
                        return "自分の取った記録を、このページに掲示するために申請することができます。"
                    })(),
                    English:(() => {
                        if (!isLogIn) return "<strong>Login is indispensable to submit your record.</strong>"
                        if (!isSetTargetGameMode) return "<strong>Setting your target gamemode is indispensable to submit your record.</strong>"
                        return "You can submit your record to KSSRs here."
                    })()
                },
                isDisabled:!isSetTargetGameMode || !isLogIn,
                biggerTitle:false,
                to:(this.app.loginAdministratorReadOnly.isUserLogin) ? () => this.app.transition("offerForm",null):undefined
            }];
        }

        generateSettingMenuInfo():RequiredObjectToGenerateItem[]{
            
           const isLogIn = this.app.loginAdministratorReadOnly.isUserLogin;
            const userName = (isLogIn) ? this.app.loginAdministratorReadOnly.loginUserName:"";
             return [{
                title:{
                    Japanese:(isLogIn) ?  "ログアウト":"サインイン / ログイン",
                    English:(isLogIn) ? "Log out":"Sign In / Log In",
                    icon:(isLogIn) ? "logout":"login"
                },
                remarks:(isLogIn) ? {
                    ...userName,
                    icon:"person"
                } : undefined,
                description:{
                    Japanese: (isLogIn) ? "サービスからログアウトします。" : "ログインをすると記録の申請ができるようになります。ログインにはGoogleアカウントが必要です。",
                    English: (isLogIn) ? "Logout from KSSRs" : "It is necessary for users to login who want to post their records. Login requires your google account."
                },
                isDisabled:false,
                biggerTitle:false,
                to:() => {
                    (isLogIn) ? this.app.logout():this.app.login()
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
                isDisabled: !this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:false,
                to:async () =>this.app.transition("settingUserInfo",null)
            },
            {
                title:{
                    Japanese:"言語設定",
                    English:"Language",
                    icon:"earth"
                },
                description:{
                    Japanese: "ここで、KSSRsの表示言語を設定することが出来ます。",
                    English: "You can change the language of the display here."
                },
                isDisabled: !this.app.loginAdministratorReadOnly.isUserLogin,
                biggerTitle:false,
                to:async () =>this.app.transition("language",null)
            }]
    }
    generateDetailMenuInfo():RequiredObjectToGenerateItem[]{
            

          return [{
            title:{
                Japanese:"新ゲームタイトル/ゲームモードの制定申請",
                English:"Setting New Titles/Gamemodes",
                icon:"feather"
            },
            description:{
                Japanese:"取り扱うゲームタイトルとゲームモードを増やすことができます。",
                English:"Setting these enables KSSRs to cover more titles/gamemodes."
            },
            isDisabled:!this.app.loginAdministratorReadOnly.isUserLogin || !this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember,
            to:() => {this.app.transition("settingNewRegulation_CollectionViewer",null,{ifAppendHistory:false})},
            biggerTitle:false,
            isUnused: !this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember
        },{
            title:{
                Japanese:"利用規約",
                English:"Term of Use",
                icon:"contract"
            },
            description:{
                Japanese:"KSSRsを利用する際に意識すべきことをまとめました。",
                English:"All the things you should check about using KSSRs are written here."
            },
            isDisabled:false,
            biggerTitle:false,
            //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
            to:() => {this.app.transition("termOfUse",null)}
        },{
            title:{
                Japanese:"Source",
                English:"Source",
                icon:"writing"
            },
            description:{
                Japanese:"KSSRsを開発するにあたって、使用したツール、ライブラリやソースコードをGitHubにリポジトリとして示しています。",
                English:"Frameworks which I use for developing KSSRs and the source code are written in this GitHub page."
            },
            isDisabled:false,
            biggerTitle:false,
            //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
            to:() => window.open("")
        }]
 }
}

