import { IRunner } from "../../../type/record/IRunner";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { EditorTextPart } from "../parts/SetNewRegulation/Editor/EditorTextPart";
import { EditorFormManager, InputFormObject } from "../parts/SetNewRegulation/EditorFormManager";
import { SettingRegulationStateHeader } from "../parts/SetNewRegulation/SettingRegulationStateHeader";
import { PageStateBaseClass } from "./PageStateClass";
import { generateBaseEditors, generateDescriptionEditors, titleContext } from "./settingNewRegulationState/utility";
import firebase from "firebase/app";
import "firebase/firestore";
const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"走者ページに戻る",
                English:"return to GameMode"
            },
            explain:{
                Japanese:"",
                English:""
            },
        }
    },
    Input:{
        Japanese:{
            title:{
                Japanese:"日本名",
                English:"Japanese Name"
            },
            description:[{
                Japanese:"走者の日本名を入力してください。",
                English:"Enter your name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英名",
                English:"English Name"
            },
            description:[{
                Japanese:"走者の英名を入力して下さい。",
                English:"Enter your name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での自己紹介",
                English:"Japanese Description"
            },
            description:[{
                Japanese:"自己紹介を日本語で入力してください。",
                English:"Enter your short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での自己紹介",
                English:"English Description"
            },
            description:[{
                Japanese:"自己紹介を英語で入力して下さい。",
                English:"Enter this segment's short description in English."
            }]
        },
        TwitterLink:{
            title:{
                Japanese:"Twitterへのリンク",
                English:"Twitter link"
            },
            description:[{
                Japanese:"Twitterのアカウントのページへのリンクをコピペで入力してください。。",
                English:"Enter your Twitter account page's link by using copy and paste."
            }]
        },
        YoutubeLink:{
            title:{
                Japanese:"Youtubeへのリンク",
                English:"Youtube link"
            },
            description:[{
                Japanese:"Youtubeのアカウントのページへのリンクをコピペで入力して下さい。",
                English:"Enter your Youtube account page's link by using copy and paste."
            }]
        }
        
    }
}
type HandledType = IRunner
export class S_SettingUserInfo
    extends PageStateBaseClass<null, IAppUsedToChangeState> {
        private editorForm:EditorFormManager<HandledType>|null = null;
        async init() {
            const runnerID = this.app.loginAdministratorReadOnly.loginUserID;
            const headerMaker = new SettingRegulationStateHeader(
                appendElement(this.articleDOM,"div"),this.app.state.language,
                {
                    mainTitle: context.title,
                    subTitle:  context.titleDescription
                },[
                {
                    id:"back",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false,
                    onClickCallBack: () => {
                        if (StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed))
                            this.app.transition("userPageInSpecific",{runnerID:runnerID,...this.app.state.gameSystemEnvDisplayed})
                        else
                            this.app.transition("userPageInWhole",{runnerID:runnerID})
                    }
                }])
            const lang = this.app.state.language;
            const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
            const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
            const inputForms:InputFormObject<HandledType>= {
                ...generateBaseEditors(editorSegment,lang,context),
                ...generateDescriptionEditors(editorSegment,lang,context),
                twitterLink:       new EditorTextPart({
                                                container:appendElement(editorSegment,"div"),
                                                language:lang,
                                                title:context.Input.TwitterLink.title,
                                                description:context.Input.TwitterLink.description,
                                                requiredField:false,
                                                icooon:"link"
                                            }),
                youtubeLink:       new EditorTextPart({
                                                container:appendElement(editorSegment,"div"),
                                                language:lang,
                                                title:context.Input.YoutubeLink.title,
                                                description:context.Input.YoutubeLink.description,
                                                requiredField:false,
                                                icooon:"link"
                                            }),
                
            };
            inputForms.twitterLink?.addChangeEventListener((changed) => {
                if (/https\:\/\/twitter\.com\/[a-zA-Z\-]+/.test(changed)) inputForms.youtubeLink?.refresh("");
            })
            inputForms.youtubeLink?.addChangeEventListener((changed) => {
                if (/https\:\/\/www\.youtube\.com\/channel\/[a-zA-Z\-]+/.test(changed)) inputForms.youtubeLink?.refresh("");
            })
            const english = (await this.app.accessToAPI("list_runner",{id:runnerID})).result.English
            this.editorForm = new EditorFormManager(
                editorHeader,lang,firebase.firestore().collection("runners"),`${english}'s information`,inputForms,
                {
                    id:"",
                    Japanese:"",English:"",
                    JDescription:"",EDescription:"",
                    theDateOfLastPost:Date.now(),theDateOfRegistered:Date.now(),
                    theNumberOfPost:0,isMuted:false,
                    isCommitteeMember:false,twitterLink:"",
                    youtubeLink:"",idOfGameModeRunnerHavePlayed:[],idOfGameSystemRunnerHavePlayed:[],
                    numberOfUnreadNotification:0,photoURL:""
                },{
                    ErrorCatcher:(error) => this.app.errorCatcher(error),
                    whenAppendNewItem: () => {},
                    whenReset: () => {},
                    id:runnerID
                })
            
        }
        destroy(){
            if (this.editorForm !== null) this.editorForm.destroy();
        }
}