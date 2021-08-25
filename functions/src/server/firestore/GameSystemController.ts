import { IGameSystemInfoWithoutCollections } from "../../../../src/ts/type/list/IGameSystemInfo";
import { PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./IFirestoreCollectionController";


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
    async add(object: WithoutID<HandledType>): Promise<void> {
        await firestoreCollectionUtility.addDoc<HandledType>(this.ref,object,this.transaction)
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id),object,this.transaction)
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.deleteDoc<HandledType>(this.ref.doc(id),this.transaction)
    }
    async update(id: string, object: PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id),object,this.transaction)
    }
    async incrementCounterWhenRecordIsSubmitted(id:string,incrementRunnersNumber:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(1),
            runnersNumber: firestoreCollectionUtility.fieldValue.increment(incrementRunnersNumber ? 1:0),
            dateOfLatestPost: firestoreCollectionUtility.fieldValue.serverTimestamp()
        })
    }
    async decrementCounterWhenRecordIsDeleted(id:string,decrementRunnersNumber:boolean){
        this.update(id,{
            recordsNumber: firestoreCollectionUtility.fieldValue.increment(-1),
            UnverifiedRecordNumber: firestoreCollectionUtility.fieldValue.increment(-1),
            runnersNumber: firestoreCollectionUtility.fieldValue.increment(decrementRunnersNumber ? -1:0)
        })
    }
    async incrementUnverifiedRecordNumber(id:string,mode:"+"|"-"){
        this.update(id,{
            runnersNumber: firestoreCollectionUtility.fieldValue.increment(mode === "+" ? 1:-1),
        })
    }
    //#CTODO GameSystemの記録数、走者数とかをインクリメントするメソッドがほしい
     //*> (uid:string) => void
}
