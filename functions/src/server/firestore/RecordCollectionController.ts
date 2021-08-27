import { IRecord, IRecordWithoutID, IRecordWritedInDatabase } from "../../../../src/ts/type/record/IRecord";
import { OrderOfRecordArray } from "../../../../src/ts/type/record/OrderOfRecordArray";
import { SearchTypeForVerifiedRecord } from "../../../../src/ts/type/record/SearchCondition";
import { Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { GameModeItemController } from "./GameModeItemController";
import { GameSystemItemController } from "./GameSystemController";
import { HashTagCollectionController } from "./HashTagCollectionController";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";
import { RecordModifiedHistoryStackController } from "./RecordModifiedHistoryStackController";
import { RunnerCollectionController } from "./RunnerCollectionController";
import { TableCollectionController } from "./TableCollectionController";
import { ScoreType } from "../../../../src/ts/type/list/IGameModeItem";


//#CTODO ここを修正する。
type HandledType = IRecord
type HandledTypeInDataBase = IRecordWritedInDatabase

export class RecordCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(private gameSystemID:string,private gameModeID:string,
        private transaction?:Transaction) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("records");
    }
    
    async getCollection(): Promise<HandledType[]> {
        return (await firestoreCollectionUtility.getCollection<HandledTypeInDataBase>(this.ref,this.transaction))
            .map(record => convertRecordWritedInDatabaseIntoRecord(record))
    }
    
    async getInfo(id: string): Promise<HandledType> {
        return convertRecordWritedInDatabaseIntoRecord(await firestoreCollectionUtility.getDoc<HandledTypeInDataBase>(this.ref.doc(id),this.transaction))
    }

    async addWithConsistency(record: WithoutID<IRecord>): Promise<IRecord> {
        this.checkValidInput(record)
        const rrg = record.regulation.gameSystemEnvironment
        return await firestoreCollectionUtility.runTransaction(async (transaction) => {
            
            const newDocRef = this.ref.doc()

            const runnerC       = new RunnerCollectionController(transaction)
            const gameSystemC   = new GameSystemItemController(transaction)
            const gameModeC     = new GameModeItemController(rrg.gameSystemID,transaction)
            const tableC        = new TableCollectionController(this.gameSystemID,this.gameModeID,transaction)

            const recordWithID:IRecord = {...record, id:newDocRef.id,moderatorIDs:[]}
            
            const runner            = await runnerC.getInfo(record.runnerID)
            const gameModeInfo          = await gameModeC.getInfo(rrg.gameModeID)
            const itemInFastestTable    = await tableC.getInfoWithNullPossibility(rrg.gameModeID)

            await gameSystemC.incrementCounterWhenRecordIsSubmitted(rrg.gameSystemID,runner.id,shouldIncrementRunnerNumberCount(rrg.gameSystemID,runner.idOfGameSystemRunnerHavePlayed))
            await gameModeC.incrementCounterWhenRecordIsSubmitted(rrg.gameModeID,runner.id,shouldIncrementRunnerNumberCount(`${rrg.gameSystemID}/${rrg.gameModeID}`,runner.idOfGameModeRunnerHavePlayed))
            await tableC.setNewTableCell(recordWithID,runner,gameModeInfo.scoreType,itemInFastestTable)
            await runnerC.incrementPlayCount(runner,this.gameSystemID,this.gameModeID)
            await firestoreCollectionUtility.modifyDoc<HandledTypeInDataBase>(this.ref.doc(newDocRef.id),convertRecordIntoRecordWritedInDatabase(recordWithID) ,transaction);
            return recordWithID
        }
        )
        
    }

    async verifyRecord(recordID:string, moderatorID:string): Promise<IRecord>{
        return await firestoreCollectionUtility.runTransaction(async (transaction) => {
            const recordC = new RecordCollectionController(this.gameSystemID,this.gameModeID,transaction)
            const hashTagC = new HashTagCollectionController(this.gameSystemID,transaction)
            const gameSystemC = new GameSystemItemController(transaction)
            const gameModeC = new GameModeItemController(this.gameSystemID,transaction)
            
            const record = await recordC.getInfo(recordID)

            await Promise.all(record.tagID.map(id => hashTagC.verifiedHashTag(id)))
            await gameSystemC.incrementUnverifiedRecordNumber(this.gameSystemID,"-")
            await gameModeC.incrementUnverifiedRecordNumber(this.gameModeID,"-")
            await recordC.updateModeratorList(recordID,moderatorID)
            return record;
        });
    }

    async modifyWithConsistency(recordID:string, modifierID:string, record:IRecordWithoutID): Promise<IRecord>{
        this.checkValidInput(record)
        return await firestoreCollectionUtility.runTransaction(async (transaction) => {
            const gameSystemC   = new GameSystemItemController(transaction)
            const gameModeC     = new GameModeItemController(this.gameSystemID,transaction)
            const tableC        = new TableCollectionController(this.gameSystemID,this.gameModeID,transaction)
            const recordC       = new RecordCollectionController(this.gameSystemID,this.gameModeID,transaction)
            const runnerC       = new RunnerCollectionController(transaction)
            const recordModifiedHistoryC = new RecordModifiedHistoryStackController(this.gameSystemID,this.gameModeID,recordID,transaction)
            
            const modifiedOffer:IRecord = { ...record,id:recordID,moderatorIDs:[] }

            const gameMode = await gameModeC.getInfo(this.gameModeID);      
            const recordBeforeModified = await this.getInfo(recordID)
            const rr = modifiedOffer.regulation
            const recordsInSameRegulation = await recordC.getWithCondition(decideOrder(gameMode.scoreType),"AllowForOrder",rr.abilityIDs,[rr.targetID],[])
            const fastestRecord = recordsInSameRegulation[0];
            const runnerOfFastestRecord = (fastestRecord !== undefined) ? await runnerC.getInfo(fastestRecord.runnerID): undefined
        
            if (record.regulation.abilityIDs.length === 1 && runnerOfFastestRecord !== undefined) tableC.refindFastestRecord(modifiedOffer,fastestRecord,runnerOfFastestRecord)
            await recordModifiedHistoryC.add({ modifierID:modifierID, timestamp:Date.now(), before:convertRecordIntoRecordWritedInDatabase(recordBeforeModified) });
            if (recordBeforeModified.moderatorIDs.length !== 0){
                await gameSystemC.incrementUnverifiedRecordNumber(this.gameSystemID,"+")
                await gameModeC.incrementUnverifiedRecordNumber(this.gameModeID,"+")
            }
            await firestoreCollectionUtility.modifyDoc<HandledTypeInDataBase>(this.ref.doc(recordID), convertRecordIntoRecordWritedInDatabase(modifiedOffer),transaction);
            return modifiedOffer;
        })
    }

    async deleteWithConsistency(id: string): Promise<HandledType> {
        return await firestoreCollectionUtility.runTransaction(async (transaction) => {
            const recordC = new RecordCollectionController(this.gameSystemID,this.gameModeID,transaction)
            const tableC = new TableCollectionController(this.gameSystemID,this.gameModeID,transaction)
            const runnerC = new RunnerCollectionController(transaction)
            const gameSystemC = new GameSystemItemController(transaction)
            const gameModeC = new GameModeItemController(this.gameSystemID,transaction)
            const modifiedHistoryC = new RecordModifiedHistoryStackController(this.gameSystemID,this.gameModeID,id,transaction)
            
            const record = await recordC.getInfo(id)
            const runner = await runnerC.getInfo(record.runnerID)
            const gameMode = await gameModeC.getInfo(this.gameModeID);

            const rr = record.regulation
            const recordsInSameRegulation = await recordC.getWithCondition(decideOrder(gameMode.scoreType),"AllowForOrder",rr.abilityIDs,[rr.targetID],[])
            const fastestRecord = recordsInSameRegulation[0];
            const runnerOfFastestRecord = (fastestRecord !== undefined) ? await (new RunnerCollectionController(this.transaction)).getInfo(fastestRecord.runnerID): undefined
        
            await modifiedHistoryC.deleteAll()
            await gameSystemC.decrementCounterWhenRecordIsDeleted(this.gameSystemID,runner.id,shouldDecrementRunnerNumberCount(this.gameSystemID,runner.idOfGameSystemRunnerHavePlayed),record.moderatorIDs.length === 0)
            await gameModeC.decrementCounterWhenRecordIsDeleted(this.gameModeID,runner.id,shouldDecrementRunnerNumberCount(`${this.gameSystemID}/${this.gameModeID}`,runner.idOfGameModeRunnerHavePlayed),record.moderatorIDs.length === 0)
            await runnerC.decrementPlayCount(runner,this.gameSystemID,this.gameModeID)
            if (runnerOfFastestRecord !== undefined) await tableC.refreshFastestTableWhenRemoving(record,fastestRecord,runnerOfFastestRecord);
            await firestoreCollectionUtility.deleteDoc(this.ref.doc(id),transaction)
            return record
        }
        )
    }
    updateModeratorList(id:string,moderatorID:string){
        return firestoreCollectionUtility.updateDoc<IRecordWritedInDatabase>(this.ref.doc(id),{
               moderatorIDs: firestoreCollectionUtility.fieldValue.arrayUnion({
                    id: moderatorID,
                    date: Date.now()
                })
        },this.transaction)
    
    }


    async getWithCondition(
        order:OrderOfRecordArray ,
        abilityIDsCondition: "AND" | "OR" | "AllowForOrder" = "AND",
        abilityIDs:string[] = [],
        targetIDs:string[] = [],
        runnerIDs:string[] = [],
        searchTypeForVerifiedRecord:SearchTypeForVerifiedRecord = "OnlyVerified",
        {limits}:{
            limits?:number
        }={}
    ):Promise<IRecord[]>{
        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10) throw Error(`能力(${abilityIDs.length}つ),計測対象(${targetIDs.length}つ),走者(${runnerIDs.length}つ)のうちいずれかの条件指定が10個よりも多いです。`)
        
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        let recordsQuery:FirebaseFirestore.Query = this.ref

        if (abilityIDs.length !== 0) recordsQuery = addQueryAboutAbilityIDs(recordsQuery,abilityIDsCondition,abilityIDs)
        if (targetIDs.length !== 0) recordsQuery = recordsQuery.where("regulation.targetID","in",targetIDs)
        if (runnerIDs.length !== 0) recordsQuery = recordsQuery.where("runnerID","in",runnerIDs)
        if (limits !== undefined && limits > 0) recordsQuery = recordsQuery.limit(limits)

            const recordsQuerySnapshot = await firestoreCollectionUtility.getCollection<IRecordWritedInDatabase>(recordsQuery,this.transaction);
            //#NOTE 本当はrecordsの構造が正しいかを確認しなくてはならないが、データベースに登録されているデータに不正な構造であるドキュメントが交じる可能性が低く、また、このデータがどう使われるかも踏まえるとチェックするメリットが薄いと判断したため型アサーションを利用した。
            let records = recordsQuerySnapshot.map( (doc) => convertRecordWritedInDatabaseIntoRecord(doc))
            //#NOTE abilityIDsでAND検索を行った場合の補填をここでする。
            if (abilityIDsCondition === "AND") records = records.filter( (record) => abilityIDs.every( (abilityID) => record.regulation.abilityIDs.includes(abilityID)) )
            //#NOTE 未承認の記録についての取扱い
            if (searchTypeForVerifiedRecord !== "All"){
                const filter = searchTypeForVerifiedRecord === "OnlyVerified" ? 
                    (record:IRecord) => record.moderatorIDs.length !== 0 : (record:IRecord) => record.moderatorIDs.length === 0
                records = records.filter(filter)
            }

        return records.sort((a,b) => sortFunction(a,b,order));
    }
    
    private checkValidInput(record:IRecordWithoutID){
        const rrg = record.regulation.gameSystemEnvironment
        if (rrg.gameSystemID !== this.gameSystemID || rrg.gameModeID !== this.gameModeID) throw new Error(`ゲームモード${this.gameSystemID}/${this.gameModeID}を扱うCollectionControllerに対し、ゲームモード${rrg.gameSystemID}/${rrg.gameModeID}の記録が入力されました。`)
    }
}
// #NOTE Converting
function convertRecordIntoRecordWritedInDatabase(record:IRecord):IRecordWritedInDatabase{
    return {
        ...record,
        regulation:{
            ...record.regulation,
            abilitiesAttributeIDs: (record.regulation.abilitiesAttributeIDs) ? JSON.stringify(record.regulation.abilitiesAttributeIDs) : undefined
        }
    }
}
function convertRecordWritedInDatabaseIntoRecord(record:IRecordWritedInDatabase):IRecord{
    return {
        ...record,
        regulation:{
            ...record.regulation,
            abilitiesAttributeIDs: (record.regulation.abilitiesAttributeIDs) ? JSON.parse(record.regulation.abilitiesAttributeIDs) : undefined
        }
    }
}

// #NOTE helper functions for getWithConditions
function addQueryAboutAbilityIDs(recordQuery:FirebaseFirestore.Query,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:string[]):FirebaseFirestore.Query<FirebaseFirestore.DocumentData>{
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
function sortFunction(a:IRecord,b:IRecord,order:OrderOfRecordArray){
        switch(order){
            case "HigherFirst": return b.score - a.score;
            case "LowerFirst" : return a.score - b.score;
            case "LaterFirst": return b.timestamp_post - a.timestamp_post;
            case "EarlierFirst": return a.timestamp_post - b.timestamp_post;
            default : return 0;
        }
}

// #NOTE helper functions for add/modify/delete
function shouldIncrementRunnerNumberCount(id:string,playedList:{id:string,times:number}[]){
    const target = playedList.find(item => item.id === id)
    return (target === undefined || target.times === 0)
}
function shouldDecrementRunnerNumberCount(id:string,playedList:{id:string,times:number}[]){
    const target = playedList.find(item => item.id === id)
    return (target?.times === 1)
}
function decideOrder(type:ScoreType){
    switch(type){
        case "score": return "HigherFirst";
        case "time":  return "LowerFirst";
    }
}