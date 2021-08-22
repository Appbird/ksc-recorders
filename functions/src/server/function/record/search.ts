//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { SearchCondition } from "../../../../../src/ts/type/record/SearchCondition";
import { IRecord } from "../../../../../src/ts/type/record/IRecord";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { IReceivedData_recordSearch } from "../../../../../src/ts/type/api/record/relation";
import { OnePlayerOfAbilityAttribute } from "../../../../../src/ts/type/foundation/IRegulation";

export async function search(recordDataBase:RecordDataBase,input:IReceivedData_recordSearch["atServer"]):Promise<IReceivedData_recordSearch["atClient"]>{
    
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase)
    if (input.condition[0].gameSystemEnv.gameDifficultyID !== undefined) input.condition = await prepareForDifficultySearch(cotfr,recordDataBase,input.condition[0])
    //#CTODO ここの結果に、abilityAttributeの検索条件を混ぜ込む。
   
    const result = await Promise.all(
        input.condition.map( async input => {
                 let records = 
                    (await recordDataBase.getRecordsWithCondition(
                            input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.orderOfRecordArray,
                            input.abilityIDsCondition,input.abilityIDs,
                            input.targetIDs,input.runnerIDs,
                            input.searchTypeForVerifiedRecord
                    ))
                

                if (input.abilityAttributeIDs && input.abilityAttributeIDs.some(eachPlayer => eachPlayer.some(eachAbility => eachAbility.onFlagIDs.length !== 0 ))){
                    records = records.filter(record => {
                        const result = record.regulation.abilitiesAttributeIDs?.every((playerAttributes,playerindex) => {
                            if (input.abilityAttributeIDs === undefined) throw new Error("[search] input.abilityAttributeIDs === undefined")
                            const conditionAbilityAttribute = input.abilityAttributeIDs[playerindex]
                            return isOnePlayerOfAbilityAttributesSatisfiedTheCondition(playerAttributes,conditionAbilityAttribute)
                            
                        })
                        if (result === undefined) return false;
                        return result;
                    })
                }
                if (input.tagIDs !== undefined) {
                    records = records.filter(record => input.tagIDs?.every(tagID => record.tagID.includes(tagID)))
                }
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

async function prepareForDifficultySearch(converter:ControllerOfTableForResolvingID,recordDataBase:RecordDataBase,input:SearchCondition):Promise<SearchCondition[]>{
    
    if (input.gameSystemEnv.gameDifficultyID === undefined) throw new Error("予期せぬエラーが発生しました。")
    const gameEnv = input.gameSystemEnv;
    let targetIDs:string[]
    if (input.gameSystemEnv.gameDifficultyID === "whole") targetIDs = (await recordDataBase.getTargetCollection(gameEnv.gameSystemID,gameEnv.gameModeID)).map((ele) => ele.id)
    else targetIDs = (await recordDataBase.getGameDifficultyInfo(gameEnv.gameSystemID,gameEnv.gameModeID,input.gameSystemEnv.gameDifficultyID)).TargetIDsIncludedInTheDifficulty;
    console.info(`[KSSRs] 検索条件にDifficultyIDの指定があるため、この条件は敵の検索 [${targetIDs.join(",")}] に置き換えられます。`)
    const targetNames = await Promise.all(
        targetIDs.map( targetID => converter.resolveTargetID(gameEnv.gameSystemID,gameEnv.gameModeID,targetID,input.language))
    )
    delete input.gameSystemEnv.gameDifficultyID;
    return targetIDs.map( (targetID,index) => {
        return { ...input,
            targetIDs:[targetID],
            groupName:targetNames[index]
        }
    })
}

function isOnePlayerOfAbilityAttributesSatisfiedTheCondition(subject:OnePlayerOfAbilityAttribute,condition:OnePlayerOfAbilityAttribute):boolean{
    return condition.every((conditionOnOneAttribute) => {
        //#NOTE 属性指定なしであれば、制限なしということになる。
        if (conditionOnOneAttribute.onFlagIDs.length === 0) return true;
        const targetAttributeInSubject = subject.find(oneAttributeInSubject => oneAttributeInSubject.attributeID === conditionOnOneAttribute.attributeID)
        if (targetAttributeInSubject === undefined) return true;
        return conditionOnOneAttribute.onFlagIDs.every((conditionFlag,index) => conditionFlag === targetAttributeInSubject?.onFlagIDs[index])
    })
}