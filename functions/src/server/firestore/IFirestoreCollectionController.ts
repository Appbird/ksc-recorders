interface IFirestoreCollectionController<T>{
    getCollection():Promise<T[]>
    getInfo(id:string):Promise<T>
    write(object:T):Promise<void>
    modify(id:string,object:T):Promise<void>
    /**
     * @return 消されたオブジェクトを返します。
     */
    delete(id:string):Promise<T>
    update(id:string,object:{[P in keyof T]?:T[P]}):Promise<void>
}