import * as fbAdmin from "firebase-admin";
import { IRecord } from "../../type/record/IRecord";
import { firebase } from "../firebaseAdmin";
import { IGameSystemInfo } from "../type/IGameSystemInfo";
//[-] これも移したい
export type OrderOfRecordArray = "HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"

fbAdmin.initializeApp();

interface IRecordsArrayWithInfo{
    records: IRecord[],
    numberOfRecords: number,
    numberOfRunners: number
}
//[-] getRecordsWithConditionメソッドの実装
export class RecordDataBase{
    private dataBase:FirebaseFirestore.Firestore;
    constructor(){
        this.dataBase = firebase.firestore;
    }
    get runnersList(){
        return this.dataBase.collection("runners");
    }
    get gameSystemList(){
        return this.dataBase.collection("gameSystem");
    }
    async getGameSystemInfo(gameSystemID:string){
        const result = await this.gameSystemList.doc(gameSystemID).get();
        if (!result.exists) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result.data() as IGameSystemInfo;
    }
    
    async getRecord(gameSystemID:string,recordID:string){
        const result = await this.gameSystemList.doc(gameSystemID).collection("records").doc(recordID).get();
        if (!result.exists) throw new Error(`指定されたID${gameSystemID}に対応するゲームが存在しません。`);
        return result.data() as IRecord;
    }
    async getRecordsAndInfoWithCondition(gameSystemID:string, 
        order:OrderOfRecordArray ,
        abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
        abilityIDs:string[] = [],
        targetIDs:string[] = [],
        runnerIDs:string[] = [],
        limits:number = 10
    ):Promise<IRecordsArrayWithInfo>{
        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10) throw Error(`能力(${abilityIDs.length}つ),計測対象(${targetIDs.length}つ),走者(${runnerIDs.length}つ)のうちいずれかの条件指定が多すぎます。`)
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        let recordsQuery:FirebaseFirestore.Query = this.gameSystemList.doc(gameSystemID).collection("records");

        if (abilityIDs.length !== 0) recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery,abilityIDsCondition,abilityIDs)
        if (targetIDs.length !== 0) recordsQuery = recordsQuery.where("targetIDs","array-contains-any",targetIDs)
        if (runnerIDs.length !== 0) recordsQuery = recordsQuery.where("runnerIDs","array-contains-any",targetIDs)
        const recordsQuerySnapshot =  await this.addQueryAboutOrderBy(recordsQuery,order).get();
        //#TODO ここの型定義をきちんと保証する。
        const records:IRecord[] = recordsQuerySnapshot.docs.map( (doc) => {
            const data = doc.data(); data.id = doc.id; return data;
        }) as IRecord[]
        return {
            records:  records.slice(0,limits),
            numberOfRecords : recordsQuerySnapshot.docs.length,
            numberOfRunners : this.countRunner(records)
        }
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
    private countRunner(record:IRecord[]):number{
        const runnerIDs:string[] = record.map((element) => element.runnerID);
        runnerIDs.sort()
        let note:string = "";
        let result = 0;
        for (const element of runnerIDs){
            if (note === element) continue;
            result++; note = element;
        }
        return result;
    }
}

