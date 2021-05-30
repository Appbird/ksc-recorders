import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../PageStateClass";
import { EditorFormManager, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManager";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { generateBaseEditors, generateDescriptionEditors, goBackFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { IAbilityItem } from "../../../../type/list/IAbilityItem";
import { choiceString } from "../../../../utility/aboutLang";

const context = {
    ...titleContext,
    List:{
        backSelectable:{
            title:{
                Japanese:"ゲームモードに戻る",
                English:"return to GameMode"
            },
            explain:{
                Japanese:"上の階層に戻ります。",
                English:"return to shallower directory."
            },
        }
    },
    Input:{
        Japanese:{
            title:{
                Japanese:"日本語名",
                English:"Japanese Name"
            },
            description:[{
                Japanese:"この難易度の日本語名を入力してください。",
                English:"Enter this target's name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英語名",
                English:"English Name"
            },
            description:[{
                Japanese:"この難易度の英語名を入力して下さい。",
                English:"Enter this target's name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での説明",
                English:"Japanese Description"
            },
            description:[{
                Japanese:" この難易度についての説明を日本語で入力してください。",
                English:"Enter this target's short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での説明",
                English:"English Description"
            },
            description:[{
                Japanese:"この難易度についての説明を英語で入力して下さい。",
                English:"Enter this target's short description in English."
            }]
        }
        
    }
}
type HandledType = IAbilityItem
export class S_SettingRegulationState_AbilityDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManager<HandledType>|null = null;
    async init() {
         const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[{
                id:"back",icooon:"folder",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)
            }])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");

        const inputForms:InputFormObject<HandledType>= {

            ...generateBaseEditors(editorSegment,lang,context),
            ...generateDescriptionEditors(editorSegment,lang,context)
        };
        this.editorForm = new EditorFormManager(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:""
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id,data) => {
                    headerMaker.changeTitle({mainTitle:context.title,subTitle:context.titleDescription})
                    this.requiredObj.id = id;
                    
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

