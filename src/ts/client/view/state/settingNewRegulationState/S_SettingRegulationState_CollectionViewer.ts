import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { SettingRegulationView_CollectionViewer } from "../../parts/SetNewRegulation/SettingRegulationView_CollectionViewer";
import { PageStateBaseClass } from "../PageStateClass";
import firebase from "firebase/app"
import "firebase/firestore";
import { choiceString } from "../../../../utility/aboutLang";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { appendElement } from "../../../utility/aboutElement";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";

const context = {
    title:{
        Japanese:"コレクションから編集するものを選択",
        English:"Select item from the collection which you want to edit."
    },
    titleDescription:{
        Japanese:"一度に複数のアイテムを追加することが出来ます。",
        English:"You can append multiple items at once here."
    },
    List:{
        CSVSelectable:{
            title:{
                Japanese:"CSVでデータを追加する。",
                English:"Enter new items by writing CSV."
            },
            explain:{
                Japanese:"複数アイテムを一括して登録することが出来ます。編集,削除はできません。",
                English:"You can append multiple items here at once. <strong>Neither Deleting nor Modifying is available in this mode.</strong>"
            }
        },
        copySelectable:{
            title:{
                Japanese:"CSVをコピーする",
                English:"Copy in CSV"
            },
            explain:{
                Japanese:"このコレクションデータをCSV形式でクリップボードにコピーします。",
                English:""
            }
        },
        backSelectable:{
            title:{
                Japanese:"上の階層へ戻る",
                English:"back to more shallow directory"
            },
            explain:{
                Japanese:"",
                English:""
            }
        }
    }

}
// #CTODO この画面がAbility,Targetについての画面の時のみ、EditorCSVPartを適切な箇所に表示し、CSVによる一括入力を許可する。

export class S_SettingNewRegulationState_CollectionViewer
    extends PageStateBaseClass<{collection:firebase.firestore.CollectionReference,pathStack:string[]}|null,IAppUsedToChangeState>{
        private settingRegulationView:SettingRegulationView_CollectionViewer|null = null;
    init(){
        if (this.requiredObj === null) this.requiredObj = {collection:firebase.firestore().collection("titles"),pathStack:["titles"]}

        const ps = this.requiredObj.pathStack;
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: context.title,
                subTitle:  context.titleDescription
            },[{
                id:"insertNewDataByCSV",title:context.List.CSVSelectable.title,description:context.List.CSVSelectable.explain,unused:(ps[ps.length-1] !== "targets"&&ps[ps.length-1] !== "abilities"),
                onClickCallBack: async () => {
                    if (this.requiredObj === null) throw new Error("ターゲットが設定されていません。")
                    this.app.transition("settingRegulation_CollectionAppender",this.requiredObj,{ifAppendHistory:false})
                }
            },{
                id:"copyData",title:context.List.copySelectable.title,description:context.List.copySelectable.explain,unused:(ps[ps.length-1] !== "targets"&&ps[ps.length-1] !== "abilities"),
                onClickCallBack: async () => {
                    if (this.requiredObj === null) throw new Error("ターゲットが設定されていません。")
                    navigator.clipboard.writeText(await convertToCSV(this.requiredObj?.collection))
                        .then(() => this.app.notie.successAlert({Japanese:"クリップボードにコピーできました！",English:"Successed in copying to clipboard!"}))
                        .catch(() => this.app.notie.errorAlert({Japanese:"クリップボードにコピーできませんでした...",English:"Failed to copy to clipboard..."}))
                    
                }
            },{
                id:"modes",title:context.List.backSelectable.title,description:context.List.backSelectable.explain,unused:(this.requiredObj.pathStack.length === 1),
                onClickCallBack: () => {
                    if (this.requiredObj === null) throw new Error("オブジェクトが与えられていません。")
                    const id = this.requiredObj.collection.parent?.id;
                    const ref = this.requiredObj.collection.parent?.parent
                    if (id === undefined || ref === undefined) throw new Error("上の階層がありません");
                    this.requiredObj.pathStack.pop();
                    
                    this.transitionProperState(id,ref,this.requiredObj.pathStack,this.requiredObj.pathStack[this.requiredObj.pathStack.length-2]);
                }
            }])

        this.settingRegulationView = new SettingRegulationView_CollectionViewer(this.articleDOM,this.requiredObj.collection,this.app.state.language,{
            whenStart:()=> this.generateLoadingSpinner("feather"),
            whenReady:() => this.deleteLoadingSpinner(),
            onClickEventListener: (id,item) => {
                if (this.requiredObj === null) throw new Error()
                this.requiredObj.pathStack.push(choiceString(item,this.app.state.language))
                this.transitionProperState(id,this.requiredObj.collection,this.requiredObj.pathStack,this.requiredObj.pathStack[this.requiredObj.pathStack.length-2]);
            }
        })
    }
    private transitionProperState(id:string,collection:firebase.firestore.CollectionReference,pathStack:string[],docWantToGo:string){
        if (this.requiredObj === null) throw new Error()
        const moveTo = (() => {
            switch (docWantToGo){
                case "targets":         return "settingRegulation_TargetDocViewer";
                case "abilities":       return "settingRegulation_AbilityDocViewer";
                case "difficulties":    return "settingRegulation_DifficultyDocViewer";
                case "modes":           return "settingRegulation_GameModeDocViewer";
                case "titles":          return "settingRegulation_GameSystemDocViewer";
                default:                return "settingRegulation_GameSystemDocViewer";
            }
        })()
        this.app.transition(moveTo,{
            collection:collection,
            id:id,
            pathStack:pathStack
        },{
            ifAppendHistory:false
        })
    }
    destroy(){
        if (this.settingRegulationView !== null) this.settingRegulationView.destroy();
    }
}

async function convertToCSV(collection:firebase.firestore.CollectionReference){
    return collection.get()
        .then(
            (result) => {
                const items = result.docs.map(doc => doc.data() as IItemOfResolveTableToName)
                return "Japanese,English,JDescription,EDescription\n" +
                    items.map(item => `${item.Japanese},${item.English},${(item.JDescription) ? item.JDescription:""},${(item.EDescription) ? item.EDescription:""}`).join("\n")
            }
        )
}