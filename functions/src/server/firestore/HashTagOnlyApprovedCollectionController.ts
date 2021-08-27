import { IHashTagItem } from "../../../../src/ts/type/list/IGameSystemInfo";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController } from "./IFirestoreCollectionController";

type HandledType = IHashTagItem

export class HashTagOnlyApprovedCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,
        private transaction?:FirebaseFirestore.Transaction
    ) {
        this.ref = firestoreCollectionUtility.getGameSystemItemRef(gameSystemID).collection("tags");
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref.where("isApproved","==",true),this.transaction);
    }
    async getInfo(id: string): Promise<HandledType> {
        const result = await firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction);
        if (!result.isApproved) throw new Error(`[HashTagOnlyApprovedCollectionController] This tag(id:${id}) is not approved.`)
        return result;
    }
}
