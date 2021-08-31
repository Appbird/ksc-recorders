import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../Base/PageStateClass";
import { EditorFormManagerWithAutoDetect, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManagerWithAutoDetect";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { createEditorSegmentBaseElement, generateBaseEditors, generateDescriptionEditors, goBackFromDocToCollection, goDeeperFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { choiceString } from "../../../../utility/aboutLang";
import { IAbilityAttributeItemWithoutCollections } from "../../../../type/list/IAbilityAttributeItemWithoutCollections";
import { EditorBooleanPart } from "../../parts/SetNewRegulation/Editor/EditorTogglePart";
import { EditorPositiveIntegerPart } from "../../parts/SetNewRegulation/Editor/EditorNumberTypePart";
import { EditorMultipleTogglePart } from "../../parts/SetNewRegulation/Editor/EditorMultipleTogglePart";
import { IGameModeItemWithoutCollections } from "../../../../type/list/IGameModeItem";

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
        },
        Flag:{
            title:{
                Japanese:"属性値",
                English:"Attribute Values"
            },
            explain:{
                Japanese:"この能力属性に対して対して定義される属性値のリストです。",
                English:"The list of attribute values defined for this ability attribute."
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
        },
        multipleItems:{
            title:{
                Japanese:   "複数フラグを許可するか",
                English:    "If allow multiple flags"
            },
            description:[{
                Japanese:   "この能力属性は、複数のフラグを取ることが出来るかを選びます。",
                English:    "Select if this ability attribute can take multiple flags."
            },{
                Japanese: "「フラグ」とは、能力属性値の取った値のことを指します。",
                English: "\"flag\" means a value that one ability attributes takes."
            }]
        },
        duplicatedItems:{
            title:{
                Japanese:   "重複フラグを許可するか",
                English:    "If allow duplicated flags"
            },
            description:[{
                Japanese:   "一度に同じフラグを複数取ることが出来るかを選択します。",
                English:    "Select if this ability attribute can take reduplication flags at once."
            }]
        },
        requiredItemCount:{
            title:{
                Japanese:   "必要とするフラグの数",
                English:    "The number of required flags"
            },
            description:[{
                Japanese:   "この能力属性値が必要とするフラグの数を入力してください。",
                English:    "Enter the number of flags this ability attribute rquires."
            }]
        },
        maxItemCount:{
            title:{
                Japanese:   "最大のフラグの数",
                English:    "The max number of flags."
            },
            description:[{
                Japanese:   "この能力属性値が持てる最大のフラグ数を入力してください。",
                English:    "Enter the mex number of flags this ability attribute can take."
            }]
        },
        targetPlayerFlag:{
            title:{
                Japanese:   "どのプレイヤーにこの能力属性を付与するか",
                English:    "Which players the ability attribute is given to."
            },
            description:[{
                Japanese:   "プレイヤーに対応するスイッチを偽にすると、そのプレイヤーに対してこの属性が問われなくなります。",
                English:    "If you switch the boolean value of a player to false, this ability attribute will be not given to the player."
            },{
                Japanese:   "上から、1P, 2P ,3P ,...の順で並んでいます。",
                English:    "From the top, they are arranged in the order of 1P, 2P, 3P, ... ."
            }]
        }
        
    }
}

type HandledType = IAbilityAttributeItemWithoutCollections
export class S_SettingRegulationState_AbilityAttributeDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManagerWithAutoDetect<HandledType>|null = null;
    async init() {
        
        const unset = (this.requiredObj.id===undefined)
         const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: (this.requiredObj.id !== undefined) ? context.title:context.titleWithoutID,
                subTitle:  (this.requiredObj.id !== undefined) ? context.titleDescription:context.titleWithoutIDDescription
            },[
                {id:"back",icooon:"folder",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false, onClickCallBack: () => goBackFromDocToCollection(this.app,this.requiredObj)},
                {id:"flag",icooon:"flag",title:context.List.Flag.title,description:context.List.Flag.explain,unused:unset, onClickCallBack: () =>  goDeeperFromDocToCollection(this.app,this.requiredObj,"flags")}
            ])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        const gameMode = (await this.requiredObj.collection.parent?.get())?.data() as IGameModeItemWithoutCollections|undefined
        if (gameMode === undefined) throw new Error("gameMode === undefined")
        const inputForms:InputFormObject<HandledType>= {

            ...generateBaseEditors(editorSegment,lang,context),
            ...generateDescriptionEditors(editorSegment,lang,context),
            multipleItems:          new EditorBooleanPart({             
                    container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                    language:lang,
                    title:context.Input.multipleItems.title,
                    description:context.Input.multipleItems.description,
                    icooon:"flag",
                    requiredField:true,
                    indentifiedName:"multipleItems"

            }),
            duplicatedItems:          new EditorBooleanPart({             
                container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                title:context.Input.duplicatedItems.title,
                description:context.Input.duplicatedItems.description,
                icooon:"flag",
                requiredField:true,
                indentifiedName:"duplicatedItems"

            }),
            requiredItemCount:          new EditorPositiveIntegerPart({
                container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                title:context.Input.requiredItemCount.title,
                description:context.Input.requiredItemCount.description,
                icooon:"flag",
                requiredField:true
            })
            ,
            maxItemCount:          new EditorPositiveIntegerPart({
                container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                title:context.Input.maxItemCount.title,
                description:context.Input.maxItemCount.description,
                icooon:"flag",
                requiredField:true
            }),
            targetPlayerFlag:       new EditorMultipleTogglePart({
                container:createEditorSegmentBaseElement(appendElement(this.articleDOM,"div")),
                language:lang,
                title:context.Input.targetPlayerFlag.title,
                description:context.Input.targetPlayerFlag.description,
                icooon:"flag",
                requiredField:true,
                indentifiedName:"targetPlayerFlag",
                toggleNumber: gameMode?.maxNumberOfPlayer
            })
        };
        const firstStateOfTargetPlayerFlag = await (async () => {
            const result:boolean[] = []
            for (let i = 0; i < gameMode.maxNumberOfPlayer; i++) result.push(true)
            return result
        })()
        this.editorForm = new EditorFormManagerWithAutoDetect(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                Japanese:"",English:"",
                JDescription:"",EDescription:"",
                multipleItems:true,requiredItemCount:1,maxItemCount:1,
                duplicatedItems:false,targetPlayerFlag:firstStateOfTargetPlayerFlag
            },{
                ErrorCatcher:(error) => this.app.errorCatcher(error),
                whenAppendNewItem: (id,data) => {
                    for (const id of ["flags"]) headerMaker.get(id).classList.remove("u-unused")
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

