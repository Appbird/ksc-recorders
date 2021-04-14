//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { IReceivedDataAtServer_recordSearch } from "../../../type/transmission/record/IReceivedDataAtServer_recordSearch";
import { IReceivedDataAtClient_recordSearch } from "../../../type/transmission/record/IReceivedDataAtClient_recordSearch";
import { SearchCondition } from "../../../type/record/SearchCondition";
import { IRecord } from "../../../type/record/IRecord";
import clone from "clone-deep";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { InterfaceOfRecordDatabase } from "../../type/InterfaceOfRecordDatabase";
import { IReceivedData_recordSearch } from "../../../type/transmission/record/relation";
export async function search(recordDataBase:InterfaceOfRecordDatabase,input:IReceivedData_recordSearch["atServer"]):Promise<IReceivedData_recordSearch["atClient"]>{
    
    if (input.condition[0].gameSystemEnv.gameDifficultyID !== undefined) input.condition = await prepareForDifficultySearch(recordDataBase,input.condition[0])
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase)

    const result = await Promise.all(
        input.condition.map( async input => {
                 const records = 
                    (await recordDataBase.getRecordsWithCondition(
                            input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.orderOfRecordArray,
                            input.abilityIDsCondition,input.abilityIDs,
                            input.targetIDs,input.runnerIDs))

                if (input.startOfRecordArray === undefined) input.startOfRecordArray = 0;
                if (input.limitOfRecordArray === undefined) input.limitOfRecordArray = 7;
                
                return cotfr.convertRecordsIntoRecordGroupResolved(
                        records.slice(input.startOfRecordArray,input.limitOfRecordArray) , { groupName: input.groupName, numberOfRecords: records.length, numberOfRunners: countRunners(records), lang:input.language}
                    ); 
                 }
            )
        )
    return {
        isSucceeded:true,
        result:result
    }
}

function countRunners(record:IRecord[]):number{
    return new Set(record.map((element) => element.runnerID)).size
}

async function prepareForDifficultySearch(recordDataBase:InterfaceOfRecordDatabase,input:SearchCondition):Promise<SearchCondition[]>{
    
    const converter = new ControllerOfTableForResolvingID(recordDataBase)
    
    if (input.gameSystemEnv.gameDifficultyID === undefined) throw new Error("予期せぬエラーが発生しました。")
    const gameEnv = input.gameSystemEnv;
    const targetIDs:string[] = (await recordDataBase.getGameDifficultyInfo(gameEnv.gameSystemID,gameEnv.gameModeID,input.gameSystemEnv.gameDifficultyID)).TargetIDsIncludedInTheDifficulty;
    const targetNames = await Promise.all(
        targetIDs.map( targetID => converter.resolveTargetID(gameEnv.gameSystemID,gameEnv.gameModeID,targetID,input.language))
    )
    input.gameSystemEnv.gameDifficultyID = undefined;
    return targetIDs.map( (targetID,index) => {
        const result = clone(input);
            result.targetIDs = [targetID]
            result.groupName = targetNames[index]
        return result;
    })
}