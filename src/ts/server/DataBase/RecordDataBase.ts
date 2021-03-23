import * as fs from "fs";
import { IRecord } from "../../type/record/IRecord";
import { checkEqualityBetweenArrays } from "../../utility/arrayUtility";
import { IGameSystemInfo } from "../type/IGameSystemInfo";
import { IRecordDataBase } from "../type/IRecordDataBase";

export type OrderOfRecordArray = "HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"


export class RecordDataBase{
    private dataBase:IRecordDataBase;
    constructor(data?:IRecordDataBase){
        this.dataBase = (data === undefined) ? JSON.parse(fs.readFileSync("exampleData.json",{encoding:"utf8"})): data;
    }
    get runnersList(){
        return this.dataBase.runnersTable;
    }
    get gameSystemList(){
        return this.dataBase.runnersTable;
    }
    getGameSystemInfo(gameSystemID:number):IGameSystemInfo{
        const result = this.dataBase.gameSystemInfo.find(item => item.id === gameSystemID);
        if (result === undefined) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result;
    }
    
    getRecord(gameSystemID:number,recordID:number):IRecord{
    //[x] 与えられた条件に適した記録を記録を一つ返す。
        const result = this.getGameSystemInfo(gameSystemID).records.find( (item) => item.recordID === recordID);
        if (result === undefined) throw new Error(`ゲームシステムID${gameSystemID}の記録データベースに、指定されたID${recordID}に対する記録が存在しません。`)
        return result;
    }

    getRecordIDsWithCondition(gameSystemID:number, 
                            order:OrderOfRecordArray ,
                            abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
                            abilityIDs:number[] = [],
                            targetIDs:number[] = [],
                            runnerIDs:number[] = []
    ):number[]{
    //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        const records = this.getGameSystemInfo(gameSystemID).records;
        
        return records.filter(
            (record) => 
                ((targetIDs.length === 0) ? true : targetIDs.some( (id) => id === record.regulation.targetID ) ) &&
                ((abilityIDs.length === 0) ? true : this.ifRecordIncludeThatAbilityIDs(record,abilityIDsCondition,abilityIDs) ) &&
                ((runnerIDs.length === 0) ? true : runnerIDs.some( (id) => id === record.runnerID) )
        ).sort(
            (a,b) => {
                switch(order){
                    case "HigherFirst": return b.score - a.score;
                    case "LowerFirst" : return a.score - b.score;
                    case "LaterFirst": return -1;
                    case "EarlierFirst": return 1;
                }
            }
        ).map( (record) => record.recordID);

    }
    private ifRecordIncludeThatAbilityIDs(record:IRecord,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:number[]):boolean{
        switch(abilityIDsCondition){
            case "AND":
                return abilityIDs.every( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));
            case "OR":
                return abilityIDs.some( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));
            case "AllowForOrder":
                return checkEqualityBetweenArrays(record.regulation.abilityIDsOfPlayerCharacters,abilityIDs);
        }
    }

    getRecords(gameSystemID:number,recordIDs:number[]):IRecord[]{
        return this.getGameSystemInfo(gameSystemID).records.filter(
            (record) => recordIDs.includes(record.recordID)
        )
    }

}

