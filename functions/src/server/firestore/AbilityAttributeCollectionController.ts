import { IAbilityAttributeItemWithoutCollections } from "../../../../src/ts/type/list/IAbilityAttributeItemWithoutCollections";
import { PartialValueWithFieldValue, Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./IFirestoreCollectionController";

type HandledType = IAbilityAttributeItemWithoutCollections

export class AbilityAttributeCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,gameModeID:string,
        private transaction?:Transaction    
    ) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("abilityAttributes");
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction);
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async add(object: WithoutID<HandledType>): Promise<string> {
        return await firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.deleteDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object:PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object,this.transaction);
    }
}
