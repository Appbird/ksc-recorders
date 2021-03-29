import { checkInputObjectWithErrorPossibility } from "../../utility/InputCheckerUtility";
import { firebase } from "../firebaseAdmin";
import { expectedObj_IItemOfResolveTableToName, IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { RecordDataBase } from "./RecordDataBase";


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
        //#CTODO ここの型定義を保証する
        const item:unknown = result.data()
        if (!checkInputObjectWithErrorPossibility<IItemOfResolveTableToName>(item,expectedObj_IItemOfResolveTableToName,
            "In ControllerOfTableForResolvingID#resolveID, data")) throw new Error();
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
