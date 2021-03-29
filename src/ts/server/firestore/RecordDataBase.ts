import { IRecord } from "../../type/record/IRecord";
import { firebase } from "../firebaseAdmin";
import { IGameSystemInfo } from "../type/IGameSystemInfo";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";

//[x] getRecordsWithConditionメソッドの実装
export class RecordDataBase{
    private dataBase:FirebaseFirestore.Firestore;
    constructor(){
        this.dataBase = firebase.firestore;
    }
    get runnersRef(){
        return this.dataBase.collection("runners");
    }
    get gameSystemRef(){
        return this.dataBase.collection("gameSystem");
    }
    getGameModeRef(gameSystemID:string,gameModeID:string){
        return this.gameSystemRef.doc(gameSystemID).collection("modes").doc(gameModeID);
    }

    async getGameSystemInfo(gameSystemID:string){
        const result = await this.gameSystemRef.doc(gameSystemID).get();
        if (!result.exists) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result.data() as IGameSystemInfo;
    }
    async getGameModeInfo(gameSystemID:string,gameModeID:string){
        const result = await this.gameSystemRef.doc(gameSystemID).collection("modes").doc(gameModeID).get();
        if (!result.exists) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result.data() as IGameSystemInfo;
    }
    
    async getRecord(gameSystemID:string,gameModeID:string,recordID:string){
        const result = await this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).get();
        if (!result.exists) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result.data() as IRecord;
    }

    async getRecordsWithCondition(gameSystemID:string, gameModeID:string,
        order:OrderOfRecordArray ,
        abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
        abilityIDs:string[] = [],
        targetIDs:string[] = [],
        runnerIDs:string[] = []
    ):Promise<IRecord[]>{
        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10) throw Error(`能力(${abilityIDs.length}つ),計測対象(${targetIDs.length}つ),走者(${runnerIDs.length}つ)のうちいずれかの条件指定が多すぎます。`)
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        let recordsQuery:FirebaseFirestore.Query = this.getGameModeRef(gameSystemID,gameModeID).collection("records");

        if (abilityIDs.length !== 0) recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery,abilityIDsCondition,abilityIDs)
        if (targetIDs.length !== 0) recordsQuery = recordsQuery.where("targetIDs","array-contains-any",targetIDs)
        if (runnerIDs.length !== 0) recordsQuery = recordsQuery.where("runnerIDs","array-contains-any",targetIDs)
        const recordsQuerySnapshot =  await this.addQueryAboutOrderBy(recordsQuery,order).get();
        //#NOTE 本当はrecordsの構造が正しいかを確認しなくてはならないが、データベースに登録されているデータに不正な構造であるドキュメントが交じる可能性が低く、また、このデータがどう使われるかも踏まえるとチェックするメリットが薄いと判断したため型アサーションを利用した。
        const records = recordsQuerySnapshot.docs.map( (doc) => {
            const data = doc.data(); data.id = doc.id; return data;
        }) as IRecord[]

        return records;
    }
   
    private addQueryAboutAbilityIDs(recordQuery:FirebaseFirestore.Query,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:string[]):FirebaseFirestore.Query<FirebaseFirestore.DocumentData>{
        switch(abilityIDsCondition){
            case "AND":
                for (const abilityID of abilityIDs) recordQuery = recordQuery.where("abilityIDs","array-contains",abilityID)
                return recordQuery
            case "OR":
                return recordQuery.where("abilityIDs","array-contains-any",abilityIDs)
            case "AllowForOrder":
                return recordQuery.where("abilityIDs","==",abilityIDs)
        }
    }

    private addQueryAboutOrderBy(recordQuery:FirebaseFirestore.Query,order:OrderOfRecordArray){
        switch(order){
            case "EarlierFirst": return recordQuery.orderBy("timestamp","asc")
            case "LaterFirst" : return recordQuery.orderBy("timestamp","desc")
            case "LowerFirst" : return recordQuery.orderBy("stamp","asc")
            case "HigherFirst" : return recordQuery.orderBy("stamp","desc")
        }
    }
}

