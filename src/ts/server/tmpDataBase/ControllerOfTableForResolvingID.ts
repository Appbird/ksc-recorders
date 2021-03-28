import { IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
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

    private resolveID(id:string, table: IItemOfResolveTableToName[],lang:LanguageInApplication,descriptionOfPlace:string = ""){
        const item = table.find(
            (element) =>  element.id === id
        )
        if (item === undefined) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }

    async resolveGameSystemID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.dataBase.gameSystemList,lang,"GameSystem");
    }

    private findProperGameSystemInfo(gameSystemID:string){
        const result = this.dataBase.getGameSystemInfo(gameSystemID);
        return result;
    }
    
    async resolveAbilityID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await this.findProperGameSystemInfo(gameSystemID)).list.AbilityList,lang,"Ability");
    }
    async resolveTargetID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await this.findProperGameSystemInfo(gameSystemID)).list.TargetList,lang,"Target");
    }
    async resolveGameDifficultyID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await this.findProperGameSystemInfo(gameSystemID)).list.GameDifficultyList,lang,"GameDifficulty");
    }
    async resolveGameModeID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await this.findProperGameSystemInfo(gameSystemID)).list.GameModeList,lang,"GameMode");
    }
    async resolveRunnerID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.dataBase.runnersList,lang,"runnersTable");
    }
}