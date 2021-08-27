import { MultiLanguageString } from "../../../../src/ts/type/foundation/MultiLanguageString";
import { ScoreType } from "../../../../src/ts/type/list/IGameModeItem";
import { IRecord } from "../../../../src/ts/type/record/IRecord";
import { IRunner } from "../../../../src/ts/type/record/IRunner";
import { PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./IFirestoreCollectionController";
import { RecordCollectionController } from "./RecordCollectionController";
import { RunnerCollectionController } from "./RunnerCollectionController";

interface IRecordTableItem {
    target__ability:string,
    score:number,
    runnerInfo:MultiLanguageString,
    date:number,
    recordID:string
}

export class TableCollectionController implements IFirestoreCollectionController<IRecordTableItem> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(
        private gameSystemID:string,
        private gameModeID:string,
        private transaction?:FirebaseFirestore.Transaction
    ) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("table");
    }
    getCollection(): Promise<IRecordTableItem[]> {
        return firestoreCollectionUtility.getCollection<IRecordTableItem>(this.ref,this.transaction);
    }
    getInfo(id: string): Promise<IRecordTableItem> {
        return firestoreCollectionUtility.getDoc<IRecordTableItem>(this.ref.doc(id),this.transaction);
    }
    add(object: WithoutID<IRecordTableItem>): Promise<string> {
        return firestoreCollectionUtility.addDoc<IRecordTableItem>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: IRecordTableItem): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<IRecordTableItem>(this.ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<IRecordTableItem> {
        return firestoreCollectionUtility.deleteDoc<IRecordTableItem>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object: PartialValueWithFieldValue<IRecordTableItem>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object, this.transaction);
    }
    getTableCell(targetID:string,abilityIDs:string[]){
        if (abilityIDs.length !== 1) return;
        return this.getInfo(`${targetID}__${abilityIDs[0]}`)
    }
    async setNewTableCell(record:IRecord,runner:IRunner,scoreType:ScoreType){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const key = `${rr.targetID}__${rr.abilityIDs[0]}`
        const itemOfFastestTable = await firestoreCollectionUtility.getDocWithPossibilityOfUndefined<IRecordTableItem>(this.ref.doc(key),this.transaction)
        if (itemOfFastestTable !== undefined){
            const fastestScore = itemOfFastestTable.score
            if (!(
                (scoreType === "score" && fastestScore < record.score) || (scoreType === "time" && fastestScore > record.score)
                )) return;
        }
        this.modify(key,{
            target__ability:key,
            score:record.score,
            runnerInfo:{
                Japanese:runner.Japanese,
                English:runner.English
            },
            date:record.timestamp_post,
            recordID:record.id,
        })
    }

    async refreshFastestTableWhenRemoving(record:IRecord,scoreType:ScoreType){
        const rr = record.regulation;
        const key = `${rr.targetID}__${rr.abilityIDs[0]}`
        if (rr.abilityIDs.length !== 1) return;
        const itemOfFastestTable = await firestoreCollectionUtility.getDoc<IRecordTableItem>(this.ref.doc(key),this.transaction);
        if (itemOfFastestTable === undefined || record.id !== itemOfFastestTable.recordID) return;
        this.delete(key)
        await this.refindFastestRecord(record,scoreType)
    }

    async refindFastestRecord(record:IRecord,scoreType:ScoreType){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const rrg = rr.gameSystemEnvironment;
        const tableID = `${rr.targetID}__${rr.abilityIDs[0]}`
        if (rrg.gameSystemID !== this.gameSystemID || rrg.gameModeID !== this.gameModeID) throw new Error("rrg.gameSystemID !== this.gameSystemID || rrg.gameModeID !== this.gameModeID")


        
        const recordsInSameRegulation = await (new RecordCollectionController(rrg.gameSystemID,rrg.gameModeID)).getWithCondition(decideOrder(scoreType),"AllowForOrder",rr.abilityIDs,[rr.targetID],[])
        if (recordsInSameRegulation.length === 0) return;
        const fastestRecord = recordsInSameRegulation[0];
        const runnerOfFastestRecord = await (new RunnerCollectionController(this.transaction)).getInfo(fastestRecord.runnerID);
        
        this.modify(tableID,{
            target__ability:tableID,
            score:fastestRecord.score,
            runnerInfo:{
                Japanese:runnerOfFastestRecord.Japanese,
                English:runnerOfFastestRecord.English
            },
            date:fastestRecord.timestamp_post,
            recordID:fastestRecord.id,
        })
    }
}

function decideOrder(type:ScoreType){
    switch(type){
        case "score": return "HigherFirst";
        case "time":  return "LowerFirst";
    }
}