import { INotificationItem } from "../../../../src/ts/type/record/IRunner";
import { Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./base/FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./base/IFirestoreCollectionController";
import { RunnerCollectionController } from "./RunnerCollectionController";

type HandledType = INotificationItem

export class NotificationListController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(private runnerID:string,
        private transaction?:Transaction) {
        this.ref = firestoreCollectionUtility.getRunnerCollectionRef().doc(runnerID).collection("notifications");
    }
    async getCollection(): Promise<HandledType[]> {
        const list = await firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction)
        return list.sort((a,b) => b.postedDate - a.postedDate);
    }
    getInfo(id: string): Promise<HandledType> {
        
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async add(object: WithoutID<HandledType>): Promise<string> {
        const runnerC = new RunnerCollectionController()
        await runnerC.update(this.runnerID,{
            numberOfUnreadNotification: firestoreCollectionUtility.fieldValue.increment(1)
        },{privateDocWrite:false});
        return firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);;
    }
    async readNotification(){
        await new RunnerCollectionController().update(this.runnerID,{
            numberOfUnreadNotification: 0
        },{privateDocWrite:false});
    }
}
