import { IGameModeItemWithoutCollections } from "../../../../src/ts/type/list/IGameModeItem";
import { PartialValueWithFieldValue, Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";

type HandledType = IGameModeItemWithoutCollections

export class GameModeItemController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,
        private transaction?:Transaction
    ) {
        this.ref = firestoreCollectionUtility.getGameSystemItemRef(gameSystemID).collection("modes");
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction);
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    add(object: WithoutID<HandledType>): Promise<string> {
        return firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getAndDeleteDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object: PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object,this.transaction);
    }
    async incrementCounterWhenRecordIsSubmitted(id:string,runnerID:string,incrementRunnersNumber:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(1),
            dateOfLatestPost: Date.now(),
            runnerIDList: firestoreCollectionUtility.fieldValue.arrayUnion(runnerID)
            
        })
    }
    async incrementUnverifiedRecordNumber(id:string,mode:"+"|"-"){
        this.update(id,{
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(mode === "+" ? 1:-1),
        })
    }
    async decrementCounterWhenRecordIsDeleted(id:string,runnerID:string,decrementRunnersNumber:boolean,shouldDecrementUnverifiedNumberCount:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(-1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment((shouldDecrementUnverifiedNumberCount) ? -1:0),
        })
        if (decrementRunnersNumber) this.update(id, {runnerIDList: firestoreCollectionUtility.fieldValue.arrayRemove(runnerID)})
    }
    //#CTODO GameModeの記録数、走者数とかをインクリメントするメソッドがほしい
     //*> (uid:string) => void 
}
