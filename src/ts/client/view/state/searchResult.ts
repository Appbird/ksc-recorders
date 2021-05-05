import { APIFunctions } from "../../../type/api/relation";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SearchResult 
    extends PageStateBaseClass<APIFunctions["record_search"]["atServer"],IAppUsedToReadAndChangeOnlyPageState>{
    async init(){
        this.generateLoadingSpinner();
        const requestConditions = this.requiredObj;
        const result = (await this.app.accessToAPI("record_search", requestConditions )).result;
        result.map(receivedData => new RecordGroupView(this.articleDOM.appendChild(document.createElement("div")),receivedData,this.app.state.scoreType,{
            clickOnCardEventListener: (recordClicked) => 
                this.app.transition("detailView",{
                    gameSystemEnv:{
                        gameModeID: recordClicked.regulation.gameSystemEnvironment.gameModeID,
                        gameSystemID: recordClicked.regulation.gameSystemEnvironment.gameSystemID
                    },
                    lang:this.app.state.language,
                    id:recordClicked.id
                })
        }));
        this.generateLoadingSpinner();
    }
}