import { IAbilityAttributeFlagItem } from "../../../../src/ts/type/list/IAbilityAttributeItemWithoutCollections";
import { PartialValueWithFieldValue, Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";

type HandledType = IAbilityAttributeFlagItem

export class AbilityAttributeFlagsCollectiCollectionController implements IFirestoreCollectionController<HandledType> {
    private readonly baseRef:FirebaseFirestore.CollectionReference;
    private _ref: FirebaseFirestore.CollectionReference;
    get ref(){
        return this._ref
    }
    constructor(gameSystemID:string,gameModeID:string,attributeID:string,
        private transaction?:Transaction) {
        this.baseRef = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("abilityAttributes")
        this._ref = this.baseRef.doc(attributeID).collection("flags");
    }
    changeRef(attributeID:string){
        this._ref = this.baseRef.doc(attributeID).collection("flags");
        return this;
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this._ref,this.transaction);
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this._ref.doc(id),this.transaction);
    }
    add(object: WithoutID<HandledType>): Promise<string> {
        return firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this._ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getAndDeleteDoc<HandledType>(this._ref.doc(id),this.transaction);
    }
    async update(id: string, object: PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this._ref.doc(id), object,this.transaction);
    }
}
