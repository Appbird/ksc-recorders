//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。

import { exampleData } from "../test/exampledata";
import { RecordDataBase } from "../DataBase/RecordDataBase";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { ControllerOfTableForResolvingID } from "../DataBase/ControllerOfTableForResolvingID";
import { convertRecordsIntoRecordGroup } from "../RecordConverter/convertRecordsIntoRecordGroup";
import { checkInputObjectWithErrorPossibility } from "../../utility/InputCheckerUtility";

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

export function search(dataInJSON:string):string{
    let sent:IReceivedDataFromServer;
    try {
        const inputData:unknown = JSON.parse(dataInJSON);
        if (!assureInputDataBelongToProperType(inputData)) throw new Error("入力されたデータが正しくありません");
        const requestGroup:IReceivedDataFromClient_AboutRecordExhibition[] = inputData;
        if (!Array.isArray(requestGroup)) throw new Error("与データが配列ではありません。")
        
            const recordGroups = requestGroup.map( (request) => {
                    const recordIDs = database.getRecordIDsWithCondition(
                                        request.gameSystemEnv.gameSystemID,request.orderOfRecordArray,
                                        request.abilityIDsCondition,request.abilityIDs,
                                        request.targetIDs,request.runnerIDs);
                    const records = database.getRecords(request.gameSystemEnv.gameSystemID,recordIDs.slice(request.startOfRecordArray,request.startOfRecordArray + request.limitOfRecordArray))
                
                    return convertRecordsIntoRecordGroup(
                    records , { groupName:request.groupName,
                        numberOfRecords:recordIDs.length ,
                        numberOfRunners:3,
                        lang:request.language
                }); 
                }
            )
            
            sent = {
                isSuccess:true,
                recordGroups:recordGroups
            }

    } catch(e) {
        sent = {
            isSuccess :false,
            recordGroups:undefined,
            message: e
        }
    }
    return JSON.stringify(sent);
}

function assureInputDataBelongToProperType(data:unknown):data is IReceivedDataFromClient_AboutRecordExhibition[]{
    return checkInputObjectWithErrorPossibility(data,checkerObj)
}