import { firebase } from "../firebaseAdmin";
import { RecordDataBase } from "./RecordDataBase";
//[-] ここの定義を別の場所に移したい
export type LanguageInApplication = "Japanese" | "English";

/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
export class ControllerOfTableForResolvingID{
    private dataBase: RecordDataBase;
    constructor(database:RecordDataBase){
        this.dataBase = database;
    }
    private async resolveID(id:string, collection:FirebaseFirestore.CollectionReference,lang:LanguageInApplication,descriptionOfPlace:string = ""):Promise<string>{
        const result = await collection.doc(id).get();
        
        if (!result.exists) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        //#TODO ここの型定義を保証する
        const item = result.data() as FirebaseFirestore.DocumentData;
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }

    resolveGameSystemID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.dataBase.gameSystemList,lang,"GameSystem");
    }

    private getGameSystemRef(gameSystemID:string){
        return firebase.firestore.collection("works").doc(gameSystemID)
    }
    
    async resolveAbilityID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameSystemRef(gameSystemID).collection("ability"),lang,"Ability");
    }
    async resolveTargetID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameSystemRef(gameSystemID).collection("target"),lang,"Target");
    }
    async resolveGameDifficultyID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameSystemRef(gameSystemID).collection("difficulty"),lang,"GameDifficulty");
    }
    async resolveGameModeID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameSystemRef(gameSystemID).collection("gameMode"),lang,"GameMode");
    }
    async resolveRunnerID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,firebase.firestore.collection("runners"),lang,"runnersTable");
    }
}
