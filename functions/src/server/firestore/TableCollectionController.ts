import { MultiLanguageString } from "../../../../src/ts/type/foundation/MultiLanguageString";
import { ScoreType } from "../../../../src/ts/type/list/IGameModeItem";
import { IRecord } from "../../../../src/ts/type/record/IRecord";
import { IRunner } from "../../../../src/ts/type/record/IRunner";
import { PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";

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
    getInfoWithNullPossibility(id: string): Promise<IRecordTableItem|null> {
       return firestoreCollectionUtility.getDocWithNullPossibility<IRecordTableItem>(this.ref.doc(id),this.transaction)
    }
    add(object: WithoutID<IRecordTableItem>): Promise<string> {
        return firestoreCollectionUtility.addDoc<IRecordTableItem>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: IRecordTableItem): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<IRecordTableItem>(this.ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<IRecordTableItem> {
        return firestoreCollectionUtility.getAndDeleteDoc<IRecordTableItem>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object: PartialValueWithFieldValue<IRecordTableItem>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object, this.transaction);
    }
    getTableCell(targetID:string,abilityIDs:string[]){
        if (abilityIDs.length !== 1) return;
        return this.getInfo(`${targetID}__${abilityIDs[0]}`)
    }
    async setNewTableCell(record:IRecord,runner:IRunner,scoreType:ScoreType,itemInFastestTable?:IRecordTableItem|null){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const key = `${rr.targetID}__${rr.abilityIDs[0]}`
        const itemOfFastestTable = (itemInFastestTable !== undefined) ? itemInFastestTable : await firestoreCollectionUtility.getDocWithNullPossibility<IRecordTableItem>(this.ref.doc(key),this.transaction)
        if (itemOfFastestTable !== null){
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

    async refreshFastestTableWhenRemoving(record:IRecord,fastestRecord:IRecord|undefined,runnerOfFastestRecord:IRunner){
        const rr = record.regulation;
        const key = `${rr.targetID}__${rr.abilityIDs[0]}`
        if (rr.abilityIDs.length !== 1) return;
        if (fastestRecord === undefined || record.id !== fastestRecord.id) return;
        this.delete(key)
        await this.refindFastestRecord(record,fastestRecord,runnerOfFastestRecord)
    }

    async refindFastestRecord(record:IRecord,fastestRecord:IRecord,runnerOfFastestRecord:IRunner){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const rrg = rr.gameSystemEnvironment;
        const tableID = `${rr.targetID}__${rr.abilityIDs[0]}`
        if (rrg.gameSystemID !== this.gameSystemID || rrg.gameModeID !== this.gameModeID) throw new Error("rrg.gameSystemID !== this.gameSystemID || rrg.gameModeID !== this.gameModeID")

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
