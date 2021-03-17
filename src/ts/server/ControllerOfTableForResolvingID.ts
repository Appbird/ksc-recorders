import * as fs from "fs";
import { IRecordDataBase } from "./RecordDataBase";
/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
class ControllerOfTableForResolvingID{
    private dataBase: IRecordDataBase;
    constructor(){
        this.dataBase = JSON.parse(fs.readFileSync("exampleData.json",{encoding:"utf8"}));
    }
    resolveID(id:number, table: IItemOfResolveTableToName[],lang:keyof LanguageInApplication,descriptionOfPlace:string = ""){
        const item = table.find(
            (element) =>  element.id === id
        )
        if (item === undefined) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }
    resolveGameSystemID(id:number,lang:keyof LanguageInApplication){
        return this.resolveID(id,this.dataBase.runnersTable,lang,"GameSystem");
    }
    private findProperGameSystemInfo(gameSystemID:number){
        const result = this.dataBase.gameSystemInfo.find( (ele) => ele.id === gameSystemID);
        if (result === undefined) throw new Error(`指定した作品ID${gameSystemID}に該当する作品は存在しません。`)
        return result;
    }
    getAbilityTable(gameSystemID:number,id:number,lang:keyof LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.AbilityList,lang,"Ability");
    }
    getTargetTable(gameSystemID:number,id:number,lang:keyof LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.TargetList,lang,"Target");
    }
    getGameDifficultyTable(gameSystemID:number,id:number,lang:keyof LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.GameDifficultyList,lang,"GameDifficulty");
    }
    getGameModeTable(gameSystemID:number,id:number,lang:keyof LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.GameModeList,lang,"GameMode");
    }
}

export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID();



export interface LanguageInApplication{
    Japanese:string;
    English:string
}
export interface IItemOfResolveTableToName{
    id:number;
    JName:string;
    EName:string;
}