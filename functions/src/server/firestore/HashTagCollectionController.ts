import { IHashTagItem } from "../../../../src/ts/type/list/IGameSystemInfo";
import { PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./IFirestoreCollectionController";

type HandledType = IHashTagItem

export class HashTagCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,
        private transaction?:FirebaseFirestore.Transaction
    ) {
        this.ref = firestoreCollectionUtility.getGameSystemItemRef(gameSystemID).collection("tags");
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
        return firestoreCollectionUtility.deleteDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object: PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object,this.transaction);
    }
    async verifiedHashTag(id:string){
        this.update(id,{
            isApproved: true    
        })
    }
}
