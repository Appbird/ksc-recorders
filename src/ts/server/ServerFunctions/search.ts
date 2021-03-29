//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { RecordDataBase } from "../tmpDataBase/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../tmpDataBase/ControllerOfTableForResolvingID";

import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { convertRecordsIntoRecordGroup } from "../recordConverter/convertRecordsIntoRecordGroup";
import { checkInputObjectWithErrorPossibility } from "../../utility/InputCheckerUtility";
import { IRecord } from "../../type/record/IRecord";

const database = new RecordDataBase();
const checkerObj = {
    groupName:"string",
    gameSystemEnv:{
        gameSystemID: "string",
        gameModeID: "string",
        gameDifficultyID: "string",
    },
    orderOfRecordArray:`"HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"`,
    startOfRecordArray:"string",
    limitOfRecordArray:"string",
    targetIDs:"string[]",
    abilityIDs:"string[]",
    abilityIDsCondition: `"AND" | "OR" | "AllowForOrder"`,
    runnerIDs:"string[]",
    language:`"Japanese" | "English"`
}
export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID(database);

export async function search(dataInJSON:string):Promise<IReceivedDataFromServer>{
    let sent:IReceivedDataFromServer;
    try {
        const requestGroup:unknown = JSON.parse(dataInJSON);
        if (!Array.isArray(requestGroup)) throw new Error("与データが配列ではありません。")
        if (!assureInputDataBelongToProperType(requestGroup)) throw new Error("入力されたデータが正しくありません");
        
            const recordGroups = await Promise.all(requestGroup.map( async (request) => {
                    const records = await database.getRecordsWithCondition(
                                        request.gameSystemEnv.gameSystemID,request.orderOfRecordArray,
                                        request.abilityIDsCondition,request.abilityIDs,
                                        request.targetIDs,request.runnerIDs);
                    
                    return convertRecordsIntoRecordGroup(
                    records.slice(request.startOfRecordArray,request.limitOfRecordArray) , { 
                        groupName: request.groupName,
                        numberOfRecords: records.length ,
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

function assureInputDataBelongToProperType(data:unknown[]):data is IReceivedDataFromClient_AboutRecordExhibition[]{
    for (const unit of data)checkInputObjectWithErrorPossibility(unit,checkerObj,`data`)
    return true;
}
function countRunners(record:IRecord[]):number{
    const runnerIDs:string[] = record.map((element) => element.runnerID);
    runnerIDs.sort()
    let note:string = "";
    let result = 0;
    for (const element of runnerIDs){
        if (note === element) continue;
        result++; note = element;
    }
    return result;
}