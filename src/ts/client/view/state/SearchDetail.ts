import { APIFunctions } from "../../../type/api/relation";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { RecordDetailView } from "../parts/RecordDetailView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SearchDetail
    extends PageStateBaseClass<APIFunctions["record_detail"]["atServer"],IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
            const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "related" }));
            const record = (await this.app.accessToAPI("record_detail",this.requiredObj)).result;
    
            const relatedRecord = (await this.app.accessToAPI(
                    "record_search", {
                        condition: [{
                            groupName: "同レギュレーションの記録", gameSystemEnv: { gameSystemID: record.regulation.gameSystemEnvironment.gameSystemID, gameModeID: record.regulation.gameSystemEnvironment.gameModeID }, orderOfRecordArray: "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                            targetIDs: [record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", language: this.requiredObj.lang
                        }]
                        
                }        )).result[0];
    
            let rank: number | undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1;
            detailDiv.appendChild(new RecordDetailView(record, this.app, rank).htmlElement);
            relatedRecordDiv.appendChild(new RecordGroupView(relatedRecord, this.app).htmlElement);
        
        }
}