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
export class S_SettingNewRegulationState_CollectionViewer
    extends PageStateBaseClass<{collection:firebase.firestore.CollectionReference,pathStack:string[]}|null,IAppUsedToChangeState>{

    init(){
        if (this.requiredObj === null) this.requiredObj = {collection:firebase.firestore().collection("title"),pathStack:["titles"]}

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
                    if (id === undefined) throw new Error("上の階層がありません");
                    this.requiredObj.pathStack.push("new Item");
                    this.transitionProperState(id);
                }
            }])

        new SettingRegulationView_CollectionViewer(this.articleDOM,this.requiredObj.collection,this.app.state.language,{
            whenStart:()=> this.generateLoadingSpinner("feather"),
            whenReady:() => this.deleteLoadingSpinner(),
            onClickEventListener: (id,item) => {
                if (this.requiredObj === null) throw new Error()
                this.requiredObj.pathStack.push(choiceString(item,this.app.state.language))
                this.transitionProperState(id);
            }
        })
    }
    private transitionProperState(id:string){
        if (this.requiredObj === null) throw new Error()
        const moveTo = (() => {
            switch (this.requiredObj.pathStack[this.requiredObj.pathStack.length-2]){
                case "targets":         return "settingRegulation_TargetDocViewer";
                case "abilities":       return "settingRegulation_AbilityDocViewer";
                case "difficulties":    return "settingRegulation_DifficultyDocViewer";
                case "modes":           return "settingRegulation_GameModeDocViewer";
                case "titles":          return "settingRegulation_GameSystemDocViewer";
                default:                return "settingRegulation_GameSystemDocViewer";
            }
        })()
        this.app.transition(moveTo,{
            collection:this.requiredObj.collection,
            id:id,
            pathStack:this.requiredObj.pathStack
        })
    }
}
