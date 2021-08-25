import { firebaseAdmin, PartialValueWithFieldValue } from "../function/firebaseAdmin";
import { WithoutID } from "./IFirestoreCollectionController";

const base = {
    getRunnerCollectionRef(){
        return firebaseAdmin.firestore.collection("runners");
    },
    getGameSystemCollectionRef(){
        return firebaseAdmin.firestore.collection("titles");
    },
    getGameSystemItemRef(gameSystemID:string){
        return this.getGameSystemCollectionRef().doc(gameSystemID)
    },
    getGameModeItemRef(gameSystemID:string,gameModeID:string){
        return this.getGameSystemItemRef(gameSystemID).collection("modes").doc(gameModeID);
    },
    runTransaction:firebaseAdmin.firestore.runTransaction,
    fieldValue:firebaseAdmin.firestoreFieldValue
}
export const firestoreCollectionUtility = {
    ...base,
    async getCollection<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>|FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction|undefined):Promise<T[]>{
        if (transaction !== undefined) throw new Error("This method's behabior with transaction is not implemented.")
        const result = await ref.get()
        if (result.empty) return []
        
        return result.docs.map(doc => doc.data()) as T[];
    },
    async getDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction|undefined):Promise<T>{
        if (transaction) return await firestoreTransactionUtility.getDoc(ref,transaction)
        const result = await ref.get()
        if (!result.exists) throw new Error(`[Not Found] ドキュメント ${ref.path} が存在しません。`);
        return result.data() as T;
    },
    async getDocWithPossibilityOfUndefined<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction|undefined):Promise<T|undefined>{
        if (transaction) return await firestoreTransactionUtility.getDocWithPossibilityOfUndefined(ref,transaction)
        const result = await ref.get()
        if (!result.exists) return undefined;
        return result.data() as T;
    },
    async addDoc<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,object:WithoutID<T>,transaction:FirebaseFirestore.Transaction|undefined):Promise<string>{
        if (transaction) return await firestoreTransactionUtility.addDoc(ref,object,transaction)
        const result = ref.doc()
        await ref.doc(result.id).set({...object,id:result.id});
        return result.id;
    },
    async modifyDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:T,transaction:FirebaseFirestore.Transaction|undefined):Promise<void>{
        if (transaction) return await firestoreTransactionUtility.modifyDoc(ref,object,transaction)
        await ref.set(object);
    },
    async updateDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:PartialValueWithFieldValue<T>,transaction:FirebaseFirestore.Transaction|undefined):Promise<void>{
        if (transaction) return await firestoreTransactionUtility.updateDoc(ref,object,transaction)
        await ref.update(object)
    },
    async deleteDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction|undefined):Promise<T>{
        if (transaction) return await firestoreTransactionUtility.deleteDoc(ref,transaction)
        const data = this.getDoc<T>(ref,transaction)
        await ref.delete();
        return data;
    },
}

const firestoreTransactionUtility = {
    async getCollection<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>|FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction):Promise<T[]>{
        throw new Error("This method is not implemented.")
    },
    async getDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction):Promise<T>{
        const result = await transaction.get(ref)
        if (!result.exists) throw new Error(`[Not Found] ドキュメント ${ref.path} が存在しません。`);
        return result.data() as T;
    },
    async getDocWithPossibilityOfUndefined<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction):Promise<T|undefined>{
        const result = await transaction.get(ref)
        if (!result.exists) return undefined
        return result.data() as T;
    },
    async addDoc<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,object:T,transaction:FirebaseFirestore.Transaction):Promise<string>{
        const result = await ref.doc()
        await transaction.set(ref.doc(result.id),{...object,id:result.id})
        return result.id;
    },
    async modifyDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:T,transaction:FirebaseFirestore.Transaction):Promise<void>{
        await transaction.set(ref,object)
    },
    async updateDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:PartialValueWithFieldValue<T>,transaction:FirebaseFirestore.Transaction):Promise<void>{
        await transaction.update(ref,object)
    },
    async deleteDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,transaction:FirebaseFirestore.Transaction):Promise<T>{
        const data = this.getDoc<T>(ref,transaction)
        await transaction.delete(ref)
        return data;
    },
}