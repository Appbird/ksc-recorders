import { IRecord } from "../../type/record/IRecord";
import { checkEqualityBetweenArrays } from "../../utility/arrayUtility";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";
import { exampleData } from "../test/exampledata";
import { IRecordDataBase } from "../type/IRecordDataBase";
import { checkIsUndefined } from "../../utility/undefinedChecker";
import { InterfaceOfRecordDatabase } from "../type/InterfaceOfRecordDatabase";

export class RecordDataBase implements InterfaceOfRecordDatabase{
    private dataBase:IRecordDataBase;
    constructor(){
        this.dataBase = exampleData;
    }
    

    async getGameSystemCollection(){
        return this.dataBase.gameSystemInfo
    }
    async getGameSystemInfo(gameSystemID:string){
        return checkIsUndefined(this.dataBase.gameSystemInfo.find(item => item.id === gameSystemID),`指定されたID${gameSystemID}に対応するシリーズのゲームが存在しません。`)
    }


    async getGameModeCollection(gameSystemID:string){
        return (await this.getGameSystemInfo(gameSystemID)).modes
    }
    async getGameModeInfo(gameSystemID:string,gameModeID:string){
        return checkIsUndefined((await this.getGameSystemInfo(gameSystemID)).modes.find(item => item.id === gameModeID),`指定されたID${gameSystemID}に対応するモードが、シリーズのゲーム(ID:${gameSystemID})に存在しません。`)
    }


    async getRunnerCollection(){
        return this.dataBase.runnersTable
    }
    async getRunnerInfo(id:string){
        return checkIsUndefined(this.dataBase.runnersTable.find(item => item.id === id),`指定されたID${id}に対応する走者は存在しません。`)
    }


    async getTargetCollection(gameSystemID:string,gameModeID:string){
        return (await this.getGameModeInfo(gameSystemID,gameModeID)).targets
    }
    async getTargetInfo(gameSystemID:string,gameModeID:string,id:string){
        return checkIsUndefined((await this.getGameModeInfo(gameSystemID,gameModeID)).targets.find(item => item.id === id),`ゲームモード${gameSystemID}/${gameModeID}における指定されたID${id}に対応する計測対象は存在しません。`)
    }


    async getAbilityCollection(gameSystemID:string,gameModeID:string){
        return (await this.getGameModeInfo(gameSystemID,gameModeID)).abilities
    }
    async getAbilityInfo(gameSystemID:string,gameModeID:string,id:string){
        return checkIsUndefined((await this.getGameModeInfo(gameSystemID,gameModeID)).abilities.find(item => item.id === id),`ゲームモード${gameSystemID}/${gameModeID}における指定されたID${id}に対応する能力は存在しません。`)
    }


    async getGameDifficultyCollection(gameSystemID:string,gameModeID:string){
        return (await this.getGameModeInfo(gameSystemID,gameModeID)).difficulties
    }
    async getGameDifficultyInfo(gameSystemID:string,gameModeID:string,id:string){
        return checkIsUndefined((await this.getGameModeInfo(gameSystemID,gameModeID)).difficulties.find(item => item.id === id),`ゲームモード${gameSystemID}/${gameModeID}における指定されたID${id}に対応する難易度は存在しません。`)
    }


    async getHashTagCollection(gameSystemID:string){
        return (await this.getGameSystemInfo(gameSystemID)).tags
    }
    async getHashTagInfo(gameSystemID:string,id:string){
        return checkIsUndefined((await this.getGameSystemInfo(gameSystemID)).tags.find(item => item.id === id),`ゲーム${gameSystemID}における指定されたID${id}に対応するハッシュタグは存在しません。`)
    }

    async getRecord(gameSystemID:string,gameModeID:string,recordID:string){
    //[x] 与えられた条件に適した記録を記録を一つ返す。
        const result = (await this.getGameModeInfo(gameSystemID,gameModeID)).records.find( (item) => item.id === recordID);
        if (result === undefined) throw new Error(`ゲームシステムID${gameSystemID}の記録データベースに、指定されたID${recordID}に対する記録が存在しません。`)
        return result;
    }

    async getRecordsWithCondition(gameSystemID:string,gameModeID:string,
                            order:OrderOfRecordArray ,
                            abilityIDsCondition: "AND" | "OR" | "AllowForOrder" = "AllowForOrder",
                            abilityIDs:string[] = [],
                            targetIDs:string[] = [],
                            runnerIDs:string[] = [],
    ):Promise<IRecord[]>{
    //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
    
    let records = (await this.getGameModeInfo(gameSystemID,gameModeID)).records;
        
        records = records.filter(
            (record) => 
                ((targetIDs.length === 0 || targetIDs.length ) ? true : targetIDs.some( (id) => id === record.regulation.targetID ) ) &&
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
                return abilityIDs.every( id => record.regulation.abilityIDs.includes(id));
            case "OR":
                return abilityIDs.some( id => record.regulation.abilityIDs.includes(id));
            case "AllowForOrder":
                return checkEqualityBetweenArrays(record.regulation.abilityIDs,abilityIDs);
        }
    }
    

}

//#NOTE シングルトン
export const recordDataBase = new RecordDataBase();
