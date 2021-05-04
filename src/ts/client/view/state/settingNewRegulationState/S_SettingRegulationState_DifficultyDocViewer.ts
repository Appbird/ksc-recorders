import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../PageStateClass";
import { EditorFormManager, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManager";
import { EditorTextPart } from "../../parts/SetNewRegulation/Editor/EditorTextPart";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { goBackFromDocToCollection, titleContext } from "./utility";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { EditorIDPart } from "../../parts/SetNewRegulation/Editor/EditorIDPart";
import { ITargetItem } from "../../../../type/list/ITargetItem";

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
                //#TODO 英訳
                English:""
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
                Japanese:"この能力の日本語名を入力してください。",
                English:"Enter this ability's name in Japanese."
            }]
        },
        English:{
            title:{
                Japanese:"英語名",
                English:"English Name"
            },
            description:[{
                Japanese:"この能力の英語名を入力して下さい。",
                English:"Enter this ability's name in English."
            }]
        },
        JapaneseDescription:{
            title:{
                Japanese:"日本語での説明",
                English:"Japanese Description"
            },
            description:[{
                Japanese:" この能力についての説明を日本語で入力してください。",
                English:"Enter this ability's short description in Japanese."
            }]
        },
        EnglishDescription:{
            title:{
                Japanese:"英語での説明",
                English:"English Description"
            },
            description:[{
                Japanese:"この能力についての説明を英語で入力して下さい。",
                English:"Enter this ability's short description in English."
            }]
        }
        
    }
}
type HandledType = IGameDifficultyItem
export class S_SettingRegulationState_DifficultyDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManager<HandledType>|null = null;
    async init() {
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[{
                id:"back",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)
            }])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        
        const optionsRef = this.requiredObj.collection.parent?.collection("targets");
        if (optionsRef === undefined) throw new Error("計測対象コレクションが存在しません。")
        const inputForms:InputFormObject<HandledType>= {
            Japanese:           new EditorTextPart({
                                            container:appendElement(editorSegment,"div"),
                                            language:lang,
                                            title:context.Input.Japanese.title,
                                            description:context.Input.Japanese.description,
                                            requiredField:true
                                        }),
            English:            new EditorTextPart({
                                            container:appendElement(editorSegment,"div"),
                                            language:lang,
                                            title:context.Input.English.title,
                                            description:context.Input.English.description,
                                            requiredField:true
                                        }),
            TargetIDsIncludedInTheDifficulty:   
                                new EditorIDPart({
                                    container:appendElement(editorSegment,"div"),
                                    language:lang,
                                    title:context.Input.EnglishDescription.title,
                                    description:context.Input.EnglishDescription.description,
                                    requiredField:false,
                                    options:(await optionsRef.get()).docs.map(doc => doc.data() as ITargetItem),
                                    observed:optionsRef
                                }),
            JDescription:       new EditorTextPart({
                                            container:appendElement(editorSegment,"div"),
                                            language:lang,
                                            title:context.Input.JapaneseDescription.title,
                                            description:context.Input.JapaneseDescription.description,
                                            requiredField:false
                                        }),
            EDescription:       new EditorTextPart({
                                        container:appendElement(editorSegment,"div"),
                                        language:lang,
                                        title:context.Input.EnglishDescription.title,
                                        description:context.Input.EnglishDescription.description,
                                        requiredField:false
                                        }),
        };
        this.editorForm = new EditorFormManager(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:"",
                TargetIDsIncludedInTheDifficulty:[]
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id) => {
                    headerMaker.changeTitle({mainTitle:context.title,subTitle:context.titleDescription})
                    this.requiredObj.id = id;
                },
                whenReset: () => {},
                id:this.requiredObj.id   
            })
        
    }
    destroy(){
        if (this.editorForm !== null) this.editorForm.destroy();
    }
}


