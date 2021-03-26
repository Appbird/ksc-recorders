//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。

import { exampleData } from "./exampledata";
import { RecordDataBase } from "../DataBase/RecordDataBase";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { ControllerOfTableForResolvingID } from "../DataBase/ControllerOfTableForResolvingID";
import { convertRecordsIntoRecordGroup } from "../RecordConverter/convertRecordsIntoRecordGroup";

const database = new RecordDataBase(exampleData);
export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID(database);

function process(dataInJSON:string):string{
    const requestGroup:IReceivedDataFromClient_AboutRecordExhibition[] = JSON.parse(dataInJSON);
    
    let sent:IReceivedDataFromServer;
    try {
        const recordGroups = requestGroup.map( (request) => {
                const recordIDs = database.getRecordIDsWithCondition(
                                    request.gameSystemEnv.gameSystemID,request.orderOfRecordArray,
                                    request.abilityIDsCondition,request.abilityIDs,
                                    request.targetIDs,request.runnerIDs);
                const records = database.getRecords(request.gameSystemEnv.gameSystemID,recordIDs.slice(request.startOfRecordArray,request.startOfRecordArray + request.limitOfRecordArray))
            
                return convertRecordsIntoRecordGroup(
                records , { groupName:request.groupName,
                    numberOfRecords:recordIDs.length ,
                    numberOfRunners:NaN,
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

