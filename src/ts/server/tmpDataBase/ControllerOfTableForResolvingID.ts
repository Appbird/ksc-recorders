import { IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { recordDataBase } from "./RecordDataBase";

/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
export class ControllerOfTableForResolvingID{
    
    constructor(){
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
        return this.resolveID(id,recordDataBase.gameSystemList,lang,"GameSystem");
    }
    
    async resolveAbilityID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await recordDataBase.getGameModeInfo(gameSystemID,gameModeID)).abilities,lang,"Ability");
    }
    async resolveTargetID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await recordDataBase.getGameModeInfo(gameSystemID,gameModeID)).targets,lang,"Target");
    }
    async resolveGameDifficultyID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await recordDataBase.getGameModeInfo(gameSystemID,gameModeID)).difficulties,lang,"GameDifficulty");
    }
    async resolveGameModeID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,(await recordDataBase.getGameSystemInfo(gameSystemID)).modes,lang,"GameMode");
    }
    async resolveRunnerID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,recordDataBase.runnersList,lang,"runnersTable");
    }
    async resolveTagID(gameSystemID: string, gameModeID: string, id: string, lang: LanguageInApplication) {
        return this.resolveID(id,(await recordDataBase.getGameModeInfo(gameSystemID,gameModeID)).tags,lang,"runnersTable");
    }
}
export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID();