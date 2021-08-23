import { IRunner } from "../../../../src/ts/type/record/IRunner";
import { firebaseAdmin } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";

type HandledType = IRunner
//#TODO ここで足りてない分を修正する。
//#TODO あとIRecordに対応したやつもつくる。
export class RunnerCollectiCollectionController implements IFirestoreCollectionController<HandledType> {
    private ref: FirebaseFirestore.CollectionReference;
    constructor() {
        this.ref = firebaseAdmin.firestore.collection("runners");
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref);
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id));
    }
    async write(object: HandledType): Promise<void> {
        await firestoreCollectionUtility.writeDoc<HandledType>(this.ref, object);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id), object);
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.deleteDoc<HandledType>(this.ref.doc(id));
    }
    async update(id: string, object: {
        [P in keyof HandledType]?: HandledType[P];
    }): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object);
    }
}
