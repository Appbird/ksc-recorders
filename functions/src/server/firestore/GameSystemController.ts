import { IGameSystemInfoWithoutCollections } from "../../../../src/ts/type/list/IGameSystemInfo";
import { PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";


type HandledType = IGameSystemInfoWithoutCollections
export class GameSystemItemController implements IFirestoreCollectionController<HandledType>{
    readonly ref:FirebaseFirestore.CollectionReference
    constructor(
        private transaction?:FirebaseFirestore.Transaction
    ){
        this.ref = firestoreCollectionUtility.getGameSystemCollectionRef()
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction)
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction)
    }
    add(object: WithoutID<HandledType>): Promise<string> {
        return firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id),object,this.transaction)
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getAndDeleteDoc<HandledType>(this.ref.doc(id),this.transaction)
    }
    async update(id: string, object: PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id),object,this.transaction)
    }
    async incrementCounterWhenRecordIsSubmitted(id:string,runnerID:string,incrementRunnersNumber:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(1),
            runnerIDList: firestoreCollectionUtility.fieldValue.arrayUnion(runnerID),
            dateOfLatestPost: Date.now()
        })
    }
    async decrementCounterWhenRecordIsDeleted(id:string,runnerID:string,decrementRunnersNumber:boolean,shouldDecrementUnverifiedNumberCount:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(-1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment((shouldDecrementUnverifiedNumberCount) ? -1:0)
        })
        
        if (decrementRunnersNumber) this.update(id, {runnerIDList: firestoreCollectionUtility.fieldValue.arrayRemove(runnerID)})
    }
    async incrementUnverifiedRecordNumber(id:string,mode:"+"|"-"){
        this.update(id,{
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(mode === "+" ? 1:-1),
        })
    }
    //#CTODO GameSystemの記録数、走者数とかをインクリメントするメソッドがほしい
     //*> (uid:string) => void
}
