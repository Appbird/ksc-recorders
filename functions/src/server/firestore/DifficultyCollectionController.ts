import { IGameDifficultyItem } from "../../../../src/ts/type/list/IGameDifficultyItem";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";

type HandledType = IGameDifficultyItem

export class DifficultyCollectionController implements IFirestoreCollectionController<HandledType> {
    private ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,gameModeID:string) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("difficulties");
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
