import { IRecord } from "../../type/record/IRecord";
import { IRunner } from "../../type/record/IRunner";
import { firebase } from "../firebaseAdmin";
import { IHashTagItem, IGameSystemInfo, IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { InterfaceOfRecordDatabase } from "../type/InterfaceOfRecordDatabase";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";
import { IGameModeItem, IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";
import { IGameDifficultyItem } from "../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../type/list/ITargetItem";
import { IAbilityItem } from "../../type/list/IAbilityItem";

//[x] getRecordsWithConditionメソッドの実装
class RecordDataBase implements InterfaceOfRecordDatabase{
    private dataBase:FirebaseFirestore.Firestore;
    constructor(){
        this.dataBase = firebase.firestore;
    }
    
    private getRunnersRef = () => this.dataBase.collection("runners");
    
    private getGameSystemCollectionRef = () => this.dataBase.collection("works");
    
    private getGameSystemRef = (gameSystemID:string) => this.dataBase.collection("works").doc(gameSystemID);
    
    private getGameModeRef = (gameSystemID:string,gameModeID:string) => this.getGameSystemCollectionRef().doc(gameSystemID).collection("modes").doc(gameModeID);
    
    

    private async getCollection<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>):Promise<T[]>{
        const result = await ref.get()
        if (result.empty) throw new Error(`コレクション${ref.path}が存在しません。`);
        return result.docs as unknown as T[];
    }
    private async getDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>):Promise<T>{
        const result = await ref.get()
        if (result.exists) throw new Error(`ドキュメント${ref.path}が存在しません。`);
        return result.data() as T;
    }

    getGameSystemCollection = () => this.getCollection<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef())
    getGameSystemInfo       = (gameSystemID:string) => this.getDoc<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef().doc(gameSystemID))

    getGameModeCollection   = (gameSystemID:string) => this.getCollection<IGameModeItemWithoutCollections>(this.getGameSystemRef(gameSystemID).collection("modes"))
    getGameModeInfo         = (gameSystemID:string,gameModeID:string) => this.getDoc<IGameModeItemWithoutCollections>(this.getGameModeRef(gameSystemID,gameModeID))

    getGameDifficultyCollection     = (gameSystemID:string,gameModeID:string) => this.getCollection<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulty"))
    getGameDifficultyInfo           = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulty").doc(id))

    getAbilityCollection    = (gameSystemID:string,gameModeID:string) => this.getCollection<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("ability"))
    getAbilityInfo          = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("ability").doc(id))

    getTargetCollection     = (gameSystemID:string,gameModeID:string) => this.getCollection<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("target"))
    getTargetInfo           = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("target").doc(id))


    getRunnerCollection     = () => this.getCollection<IRunner>(this.getRunnersRef())
    getRunnerInfo           = (id:string) => this.getDoc<IRunner>(this.getRunnersRef().doc(id))

    //#TODO テストをするときにはデータベースが保存するハッシュタグの場所を修正する。
    getHashTagCollection    = (gameSystemID:string) => this.getCollection<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("hashTag"))
    getHashTagInfo          = (gameSystemID:string,id:string) => this.getDoc<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("HashTag").doc(id))

    async getRecord(gameSystemID:string,gameModeID:string,recordID:string){
        const result = await this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).get();
        if (!result.exists) throw new Error(`指定されたゲームID${gameSystemID},モードID${gameModeID}内の記録ID${recordID}に対応するモードが存在しません。`);
        return result.data() as IRecord;
    }

    async getRecordsWithCondition(gameSystemID:string, gameModeID:string,
        order:OrderOfRecordArray ,
        abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
        abilityIDs:string[] = [],
        targetIDs:string[] = [],
        runnerIDs:string[] = []
    ):Promise<IRecord[]>{
        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10) throw Error(`能力(${abilityIDs.length}つ),計測対象(${targetIDs.length}つ),走者(${runnerIDs.length}つ)のうちいずれかの条件指定が10個よりも多いです。`)
        
        console.log(`[${new Date().toUTCString()}]以下の条件で検索を開始します。\n\u001b[33m gameSystemID:${gameSystemID}, gameModeID:${gameModeID}, order:${order}, abilityIDsCondition:${abilityIDsCondition}, abilityIDs:[${abilityIDs}] (${abilityIDs.length}), targetIDs:[${targetIDs}] (${targetIDs.length}), runnerIDs:[${runnerIDs}] (${runnerIDs.length}) \u001b[0m`)
        
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        let recordsQuery:FirebaseFirestore.Query = this.getGameModeRef(gameSystemID,gameModeID).collection("records");

        if (abilityIDs.length !== 0) recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery,abilityIDsCondition,abilityIDs)
        if (targetIDs.length !== 0) recordsQuery = recordsQuery.where("regulation.targetID","in",targetIDs)
        if (runnerIDs.length !== 0) recordsQuery = recordsQuery.where("runnerID","in",runnerIDs)

            const recordsQuerySnapshot = await recordsQuery.get();
            //#NOTE 本当はrecordsの構造が正しいかを確認しなくてはならないが、データベースに登録されているデータに不正な構造であるドキュメントが交じる可能性が低く、また、このデータがどう使われるかも踏まえるとチェックするメリットが薄いと判断したため型アサーションを利用した。
            let records = recordsQuerySnapshot.docs.map( (doc) => {
                const data = doc.data(); data.id = doc.id; return data;
            }) as IRecord[]
        if (recordsQuerySnapshot.empty) console.info("条件に該当する記録が存在しませんでした。")

        //#NOTE abilityIDsでAND検索を行った場合の補填をここでする。
        if (abilityIDsCondition === "AND") records = records.filter( (record) => 
                                                            abilityIDs.every( (abilityID) => record.regulation.abilityIDs.includes(abilityID))
                                                    ) 
        return records.sort((a,b) => this.sortFunction(a,b,order));
    }
    private addQueryAboutAbilityIDs(recordQuery:FirebaseFirestore.Query,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:string[]):FirebaseFirestore.Query<FirebaseFirestore.DocumentData>{
        switch(abilityIDsCondition){
            case "AND":
                //#NOTE array-contains句は一つしか設定できずクエリでのAND検索が実装不可能であるため、必要条件のクエリとしてabilityIDs array-contains abilityIDs[0]をFirebase側に送り、のちに十分性をFunctionsサイドで補填する。
                return recordQuery.where("regulation.abilityIDs","array-contains",abilityIDs[0])
            case "OR":
                return recordQuery.where("regulation.abilityIDs","array-contains-any",abilityIDs)
            case "AllowForOrder":
                return recordQuery.where("regulation.abilityIDs","==",abilityIDs)
        }
    }
    private sortFunction(a:IRecord,b:IRecord,order:OrderOfRecordArray){
            switch(order){
                case "HigherFirst": return b.score - a.score;
                case "LowerFirst" : return a.score - b.score;
                case "LaterFirst": return b.timestamp - a.timestamp;
                case "EarlierFirst": return a.timestamp - b.timestamp;
                default : return 0;
            }
    }
}


export const recordDataBase = new RecordDataBase();