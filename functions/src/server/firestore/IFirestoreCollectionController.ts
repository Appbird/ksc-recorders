import { PartialValueWithFieldValue } from "../function/firebaseAdmin";

export type WithoutID<T> = {[P in keyof T]: P extends "id" ? undefined:T[P]}
export interface IFirestoreCollectionController<T>{
    getCollection():Promise<T[]>
    getInfo(id:string):Promise<T>
    add?(object:WithoutID<T>):Promise<void>
    modify?(id:string,object:T):Promise<void>
    /**
     * @return 消されたオブジェクトを返します。
     */
    delete?(id:string,deletedBy?:string):Promise<T>
    update?(id:string,object:PartialValueWithFieldValue<T>):Promise<void>
    readonly ref:FirebaseFirestore.CollectionReference
}
