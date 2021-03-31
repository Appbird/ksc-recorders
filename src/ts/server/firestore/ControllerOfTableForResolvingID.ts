import { firebase } from "../firebaseAdmin";
import { IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { recordDataBase } from "./RecordDataBase";

/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
class ControllerOfTableForResolvingID{
    constructor(){}
    private async resolveID(id:string, collection:FirebaseFirestore.CollectionReference, lang:LanguageInApplication, descriptionOfPlace:string = ""):Promise<string>{
        const result = await collection.doc(id).get();
        
        if (!result.exists) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        const item = result.data() as IItemOfResolveTableToName;

        /* 
         //#CTODO ここの型定義を保証する
        const item:unknown = result.data()
        if (!checkInputObjectWithErrorPossibility<IItemOfResolveTableToName>(item,expectedObj_IItemOfResolveTableToName,
            "In ControllerOfTableForResolvingID#resolveID, data")) throw new Error();
        */

        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }


    resolveGameSystemID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,firebase.firestore.collection("works"),lang,"GameSystem");
    }

    private getGameSystemRef(gameSystemID:string){
        return firebase.firestore.collection("works").doc(gameSystemID)
    }
    private getGameModeRef(gameSystemID:string,gameModeID:string){
        return firebase.firestore.collection("works").doc(gameSystemID).collection("modes").doc(gameModeID)
    }
    
    
    async resolveAbilityID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameModeRef(gameSystemID,gameModeID).collection("abilities"),lang,"Ability");
    }
    async resolveTargetID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameModeRef(gameSystemID,gameModeID).collection("targets"),lang,"Target");
    }
    async resolveGameDifficultyID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties"),lang,"GameDifficulty");
    }
    async resolveGameModeID(gameSystemID:string,id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.getGameSystemRef(gameSystemID).collection("modes"),lang,"GameMode");
    }
    async resolveRunnerID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,firebase.firestore.collection("runners"),lang,"runnersTable");
    }
}

export const controllerOfTableForResolvingID = new ControllerOfTableForResolvingID()