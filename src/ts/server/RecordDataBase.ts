import * as fs from "fs";
import { IGameSystemEnvironment } from "../type/foundation/IGameSystemEnvironment";
import { IRecord } from "../type/record/IRecord";
import { IRunner } from "../type/record/IRunner";
import { IItemOfResolveTableToName } from "./ControllerOfTableForResolvingID";

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
    //#CTODO 与えられた条件に適した記録を記録を一つ返す。
        const result = this.getGameSystemInfo(gameSystemID).records.find( (item) => item.recordID === recordID);
        if (result === undefined) throw new Error(`ゲームシステムID${gameSystemID}の記録データベースに、指定されたID${recordID}に対する記録が存在しません。`)
        return result;
    }

    getRecordsWithCondition(gameSystemID:number, 
                            order: "HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst" ,
                            start:number = 0,limit:number = 10,
                            abilityIDsCondition: "AND" | "OR",
                            abilityIDs?:number[],
                            targetIDs?:number[],
                            runnerIDs?:number[]
    ):IRecord[]{
    //#CTODO undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        if (limit < 0 && start < 0) throw new Error(`検索条件に矛盾があります。(start:${start} end:${limit})`)
        const records = this.getGameSystemInfo(gameSystemID).records;
        return records.filter(
            (record) => 
                ((targetIDs === undefined) ? true : targetIDs.some( (id) => id === record.regulation.targetID) ) &&
                ((abilityIDs === undefined) ? true : this.ifRecordIncludeThatAbilityIDs(record,abilityIDsCondition,abilityIDs) ) &&
                ((runnerIDs === undefined) ? true : runnerIDs.some( (id) => id === record.runnerID) )
        ).sort(
            (a,b) => {
                switch(order){
                    case "HigherFirst": return a.score - b.score;
                    case "LowerFirst" : return b.score - a.score;
                    case "LaterFirst": return -1;
                    case "EarlierFirst": return 1;
                }
            }
        ).filter(
            (ele,index) => start <= index && index < start + limit 
        )

    }
    private ifRecordIncludeThatAbilityIDs(record:IRecord,abilityIDsCondition: "AND" | "OR", abilityIDs:number[]):boolean{
        if (abilityIDsCondition === "AND"){
            return abilityIDs.every( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));
        }else { return abilityIDs.some( id => record.regulation.abilityIDsOfPlayerCharacters.includes(id));}
    }

    getRecords(gameSystemID:number,recordIDs:number[]):IRecord[]{
        return this.getGameSystemInfo(gameSystemID).records.filter(
            (record) => recordIDs.includes(record.recordID)
        )
    }


}

export interface IRecordDataBase{
    runnersTable: IRunner[];
    gameSystemInfo: IGameSystemInfo[];
}
export interface IGameSystemInfo extends IItemOfResolveTableToName{
    id:number;
    JName:string;
    EName:string;
    JDescription?: string;
    EDescription?: string;
    list : UniqueResolveTableToGameSystem;
    records:IRecord[];
}
/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 */
export interface UniqueResolveTableToGameSystem {
    AbilityList : AbilityList[];
    
    TargetList : TargetList[];
    GameModeList : GameModeList[];
    //#NOTE ターゲットについてはID解決テーブルという目的以上に難易度に所属するターゲットを示す目的もあることに注意
    GameDifficultyList : GameDifficultyList[];
}
export interface AbilityList extends IItemOfResolveTableToName{
}
export interface TargetList extends IItemOfResolveTableToName{
}
export interface GameModeList extends IItemOfResolveTableToName{
    JDescription?: string
    EDescription?: string
}
export interface GameDifficultyList extends IItemOfResolveTableToName{
    IDsOfTargetIncludedInTheDifficulty?:number[]
}