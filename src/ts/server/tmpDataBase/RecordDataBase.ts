import * as fs from "fs";
import { IRecord } from "../../type/record/IRecord";
import { checkEqualityBetweenArrays } from "../../utility/arrayUtility";
import { exampleData } from "../test/exampledata";
import { IRecordDataBase } from "../type/IRecordDataBase";

export type OrderOfRecordArray = "HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"
interface IRecordsArrayWithInfo{
    records: IRecord[],
    numberOfRecords: number,
    numberOfRunners: number
}
//[-] getRecordsWithConditionメソッドの実装
export class RecordDataBase{
    private dataBase:IRecordDataBase;
    constructor(){
        this.dataBase = exampleData;
    }
    get runnersList(){
        return this.dataBase.runnersTable;
    }
    get gameSystemList(){
        return this.dataBase.gameSystemInfo;
    }
    async getGameSystemInfo(gameSystemID:string){
        const result = this.dataBase.gameSystemInfo.find(item => item.id === gameSystemID);
        if (result === undefined) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result;
    }
    
    async getRecord(gameSystemID:string,recordID:string){
    //[x] 与えられた条件に適した記録を記録を一つ返す。
        const result = (await this.getGameSystemInfo(gameSystemID)).records.find( (item) => item.id === recordID);
        if (result === undefined) throw new Error(`ゲームシステムID${gameSystemID}の記録データベースに、指定されたID${recordID}に対する記録が存在しません。`)
        return result;
    }

    //#[-] この関数を、一つのオブジェクトだけを引数に取りたい。直接サーバーへのリクエストを引数にとったほうが良いかも。
    async getRecordsAndInfoWithCondition(gameSystemID:string, 
                            order:OrderOfRecordArray ,
                            abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
                            abilityIDs:string[] = [],
                            targetIDs:string[] = [],
                            runnerIDs:string[] = [],
                            limits:number = 10 //#README
    ):Promise<IRecordsArrayWithInfo>{
    //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
    
    const records = (await this.getGameSystemInfo(gameSystemID)).records;
        
        records.filter(
            (record) => 
                ((targetIDs.length === 0) ? true : targetIDs.some( (id) => id === record.regulation.targetID ) ) &&
                ((abilityIDs.length === 0) ? true : this.ifRecordIncludeThatAbilityIDs(record,abilityIDsCondition,abilityIDs) ) &&
                ((runnerIDs.length === 0) ? true : runnerIDs.some( (id) => id === record.runnerID) )
        ).sort(
            (a,b) => {
                switch(order){
                    case "HigherFirst": return b.score - a.score;
                    case "LowerFirst" : return a.score - b.score;
                    case "LaterFirst": return -1; //[-] ここの実装を、timestampをもとにしたものにする。
                    case "EarlierFirst": return 1;
                }
            }
        )
        return {
            //[-] ここのエラーを修正する。
        }
        

    }
    private ifRecordIncludeThatAbilityIDs(record:IRecord,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:string[]):boolean{
        switch(abilityIDsCondition){
            case "AND":
                return abilityIDs.every( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));
            case "OR":
                return abilityIDs.some( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));
            case "AllowForOrder":
                return checkEqualityBetweenArrays(record.regulation.abilityIDsOfPlayerCharacters,abilityIDs);
        }
    }
    private countRunner(record:IRecord[]):number{
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

}