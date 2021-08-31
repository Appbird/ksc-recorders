import { IAppUsedToChangeState } from "../../../interface/AppInterfaces";
import { PageStateBaseClass } from "../Base/PageStateClass";
import { appendElement } from "../../../utility/aboutElement";
import { DocViewerRequired } from "./Types";
import { goDeeperFromDocToCollection, titleContext } from "./utility";
import firebase from "firebase/app";
import "firebase/firestore";
import { SettingRegulationStateHeader } from "../../parts/SetNewRegulation/SettingRegulationStateHeader";
const context = {
    ...titleContext,
    List:{
        gametitles:{
            title:{
                Japanese:"ゲームタイトル",
                English:"Game Titles"
            },
            explain:{
                Japanese:"KSSRsに登録されているゲームタイトルの一覧です。",
                //#CTODO 英訳
                English:"This is the list including all of titles registered in KSSRs."
            },
        },
        rules:{
            
            title:{
                Japanese:"ルール属性制定",
                English:"Rule Attributes."
            },
            explain:{
                Japanese:"ここでルール属性を定義することで、ゲームモードに対して様々なルールを設けることが出来ます。全モード共通です。",
                English:"You can set rules on game modes by defining rule attributes here. "
            }
        }
    }
}
export class S_SettingRegulationState_Top
    extends PageStateBaseClass<null, IAppUsedToChangeState> {
    init() {
        const headerMaker = new SettingRegulationStateHeader(
            appendElement(this.articleDOM,"div"),this.app.state.language,
            {
                mainTitle: context.title,
                subTitle:  context.titleDescription
            },[
            {
                id:"gameSystem",icooon:"folder",title:context.List.gametitles.title,description:context.List.gametitles.explain,unused:false, 
                onClickCallBack: () => this.app.transition("settingNewRegulation_CollectionViewer",{
                    collection: firebase.firestore().collection("titles"),
                    pathStack:["titles"]
                })
            },{
                id:"ruleAttributes",icooon:"folder",title:context.List.rules.title,description:context.List.rules.explain,unused:false,
                onClickCallBack: () => this.app.transition("settingNewRegulation_CollectionViewer",{
                    collection: firebase.firestore().collection("rules"),
                    pathStack:["rules"]
                })
            }
            ]
        )
    }
    destroy(){
        this.articleDOM.innerHTML = ""
    }
}

