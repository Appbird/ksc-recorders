import { RecordDataBase } from "./RecordDataBase";

export type LanguageInApplication = "Japanese" | "English";

/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
export class ControllerOfTableForResolvingID{
    private dataBase: RecordDataBase;
    constructor(database:RecordDataBase){
        this.dataBase = database;
    }

    private resolveID(id:number, table: IItemOfResolveTableToName[],lang:LanguageInApplication,descriptionOfPlace:string = ""){
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
        return this.resolveID(id,this.dataBase.gameSystemList,lang,"GameSystem");
    }

    private findProperGameSystemInfo(gameSystemID:number){
        const result = this.dataBase.getGameSystemInfo(gameSystemID);
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
        return this.resolveID(id,this.dataBase.runnersList,lang,"runnersTable");
    }
}
export interface IItemOfResolveTableToName{
    id:number;
    JName:string;
    EName:string;
}