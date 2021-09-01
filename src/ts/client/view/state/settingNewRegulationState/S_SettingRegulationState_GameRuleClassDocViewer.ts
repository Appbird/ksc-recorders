import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../Base/PageStateClass";
import { EditorFormManagerWithAutoDetect, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManagerWithAutoDetect";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { createEditorSegmentBaseElement, generateBaseEditors, generateDescriptionEditors, goBackFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { choiceString } from "../../../../utility/aboutLang";
import { IDefinedRuleClassItem } from "../../../../type/list/IDefinedRuleClassItem";
import { EditorMultipleIconCSSPart } from "../../parts/SetNewRegulation/Editor/EditorMultipleIconCSSPart";
import { EditorTextPart } from "../../parts/SetNewRegulation/Editor/EditorTextPart";
const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"ゲームタイトルのリストに戻る",
                English:"back to the list of titles."
            },
            explain:{
                Japanese:"ここを押すとより浅い階層に戻ることが出来ます。",
                //#CTODO 英訳
                English:"Press this button to go back to shallower directory."
            },
        }
    },
    Input:{
        typeName:{
            title:{
                Japanese:"識別名",
                English:"Identification name"
            },
            description:[{
                Japanese:"このアイテムの識別名を入力してください。",
                English:"Enter this item's Identification name in Japanese."
            }]
        },
        Japanese:{
            title:{
                Japanese:"日本語名",
                English:"Japanese Name"
            },
            description:[{
                Japanese:"このアイテムの日本語名を入力してください。",
                English:"Enter this item's name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英語名",
                English:"English Name"
            },
            description:[{
                Japanese:"このアイテムの英語名を入力して下さい。",
                English:"Enter this item's name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での説明",
                English:"Japanese Description"
            },
            description:[{
                Japanese:" このアイテムについての説明を日本語で入力してください。",
                English:"Enter this item's short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での説明",
                English:"English Description"
            },
            description:[{
                Japanese:"このアイテムについての説明を英語で入力して下さい。",
                English:"Enter this item's short description in English."
            }]
        },
        iconCSS:{
            title:{
                Japanese:"icon CSS",
                English:"iconCSS"
            },
            description:[{
                Japanese:"このルールを表すアイコンを入力してください。",
                English:"Enter the icon expressing this rule."
            },{
                Japanese:"Font Awesome 5のうち、無料プランで使えるアイコンのCSSクラスをここに入力してください。",
                English:"Enter the icon expressing this rule."
            },{
                Japanese:",で区切ると複数アイコンを入力することが出来ます。",
                English:"You can enter multiple icons by separating \",\"."
            }]
        }
  
    }
}
type HandledType = IDefinedRuleClassItem
export class S_SettingRegulationState_GameRuleClassDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManagerWithAutoDetect<HandledType>|null = null;
    init() {
        const unused = (this.requiredObj.id===undefined)
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[
            {
                id:"back",icooon:"folder",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)
            }])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        const inputForms:InputFormObject<HandledType>= {
            typeName:   new EditorTextPart({
                container: createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                ...context.Input.typeName,
                icooon: "tag",
                requiredField:true

            }),
            ...generateBaseEditors(editorSegment,lang,context),
            ...generateDescriptionEditors(editorSegment,lang,context),
            iconCSS:   new EditorMultipleIconCSSPart({
                container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                ...context.Input.iconCSS,
                icooon:"tag",
                requiredField:true
            })
        };
        this.editorForm = new EditorFormManagerWithAutoDetect(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                typeName:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:"",
                iconCSS:[""]
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id,data) => {
                    headerMaker.changeTitle({mainTitle:context.title,subTitle:context.titleDescription})
                    this.requiredObj.id = id
                    
                    this.requiredObj.pathStack.pop();
                    this.requiredObj.pathStack.push(choiceString(data,this.app.state.language));
                    this.app.notie.successAlert({
                        Japanese:`${data.Japanese}の登録に成功しました！`,
                        English:`Registering ${data.English} is completed successfully!`,
                    });
                },
                whenReset: () => {
                    this.app.notie.errorAlert({
                        Japanese:`操作していたデータはサーバーサイドの操作により削除されました。`,
                        English:`The data you were editting was deleted by operation of the server.`,
                    });
                },
                id:this.requiredObj.id   
            })
        
    }
    destroy(){
        if (this.editorForm !== null) this.editorForm.destroy();
    }
}

