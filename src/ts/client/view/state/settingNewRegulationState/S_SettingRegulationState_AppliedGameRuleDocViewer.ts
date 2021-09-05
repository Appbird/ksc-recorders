import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../Base/PageStateClass";
import { EditorFormManagerWithAutoDetect, InputFormObject } from "../../parts/SetNewRegulation/EditorFormManagerWithAutoDetect";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { createEditorSegmentBaseElement, goBackFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { choiceString } from "../../../../utility/aboutLang";
import { IAppliedGameModeRule } from "../../../../type/list/GameModeRule";
import { EditorMultiLanguageSimpleMDEPart } from "../../parts/SetNewRegulation/Editor/EditorMultiLanguageSimpleMDEPart";
import { EditorIDPart } from "../../parts/SetNewRegulation/Editor/EditorIDPart";
import firebase from "firebase/app";
import "firebase/firestore";
import { IDefinedRuleClassItem } from "../../../../type/list/IDefinedRuleClassItem";
import { EditorAppliedRuleClassesPart } from "../../parts/SetNewRegulation/Editor/EditorAppliedRuleClassPart/EditorAppliedRuleClassesPart";
import { EditorInoperablePart } from "../../parts/SetNewRegulation/Editor/EditorInoperablePart";
import { IDefinedRuleAttributeWithoutCollection } from "../../../../type/list/IDefinedRuleAttributeItem";
import { EditorPart } from "../../parts/SetNewRegulation/Editor/EditorPart";
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
        id:{
            title:{
                Japanese:"ルール属性",
                English: "Rule Attribute"
            },
            description:[{
                Japanese:"このゲームモードで設定するルール属性を選んでください。",
                English: "Select the rule attribute you will edit in this page."
            },
            {
                Japanese:"一度選択すると変えられません。",
                English: "If you select once, you can't change this section any longer."
            }]
        },
        appliedRuleClasses:{
            title:{
                Japanese:"適用するルールクラス",
                English: "Applied Rule Classes"
            },
            description:[{
                Japanese:"適用するルールクラスを選択します。",
                English: "Select rule class you want to apply."
            },{
                Japanese:"適用範囲の欄に何も書かない場合、全セグメントにこのルールクラスが適用されることになります",
                English: "If you write no comments in this \"scope\" section, the rule class will be applied to all segments."
            },{
                Japanese:"必要であれば、適用範囲や注を書くことが出来ます。",
                English: "If you need, you can write the scope of the rule class or note about this application."
            }]
        },
        note:{
            title:{
                Japanese:"説明",
                English: "Description"
            },
            description:[{
                Japanese:"このルールを属性を適用したことの補足を追加できます。",
                English: "You can complement about this applied rule."
            }]
        },

        
    }
}
type HandledType = IAppliedGameModeRule
export class S_SettingRegulationState_AppliedGameRuleDocViewer
    extends PageStateBaseClass<DocViewerRequired, IAppUsedToChangeState> {
    private editorForm:EditorFormManagerWithAutoDetect<HandledType>|null = null;
    async init() {
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

        const idEditor = new EditorIDPart({
            container:createEditorSegmentBaseElement(appendElement(editorSegment,"div")),
            language:lang,
            ...context.Input.id,
            icooon:"tag",
            requiredField:true,
            options: []
        })
        const appliedClassIDEditor = new EditorAppliedRuleClassesPart({
            container:createEditorSegmentBaseElement(appendElement(editorSegment,"div")),
            language:lang,
            icooon:"tag",
            ...context.Input.appliedRuleClasses,
            ruleClassOptions:[],
            requiredField:true
        })
        const inputForms:InputFormObject<HandledType> = {
            Japanese:   new EditorInoperablePart(""),
            English:    new EditorInoperablePart(""),
            id :            idEditor,
            appliedClassID: appliedClassIDEditor,
            note:       new EditorMultiLanguageSimpleMDEPart({
                container: createEditorSegmentBaseElement(appendElement(editorSegment,"div")),
                language:lang,
                icooon:"notebook",
                ...context.Input.note,
                requiredField:false,
            }),
        };
        //#CTODO Japanese,Englishが更新されない理由が何故かを探る
        //#CTODO ゲームルールを表示させるページを用意して表示してみる。
        idEditor.refreshOption((await firebase.firestore().collection("rules").get()).docs.map(doc => doc.data() as IDefinedRuleClassItem))

        this.editorForm = new EditorFormManagerWithAutoDetect<IAppliedGameModeRule>(
            editorHeader,lang,this.requiredObj.collection,this.requiredObj.pathStack.join(" > "),inputForms,
            {
                id:"",
                appliedClassID:[],
                Japanese:"",English:"",
                note:{ Japanese:"",English:"" },
                modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
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
                onReady: (data) => this.initalizeEditors(data,idEditor,appliedClassIDEditor,inputForms),
                id:this.requiredObj.id,
                needModifiedAt:true
            })
        
    }
    destroy(){
        if (this.editorForm !== null) this.editorForm.destroy();
    }
    private async initalizeEditors(data:HandledType,idEditor:EditorIDPart,appliedClassIDEditor:EditorAppliedRuleClassesPart,inputForms: InputFormObject<HandledType>){
        const func = async (changedID?:string) => {
            console.log("refreshed")
            if (changedID === undefined) return;
            await this.setNewDefinedRuleClassOptions(appliedClassIDEditor,changedID)
            await this.changeTitle(changedID,inputForms.Japanese,inputForms.English)   
            appliedClassIDEditor.refresh(data.appliedClassID)
        }
        idEditor.addChangeEventListener((changed) => func(changed))
        func(idEditor.value)
        if (data.Japanese.length !== 0) idEditor.disabled(true) 
    }
    private async changeTitle(ruleAttributeID:string,JapaneseEditor?:EditorPart<string>,EnglishEditor?:EditorPart<string>){
       const data = (await firebase.firestore().collection("rules").doc(ruleAttributeID).get()).data() as IDefinedRuleAttributeWithoutCollection
       JapaneseEditor?.refresh(data.ruleName)
       EnglishEditor?.refresh(data.ruleName)
    }
    private async setNewDefinedRuleClassOptions(appliedClassIDEditor:EditorAppliedRuleClassesPart,changedRuleAttributeID:string){
        try{
            appliedClassIDEditor.refreshOption((await firebase.firestore().collection("rules").doc(changedRuleAttributeID).collection("ruleClasses").get()).docs.map(doc => doc.data() as IDefinedRuleClassItem))
            
        } catch(err){
            this.app.errorCatcher(err)
        }
    }
}

