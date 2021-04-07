//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { recordDataBase } from "../../tmpDataBase/RecordDataBase";
import {IReceivedDataAtServer_recordSearch, IReceivedDataAtClient_recordSearch } from "../../../type/transmission/record/IReceivedData_recordSearch";
import { convertRecordsIntoRecordGroup } from "../../recordConverter/convertRecordsIntoRecordGroup";
import { IRecord } from "../../../type/record/IRecord";

export async function search(input:IReceivedDataAtServer_recordSearch):Promise<IReceivedDataAtClient_recordSearch>{
    const records = await recordDataBase.getRecordsWithCondition(
                                        input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.orderOfRecordArray,
                                        input.abilityIDsCondition,input.abilityIDs,
                                        input.targetIDs,input.runnerIDs);
                    
           
    const record = await convertRecordsIntoRecordGroup(
                    records.slice(input.startOfRecordArray,input.limitOfRecordArray) , { 
                        groupName: input.groupName,
                        numberOfRecords: records.length,
                        numberOfRunners: countRunners(records),
                        lang:input.language
                    }); 
            
                
    return {
        isSucceeded:true,
        result:record
    }
}

function countRunners(record:IRecord[]):number{
    return new Set(record.map((element) => element.runnerID)).size
}