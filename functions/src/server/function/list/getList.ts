import { CollectionList, generateCollectionController } from "../../firestore/base/FirestoreCollectionList";
 

export function getList<T extends keyof CollectionList>(collectionName:T){
    return async (input:IReceivedDataAtServer_getList) => {
        if (input.start === undefined) input.start = 0;
        const end = (input.limit === undefined) ? undefined : input.start + input.limit
        const result = (await generateCollectionController(collectionName,input).getCollection()).slice(input.start,end);
        if ( input.id === undefined ) return {isSucceeded:true, result:result}
        return {
            isSucceeded:true,
            result: input.id.map((id) => {
                const found = result.find( item => (item as {id?:string}).id === id)
                if (found === undefined) throw new Error(`番号${id}に対応するアイテムが存在しません。`)
                return found
            })
        }
    }
}
interface IReceivedDataAtServer_getList{
    gameSystemEnv?: {
        gameSystemID?: string;
        gameModeID?: string;
    };
    abilityAttributeID?:string;
    id?: string[];
    start?: number;
    limit?: number;
}