import { IRunner, IRunnerEditable } from "../../../type/record/IRunner";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { EditorTextPart } from "../parts/SetNewRegulation/Editor/EditorTextPart";
import { EditorFormManagerWithAutoDetect, InputFormObject } from "../parts/SetNewRegulation/EditorFormManagerWithAutoDetect";
import { SettingRegulationStateHeader } from "../parts/SetNewRegulation/SettingRegulationStateHeader";
import { PageStateBaseClass } from "./PageStateClass";
import { createEditorSegmentBaseElement, generateBaseEditors, generateDescriptionEditors, titleContext } from "./settingNewRegulationState/utility";
import firebase from "firebase/app";
import "firebase/firestore";
const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"トップページに戻る",
                English:"return to the Top Page"
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
        PhotoURL:{
            title:{
                Japanese:"アイコンへのリンク",
                English:"Icon link"
            },
            description:[{
                Japanese:"アイコン画像へのURLをここにコピペで入力してください。",
                English:"Enter your icon image's link by using copy and paste."
            }]
        },
        TwitterLink:{
            title:{
                Japanese:"Twitterへのリンク",
                English:"Twitter link"
            },
            description:[{
                Japanese:"Twitterのアカウントのページへのリンクをコピペで入力してください。",
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
type HandledType = IRunnerEditable
export class S_SettingUserInfo
    extends PageStateBaseClass<null, IAppUsedToChangeState> {
        private editorForm:EditorFormManagerWithAutoDetect<HandledType>|null = null;
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
                    onClickCallBack: () => this.app.transition("mainMenu",null)
                }])
            const lang = this.app.state.language;
            const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
            const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
            const inputForms:InputFormObject<HandledType>= {
                ...generateBaseEditors(editorSegment,lang,context),
                ...generateDescriptionEditors(editorSegment,lang,context),
                photoURL:           new EditorTextPart({
                                                container:appendElement(createEditorSegmentBaseElement(editorSegment),"div"),
                                                language:lang,
                                                title:context.Input.PhotoURL.title,
                                                description:context.Input.PhotoURL.description,
                                                requiredField:false,
                                                icooon:"link"
                                            }),
                twitterLink:        new EditorTextPart({
                                                container:appendElement(createEditorSegmentBaseElement(editorSegment),"div"),
                                                language:lang,
                                                title:context.Input.TwitterLink.title,
                                                description:context.Input.TwitterLink.description,
                                                requiredField:false,
                                                icooon:"link"
                                            }),
                youtubeLink:        new EditorTextPart({
                                                container:appendElement(createEditorSegmentBaseElement(editorSegment),"div"),
                                                language:lang,
                                                title:context.Input.YoutubeLink.title,
                                                description:context.Input.YoutubeLink.description,
                                                requiredField:false,
                                                icooon:"link"
                                            }),
                
            };
            inputForms.twitterLink?.addChangeEventListener((changed) => {
                if (changed === undefined) return;
                if (/https\:\/\/twitter\.com\/[a-zA-Z\-]+/.test(changed)) inputForms.youtubeLink?.refresh("");
            })
            inputForms.youtubeLink?.addChangeEventListener((changed) => {
                if (changed === undefined) return;
                if (/https\:\/\/www\.youtube\.com\/channel\/[a-zA-Z\-]+/.test(changed)) inputForms.youtubeLink?.refresh("");
            })
            const english = (await this.app.accessToAPI("list_runner",{id:runnerID})).result.English
            this.editorForm = new EditorFormManagerWithAutoDetect(
                editorHeader,lang,firebase.firestore().collection("runners"),`${english}'s information`,inputForms,
                {
                    Japanese:"",English:"",
                    JDescription:"",EDescription:"",twitterLink:"",youtubeLink:"",photoURL:"",
                    numberOfUnreadNotification:0
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