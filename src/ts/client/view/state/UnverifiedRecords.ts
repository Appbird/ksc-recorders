import { choiceString } from "../../../utility/aboutLang";
import { TargetGameMode } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { TitleCupsuled } from "../parts/TitleCupsuled";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    title: {
        Japanese: "未承認の記録",
        English: "Unverified Records"
    }
}

export class S_UnverifiedRecords extends PageStateBaseClass<TargetGameMode,IAppUsedToReadAndChangePage>{
    async init(){
        const header = this.articleDOM.appendChild(document.createElement("div"))
        const title = new TitleCupsuled(header)
        const lang = this.app.state.language
        title.refresh(`<i class="fas fa-pencil-alt"></i>`+choiceString(context.title,lang),`${choiceString(this.requiredObj.gameSystem,lang)} / ${choiceString(this.requiredObj.gameMode,lang)}`)
        this.generateLoadingSpinner()
        const record = await this.app.accessToAPI("record_search",{
            condition:[
                {
                    groupName: "",
                    gameSystemEnv:{
                        gameSystemID:this.requiredObj.gameSystem.id,
                        gameModeID:this.requiredObj.gameMode.id
                    },
                    orderOfRecordArray: "LaterFirst",
                    language: lang,
                    searchTypeForVerifiedRecord:"OnlyUnverified"
                }
            ]
        })
        this.deleteLoadingSpinner()
        const groupView = new RecordGroupView(
                                        this.articleDOM.appendChild(document.createElement("div")),
                                        record.result[0],
                                        this.requiredObj.gameMode.scoreType,
                                        {verifiedCheck:true,
                                        clickOnCardEventListener: (record) => {
                                            this.app.transition("detailView",{
                                                id: record.id,
                                                gameSystemEnv: record.regulation.gameSystemEnvironment,
                                                lang
                                            })
                                        }}
                            )
    }
}