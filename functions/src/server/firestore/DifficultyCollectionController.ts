import { IGameDifficultyItem } from "../../../../src/ts/type/list/IGameDifficultyItem";
import { PartialValueWithFieldValue, Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";

type HandledType = IGameDifficultyItem

export class DifficultyCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,gameModeID:string,
        private transaction?:Transaction) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("difficulties");
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
}
