import { IRecord } from "../../type/record/IRecord";
import { checkEqualityBetweenArrays } from "../../utility/arrayUtility";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";
import { exampleData } from "../test/exampledata";
import { IRecordDataBase } from "../type/IRecordDataBase";
import { checkIsUndefined } from "../../utility/undefinedChecker";

//[x] getRecordsWithConditionメソッドの実装
export class RecordDataBase{
    private dataBase:IRecordDataBase;
    constructor(){
        this.dataBase = exampleData;
    }
    /** @deprecated これをDataBaseを利用する側で使うと仮データベースと実データベースとの整合が取れなくなるので注意 */
    get runnersList(){
        return this.dataBase.runnersTable;
    }
    /** @deprecated これをDataBaseを利用する側で使うと仮データベースと実データベースとの整合が取れなくなるので注意 */
    get gameSystemList(){
        return this.dataBase.gameSystemInfo;
    }
    async getGameModeInfo(gameSystemID:string,gameModeID:string){
        const gameMode = (await this.getGameSystemInfo(gameSystemID)).modes.find(item => item.id === gameModeID);
        return checkIsUndefined(gameMode,`指定されたID${gameSystemID}に対応するモードが、シリーズのゲーム(ID:${gameSystemID})に存在しません。`)
    }
    async getGameSystemInfo(gameSystemID:string){
        return checkIsUndefined(this.dataBase.gameSystemInfo.find(item => item.id === gameSystemID),`指定されたID${gameSystemID}に対応するシリーズのゲームが存在しません。`)
    }
    async getRecord(gameSystemID:string,gameModeID:string,recordID:string){
    //[x] 与えられた条件に適した記録を記録を一つ返す。
        const result = (await this.getGameModeInfo(gameSystemID,gameModeID)).records.find( (item) => item.id === recordID);
        if (result === undefined) throw new Error(`ゲームシステムID${gameSystemID}の記録データベースに、指定されたID${recordID}に対する記録が存在しません。`)
        return result;
    }

    async getRecordsWithCondition(gameSystemID:string,gameModeID:string,
                            order:OrderOfRecordArray ,
                            abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
                            abilityIDs:string[] = [],
                            targetIDs:string[] = [],
                            runnerIDs:string[] = [],
    ):Promise<IRecord[]>{
    //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
    
    let records = (await this.getGameModeInfo(gameSystemID,gameModeID)).records;
        
        records = records.filter(
            (record) => 
                ((targetIDs.length === 0) ? true : targetIDs.some( (id) => id === record.regulation.targetID ) ) &&
                ((abilityIDs.length === 0) ? true : this.ifRecordIncludeThatAbilityIDs(record,abilityIDsCondition,abilityIDs) ) &&
                ((runnerIDs.length === 0) ? true : runnerIDs.some( (id) => id === record.runnerID) )
        ).sort(
            (a,b) => {
                switch(order){
                    case "HigherFirst": return b.score - a.score;
                    case "LowerFirst" : return a.score - b.score;
                    //[x] ここの実装を、timestampをもとにしたものにする。
                    case "LaterFirst": return b.timestamp - a.timestamp;
                    case "EarlierFirst": return a.timestamp - b.timestamp;
                    default : return 0;
                }
            }
        )
        return records;
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
    

}