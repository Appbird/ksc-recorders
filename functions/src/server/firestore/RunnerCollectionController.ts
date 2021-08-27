import { IRunner, IRunnerEditable, IRunnerUneditable } from "../../../../src/ts/type/record/IRunner";
import { firebaseAdmin, PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { createDefaultUserData } from "../utility";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController } from "./IFirestoreCollectionController";

type HandledType = IRunner
//#CTODO ここで足りてない分を修正する。
//#CTODO あとIRecordに対応したやつもつくる。
export class RunnerCollectionController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(
        private transaction?:FirebaseFirestore.Transaction
    ) {
        this.ref = firestoreCollectionUtility.getRunnerCollectionRef()
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction);
    }
    async getInfo(uid: string): Promise<HandledType> {
        const info = await firestoreCollectionUtility.getDocWithPossibilityOfUndefined<IRunnerEditable>(this.ref.doc(uid),this.transaction)
        const infoLimitedWrite = await firestoreCollectionUtility.getDocWithPossibilityOfUndefined<IRunnerUneditable>(this.ref.doc(uid).collection("limitedWrite").doc("onlyServerOperation"),this.transaction)
        
        if (info !== undefined && infoLimitedWrite !== undefined) return {...info,...infoLimitedWrite} as IRunner;
        const user = await firebaseAdmin.auth.getUser(uid)
        const userData = createDefaultUserData(user);
        this.modify(uid,userData,{privateDocWrite:true});
        return userData
    }
    /**@throws この操作は許可されていません。必ずエラーがthrowされます。 */
    async add(): Promise<string> {
        throw new Error("[RunnerCollectionController] It is not allowed to add a new item to the Runner Collection through pickUp API. You should add a new runner by user authorization.")
    }
    /**@remarks この操作はIDTokenを用いた認証後に行われるべきです。 */
    async modify(uid: string, object: HandledType,{privateDocWrite=true}:{privateDocWrite?:boolean}={}): Promise<void> {
        const {Japanese,English,JDescription,EDescription,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification,...Uneditabledata}:IRunner = object;
        const data:IRunnerEditable = {Japanese,English,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification}
        if (JDescription !== undefined) object.JDescription = JDescription;
        if (EDescription !== undefined) object.EDescription = EDescription;
        firestoreCollectionUtility.modifyDoc<IRunnerEditable>(this.ref.doc(uid),data,this.transaction)
        if (privateDocWrite) firestoreCollectionUtility.modifyDoc<IRunnerUneditable>(this.ref.doc(uid).collection("limitedWrite").doc("onlyServerOperation"),Uneditabledata,this.transaction)
    }
    /**@remarks この操作はIDTokenを用いた認証後に行われるべきです。 */
    async delete(uid: string): Promise<HandledType> {
        throw new Error("[Runner Collection Controller] This method is not implemented now.")
    }
    /**@remarks この操作はIDTokenを用いた認証後に行われるべきです。 */
    async update(uid: string, object: PartialValueWithFieldValue<HandledType>,{privateDocWrite=true}:{privateDocWrite?:boolean}={}): Promise<void> {
        const {Japanese,English,JDescription,EDescription,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification,...Uneditabledata}:PartialValueWithFieldValue<HandledType> = object;
        const data:PartialValueWithFieldValue<IRunnerEditable> = {Japanese,English,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification}
        
        if (JDescription !== undefined) object.JDescription = JDescription;
        if (EDescription !== undefined) object.EDescription = EDescription;
        firestoreCollectionUtility.updateDoc<IRunnerEditable>(this.ref.doc(uid),data,this.transaction)
        if (privateDocWrite) firestoreCollectionUtility.updateDoc<IRunnerUneditable>(this.ref.doc(uid).collection("limitedWrite").doc("onlyServerOperation"),Uneditabledata,this.transaction)

    }
    /**
     * 
     * @param runner IDを与えることが出来ます。
     */
    async incrementPlayCount(runner:string|IRunner,gameSystemID:string,gameModeID:string){
        const runnerInfo = (typeof runner === "string") ? await this.getInfo(runner):runner 
        runnerInfo.idOfGameSystemRunnerHavePlayed = incrementCounterInRunner(gameSystemID,runnerInfo.idOfGameSystemRunnerHavePlayed)
        runnerInfo.idOfGameModeRunnerHavePlayed = incrementCounterInRunner(`${gameSystemID}/${gameModeID}`,runnerInfo.idOfGameModeRunnerHavePlayed)
        await this.update(runnerInfo.id,{
            idOfGameSystemRunnerHavePlayed: runnerInfo.idOfGameSystemRunnerHavePlayed,
            idOfGameModeRunnerHavePlayed: runnerInfo.idOfGameModeRunnerHavePlayed,
            theDateOfLastPost: firestoreCollectionUtility.fieldValue.serverTimestamp()
        })
    }
    async decrementPlayCount(runner:string|IRunner,gameSystemID:string,gameModeID:string){
        const runnerInfo = (typeof runner === "string") ? await this.getInfo(runner):runner
        runnerInfo.idOfGameSystemRunnerHavePlayed = decrementCounterInRunner(runnerInfo.id,runnerInfo.idOfGameSystemRunnerHavePlayed)
        runnerInfo.idOfGameModeRunnerHavePlayed = decrementCounterInRunner(runnerInfo.id,runnerInfo.idOfGameModeRunnerHavePlayed)
        await this.update(runnerInfo.id,{
            idOfGameSystemRunnerHavePlayed: runnerInfo.idOfGameSystemRunnerHavePlayed,
            idOfGameModeRunnerHavePlayed: runnerInfo.idOfGameModeRunnerHavePlayed
        })
    }
    //#CTODO SendNotificationsとReadNotificationsを実装 => NotificationListControllerへ分離
}

function incrementCounterInRunner(id:string,playedList:{id:string,times:number}[]){
    const result = playedList.find(item => item.id === id)
    const Index = (result === undefined) ? playedList.push({id,times:0}) - 1 : -1
    const target = (result === undefined) ? playedList[Index]:result
    target.times += 1
    return playedList;
}
function decrementCounterInRunner(id:string,playedList:{id:string,times:number}[]){
    const result = playedList.find(item => item.id === id)
    const Index = (result === undefined) ? playedList.push({id,times:1}) - 1 : -1
    const target = (result === undefined) ? playedList[Index]:result
    target.times -= 1
    return playedList;
}