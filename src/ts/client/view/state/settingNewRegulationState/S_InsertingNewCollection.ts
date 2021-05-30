import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../PageStateClass";
import { appendElement } from "../../../utility/aboutElement";
import { goBackFromDocToCollection, titleContext } from "./utility";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { EditorCSVForInputingItemPart } from "../../parts/SetNewRegulation/Editor/Editor_CSVInputter";
import { element } from "../../../../utility/ViewUtility";
import { choiceString } from "../../../../utility/aboutLang";
import firebase from "firebase/app"
import "firebase/firestore";
import { TitleCupsuled } from "../../parts/TitleCupsuled";
const context = {
    ...titleContext,
    title:{
        Japanese:"CSVでアイテムを追加する。",
        English:"Append new Item by writing CSV."
    },
    titleDescription:{
        Japanese: "決定ボタンを押すことでアイテムが追加されます。",
        English: "Press Enter Button to append new items."
    },
    List:{
        backSelectable:{
            title:{
                Japanese:"アイテム一覧に戻る",
                English:"return to GameMode"
            },
            explain:{
                Japanese:"上の階層に戻ります。",
                English:"return to shallower directory."
            },
        }
    },
    Input:{
        CSV:{
            title:{
                Japanese:"CSV",
                English:"CSV"
            },
            description:[{
                Japanese:"CSVを入力することで複数のアイテムを追加できます。",
                English:"Enter CSV to append multiple items."
            },
            {
                Japanese:"CSVのカラムは<strong>Japanese,English</strong>か<strong>Japanese,English,JDescription,EDescription</strong>のいずれかである必要があります。",
                English:"The CSV's Columns must be either <strong>Japanese,English</strong> or <strong>Japanese,English,JDescription,EDescription</strong>."
            },{
                Japanese:"CSVを入力するにあたってExcelを使うことが出来ます。",
                English: "You can use Excel to write the CSV."
                
            },{
                Japanese:"誤ってアイテムを追加した場合にはDiscordにて報告をお願いします。",
                English: "If you add incorrect items by mistake, please tell that on Discord server."
                
            }]
        }
    },
    Decide:{
        Japanese:"決定",
        English:"Submit"
    }
}
export class S_SettingRegulationState_CollectionAppender
    extends PageStateBaseClass<{collection:firebase.firestore.CollectionReference,pathStack:string[]}, IAppUsedToChangeState> {
    async init() {
         const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),
            this.app.state.language,
            {
                mainTitle: context.title,
                subTitle:  `${context.titleDescription}`
            },[{
                id:"back",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:false,
                onClickCallBack: () => this.app.transition("settingNewRegulation_CollectionViewer",this.requiredObj)
            }])
        const lang = this.app.state.language;
        const editorHeader:HTMLElement = appendElement(this.articleDOM,"div");
        const title = new TitleCupsuled(editorHeader);
        title.refresh(`Editing : ${this.requiredObj.pathStack}`,"Add by CSV",{
            chara:"u-smallerChara",hr:"u-bold"
        })
        const editorSegment:HTMLElement = appendElement(this.articleDOM,"div");
        const editor = new EditorCSVForInputingItemPart({
            container:appendElement(editorSegment,"div"),
            requiredField:true,
            language:lang,
            title: context.Input.CSV.title,
            description: context.Input.CSV.description
        })

        const button = editorSegment.appendChild(element`<div class="u-width50per u-margin2em"><div class="c-button">${choiceString(context.Decide,lang)}</div></div>`) as HTMLElement
        button.addEventListener("click",async () => {
            let input;
            try {
                input = editor.value;
                
            } catch(error) {
                editor.displayError({Japanese:"入力が不正です。",English:"Invalid Input"})
                
                return;
            }
            try {
                for (const item of input){
                    const result = await this.requiredObj.collection.add(item)
                    await result.set({...item,id:result.id})
                }
                this.app.notie.successAlert({
                    Japanese:`アイテムの登録に成功しました！`,
                    English:`Registering new items is completed successfully!`,
                });
                this.app.transition("settingNewRegulation_CollectionViewer",this.requiredObj)
            } catch(error) {
                if (!(error instanceof Error)){
                    console.error(error)
                    return;
                }
                editor.displayError({Japanese:`コレクションを正しく追加できませんでした: ${error.message}`,English:`Failed to add new items: ${error.message}`})
                return;
            }
        })
    }
}

