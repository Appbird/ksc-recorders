//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { recordDataBase } from "../tmpDataBase/RecordDataBase";

import { IReceivedDataAtServer_recordSearch,checker } from "../../type/transmission/recordSearch/IReceivedDataAtServer_recordSearch";
import { IReceivedDataAtClient_recordSearch } from "../../type/transmission/recordSearch/IReceivedDataAtClient_recordSearch";
import { convertRecordsIntoRecordGroup } from "../recordConverter/convertRecordsIntoRecordGroup";
import { checkInputObjectWithErrorPossibility } from "../../utility/InputCheckerUtility";
import { IRecord } from "../../type/record/IRecord";

export async function search(dataInJSON:string):Promise<IReceivedDataAtClient_recordSearch>{
    let sent:IReceivedDataAtClient_recordSearch;
    try {
        const requestGroup:unknown = JSON.parse(dataInJSON);
        if (!Array.isArray(requestGroup)) throw new Error("与データが配列ではありません。")
        if (!checkInputObjectWithErrorPossibility<IReceivedDataAtServer_recordSearch[]>(requestGroup,[checker],`data`)) throw new Error("入力されたデータが正しくありません");
        
            const recordGroups = await Promise.all(requestGroup.map( async (request) => {
                    const records = await recordDataBase.getRecordsWithCondition(
                                        request.gameSystemEnv.gameSystemID,request.gameSystemEnv.gameModeID,request.orderOfRecordArray,
                                        request.abilityIDsCondition,request.abilityIDs,
                                        request.targetIDs,request.runnerIDs);
                    
                    return convertRecordsIntoRecordGroup(
                    records.slice(request.startOfRecordArray,request.limitOfRecordArray) , { 
                        groupName: request.groupName,
                        numberOfRecords: records.length,
                        numberOfRunners: countRunners(records),
                        lang:request.language
                    }); 
                }
            ))
            
            sent = {
                isSuccess:true,
                recordGroups:recordGroups
            }

    } catch(reason) {
        
        console.error(`\u001b[31m${reason}\u001b[0m`);
        sent = {
            isSuccess : false,
            message: String(reason)
        }
    }
    return sent;
}

function countRunners(record:IRecord[]):number{
    return new Set(record.map((element) => element.runnerID)).size
}