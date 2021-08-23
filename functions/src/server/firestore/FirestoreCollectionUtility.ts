import { firebaseAdmin } from "../function/firebaseAdmin";

export const firestoreCollectionUtility = {
    getGameSystemCollectionRef(){
        return firebaseAdmin.firestore.collection("titles");
    },
    getGameSystemItemRef(gameSystemID:string){
        return this.getGameSystemCollectionRef().doc(gameSystemID)
    },
    getGameModeItemRef(gameSystemID:string,gameModeID:string){
        return this.getGameSystemItemRef(gameSystemID).collection("modes").doc(gameModeID);
    },
    
    async getCollection<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>|FirebaseFirestore.Query<FirebaseFirestore.DocumentData>):Promise<T[]>{
        const result = await ref.get()
        if (result.empty) return []
        
        return result.docs.map(doc => doc.data()) as T[];
    },
    async getDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>):Promise<T>{
        const result = await ref.get()
        if (!result.exists) throw new Error(`[Not Found] ドキュメント ${ref.path} が存在しません。`);
        return result.data() as T;
    },
    async writeDoc<T>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,object:T):Promise<string>{
        const result = await ref.add(object);
        await ref.doc(result.id).set({...object,id:result.id});
        return result.id;
    },
    async modifyDoc<T extends {id:string},>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:T):Promise<void>{
        object.id = ref.id;
        await ref.set(object);
    },
    async updateDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:{[P in keyof T]?:T[P]}):Promise<void>{
        await ref.update(object)
    },
    async deleteDoc<T>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>):Promise<T>{
        const data = this.getDoc<T>(ref)
        await ref.delete();
        return data;
    }
}