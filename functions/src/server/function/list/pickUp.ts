import { CollectionList, generateCollectionController } from "../../firestore/FirestoreCollectionList";

interface IReceivedDataAtServer_pickUp{
    gameSystemEnv?: {
        gameSystemID?: string;
        gameModeID?: string;
    };
    abilityAttributeID?:string;
    id: string;
}
export function pickUp<T extends keyof CollectionList>(collectionName:T){
    return async (input:IReceivedDataAtServer_pickUp) => {
        return {
            isSucceeded:true,
            result:await generateCollectionController(collectionName,input).getInfo(input.id)
        }
    }
}
