import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { SettingRegulationView_CollectionViewer } from "../../parts/SetNewRegulation/SettingRegulationView_CollectionViewer";
import { PageStateBaseClass } from "../PageStateClass";
import firebase from "firebase/app"
import "firebase/firestore";
import { choiceString } from "../../../../utility/aboutLang";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
import { appendElement } from "../../../utility/aboutElement";

const context = {
    title:{
        Japanese:"コレクションから編集するものを選択",
        English:"Select item from the collection which you want to edit."
    },
    titleDescription:{
        Japanese:"",
        English:""
    },
    List:{
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
// #TODO この画面がAbility,Targetについての画面の時のみ、EditorCSVPartを適切な箇所に表示し、CSVによる一括入力を許可する。
// #NOTE 特定の場所をクリックするとエディタが展開されるようにしたい。確定ボタンを押すと送信されるようにする…？
// #NOTE 送信する際に、二重送信を防ぐためボタンをdisabledにしておく。
export class S_SettingNewRegulationState_CollectionViewer
    extends PageStateBaseClass<{collection:firebase.firestore.CollectionReference,pathStack:string[]}|null,IAppUsedToChangeState>{
        private settingRegulationView:SettingRegulationView_CollectionViewer|null = null;
    init(){
        if (this.requiredObj === null) this.requiredObj = {collection:firebase.firestore().collection("titles"),pathStack:["titles"]}

        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: context.title,
                subTitle:  context.titleDescription
            },[{
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
        },{ifAppendHistory:false})
    }
    destroy(){
        if (this.settingRegulationView !== null) this.settingRegulationView.destroy();
    }
}
