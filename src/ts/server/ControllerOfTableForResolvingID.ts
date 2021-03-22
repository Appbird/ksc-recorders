import * as fs from "fs";
import { IRecordDataBase } from "./IRecordDataBase";

export type LanguageInApplication = "Japanese" | "English";

/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
class ControllerOfTableForResolvingID{
    private dataBase: IRecordDataBase;
    constructor(){
        this.dataBase = JSON.parse(fs.readFileSync("exampleData.json",{encoding:"utf8"}));
    }

    resolveID(id:number, table: IItemOfResolveTableToName[],lang:LanguageInApplication,descriptionOfPlace:string = ""){
        const item = table.find(
            (element) =>  element.id === id
        )
        if (item === undefined) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }

    resolveGameSystemID(id:number,lang:LanguageInApplication){
        return this.resolveID(id,this.dataBase.runnersTable,lang,"GameSystem");
    }

    private findProperGameSystemInfo(gameSystemID:number){
        const result = this.dataBase.gameSystemInfo.find( (ele) => ele.id === gameSystemID);
        if (result === undefined) throw new Error(`指定した作品ID${gameSystemID}に該当する作品は存在しません。`)
        return result;
    }
    
    resolveAbilityID(gameSystemID:number,id:number,lang:LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.AbilityList,lang,"Ability");
    }
    resolveTargetID(gameSystemID:number,id:number,lang:LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.TargetList,lang,"Target");
    }
    resolveGameDifficultyID(gameSystemID:number,id:number,lang:LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.GameDifficultyList,lang,"GameDifficulty");
    }
    resolveGameModeID(gameSystemID:number,id:number,lang:LanguageInApplication){
        return this.resolveID(id,this.findProperGameSystemInfo(gameSystemID).list.GameModeList,lang,"GameMode");
    }
    resolveRunnerID(id:number,lang:LanguageInApplication):string{
        return this.resolveID(id,this.dataBase.runnersTable,lang,"runnersTable");
    }
}

export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID();



export interface IItemOfResolveTableToName{
    id:number;
    JName:string;
    EName:string;
}