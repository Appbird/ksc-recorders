import { APIFunctions } from "../../../type/api/relation";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SearchResult 
    extends PageStateBaseClass<APIFunctions["record_search"]["atServer"],IAppUsedToReadAndChangeOnlyPageState>{
    async init(){
        const requestConditions = this.requiredObj;
        const result = (await this.app.accessToAPI("record_search", requestConditions )).result;
        result.map(receivedData => this.articleDOM.appendChild(new RecordGroupView(receivedData, this.app).htmlElement));
    }
}