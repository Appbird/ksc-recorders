//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。

import { exampleData } from "../test/exampledata";
import { RecordDataBase } from "../DataBase/RecordDataBase";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { ControllerOfTableForResolvingID } from "../DataBase/ControllerOfTableForResolvingID";
import { convertRecordsIntoRecordGroup } from "../RecordConverter/convertRecordsIntoRecordGroup";
import { checkInputObjectWithErrorPossibility } from "../../utility/InputCheckerUtility";
import { IRecord } from "../../type/record/IRecord";

const database = new RecordDataBase(exampleData);
const checkerObj = {
    groupName:"string",
    gameSystemEnv:{
        gameSystemID: "number",
        gameModeID: "number",
        gameDifficultyID: "number",
    },
    orderOfRecordArray:`"HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"`,
    startOfRecordArray:"number",
    limitOfRecordArray:"number",
    targetIDs:"number[]",
    abilityIDs:"number[]",
    abilityIDsCondition: `"AND" | "OR" | "AllowForOrder"`,
    runnerIDs:"number[]",
    language:`"Japanese" | "English"`
}
export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID(database);

export function search(dataInJSON:string):IReceivedDataFromServer{
    let sent:IReceivedDataFromServer;
    try {
        const requestGroup:unknown = JSON.parse(dataInJSON);
        if (!Array.isArray(requestGroup)) throw new Error("与データが配列ではありません。")
        if (!assureInputDataBelongToProperType(requestGroup)) throw new Error("入力されたデータが正しくありません");
        
            const recordGroups = requestGroup.map( (request) => {
                    const recordIDs = database.getRecordIDsWithCondition(
                                        request.gameSystemEnv.gameSystemID,request.orderOfRecordArray,
                                        request.abilityIDsCondition,request.abilityIDs,
                                        request.targetIDs,request.runnerIDs);
                    const records = database.getRecords(request.gameSystemEnv.gameSystemID,recordIDs.slice(request.startOfRecordArray,request.startOfRecordArray + request.limitOfRecordArray))
                    
                    return convertRecordsIntoRecordGroup(
                    records , { groupName:request.groupName,
                        numberOfRecords:recordIDs.length ,
                        numberOfRunners: countRunner(database.getRecords(request.gameSystemEnv.gameSystemID,recordIDs)),
                        lang:request.language
                    }); 
                }
            )
            
            sent = {
                isSuccess:true,
                recordGroups:recordGroups
            }

    } catch(reason) {
        
        console.error(`\u001b[31m${reason}\u001b[0m`);
        sent = {
            isSuccess :false,
            message: String(reason)
        }
    }
    return sent;
}

function countRunner(record:IRecord[]):number{
    const copy:IRecord[] = record.concat();
    copy.sort(
        (a,b) => a.runnerID - b.runnerID
    )
    let note = -1;
    let result = 0;
    for (const element of copy){
        if (note === element.runnerID) continue;
        result++; note=element.runnerID;
    }
    return result;
}

function assureInputDataBelongToProperType(data:unknown[]):data is IReceivedDataFromClient_AboutRecordExhibition[]{
    for (const unit of data)checkInputObjectWithErrorPossibility(unit,checkerObj,`data`)
    return true;
}