import { PartialValueWithFieldValue } from "../../function/firebaseAdmin";

export type WithoutID<T> = Omit<T,"id">
export interface IFirestoreCollectionController<T>{
    getCollection():Promise<T[]>
    getInfo(id:string):Promise<T>
    /**
     * @returns 追加されたドキュメントのidを返します。
     */
    add?(object:WithoutID<T>):Promise<string>
    modify?(id:string,object:T):Promise<void>
    /**
     * @returns 消されたオブジェクトを返します。
     */
    delete?(id:string,deletedBy?:string):Promise<T>
    update?(id:string,object:PartialValueWithFieldValue<T>):Promise<void>
    readonly ref:FirebaseFirestore.CollectionReference
}
