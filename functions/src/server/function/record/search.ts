//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
import { SearchCondition } from "../../../../../src/ts/type/record/SearchCondition";
import { IRecord } from "../../../../../src/ts/type/record/IRecord";
import { IReceivedData_recordSearch } from "../../../../../src/ts/type/api/record/relation";
import { OnePlayerOfAbilityAttribute } from "../../../../../src/ts/type/foundation/IRegulation";
import { RecordResolver } from "../../wraper/RecordResolver";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { TargetCollectionController } from "../../firestore/TargetCollectionController";
import { DifficultyCollectionController } from "../../firestore/DifficultyCollectionController";
import { IDResolver } from "../../wraper/IDResolver";

export async function search(input:IReceivedData_recordSearch["atServer"]):Promise<IReceivedData_recordSearch["atClient"]>{
    if (input.condition[0].gameSystemEnv.gameDifficultyID !== undefined) input.condition = await prepareForDifficultySearch(input.condition[0])
    //#CTODO ここの結果に、abilityAttributeの検索条件を混ぜ込む。
    const recordResolvers = new Map<string,RecordResolver>()
    const recordCs = new Map<string,RecordCollectionController>()
    const result = await Promise.all(
        input.condition.map( async input => {
                const ig = input.gameSystemEnv
                const recordC = getRecordCollectionController(recordCs,ig.gameSystemID,ig.gameModeID)
                const recordResolver = getRecordResolver(recordResolvers,ig.gameSystemID,ig.gameModeID)

                 let records = 
                    (await recordC.getWithCondition(
                            input.orderOfRecordArray,
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
                if (input.tagIDs !== undefined) records = records.filter(record => input.tagIDs?.every(tagID => record.tagID.includes(tagID)))
                
                if (input.startOfRecordArray === undefined) input.startOfRecordArray = 0;
                if (input.limitOfRecordArray === undefined) input.limitOfRecordArray = 7;
                
                return recordResolver.convertRecordsIntoRecordGroupResolved(
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

async function prepareForDifficultySearch(input:SearchCondition):Promise<SearchCondition[]>{
    const ig = input.gameSystemEnv
    const targetC = new TargetCollectionController(ig.gameSystemID,ig.gameModeID)
    const targetIDResolver = new IDResolver(targetC)
    const difficultyC = new DifficultyCollectionController(ig.gameSystemID,ig.gameModeID)
    if (ig.gameDifficultyID === undefined) throw new Error("予期せぬエラーが発生しました。")

    let targetIDs:string[] = (input.gameSystemEnv.gameDifficultyID === "whole") 
                                ? (await targetC.getCollection()).map((ele) => ele.id)
                                : (await difficultyC.getInfo(ig.gameDifficultyID)).TargetIDsIncludedInTheDifficulty;

    console.info(`[KSSRs] 検索条件にDifficultyIDの指定があるため、この条件は敵の検索 [${targetIDs.join(",")}] に置き換えられます。`)

    const targetNames = await Promise.all(
        targetIDs.map( targetID => targetIDResolver.resolveForTitle(targetID,input.language))
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
function getRecordResolver(RecordResolvers:Map<string,RecordResolver>,gameSystemID:string,gameModeID:string){
    const key = `${gameSystemID}/${gameModeID}`
    const result = RecordResolvers.get(key)
    if (result === undefined) {
        const inserted = new RecordResolver(gameSystemID,gameModeID)
        RecordResolvers.set(key,inserted)
        return inserted
    }
    return result;
}
function getRecordCollectionController(RecordResolvers:Map<string,RecordCollectionController>,gameSystemID:string,gameModeID:string){
    const key = `${gameSystemID}/${gameModeID}`
    const result = RecordResolvers.get(key)
    if (result === undefined) {
        const inserted = new RecordCollectionController(gameSystemID,gameModeID)
        RecordResolvers.set(key,inserted)
        return inserted
    }
    return result;
}