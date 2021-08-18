import { IReceivedDataAtServer_getlist_UseSIdMIdId } from "../../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId";
import { IReceivedDataAtServer_getlist_UseSIdId } from "../../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId";
import { IReceivedDataAtServer_getlist_UseId } from "../../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseId";
import { IItemOfResolveTableToName } from "../../../../../src/ts/type/list/IItemOfResolveTableToName";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { IReceivedDataAtClient_getlist } from "../../../../../src/ts/type/api/list/IReceivedDataAtClient_getlist";
import { APIFunctions } from "../../../../../src/ts/type/api/relation";
 
function searchBasedOnIDList<T extends IItemOfResolveTableToName>(inputIdList:string[],data:T[]):T[]{
    const idList = inputIdList.concat();
    return data.filter(item => {
        const search = idList.findIndex((id) => item.id === id)
        if (search === -1) return false;
        idList.splice(search,1)
        return true;
    })
}
async function modifyList_UseId<T extends IItemOfResolveTableToName>(
    input:IReceivedDataAtServer_getlist_UseId, searchFunc:()=>Promise<T[]>):Promise<IReceivedDataAtClient_getlist<T>>{

    if (input.start === undefined) input.start = 0;
    const end = (input.limit === undefined) ? undefined : input.start + input.limit
    const result = (await searchFunc()).slice(input.start,end);
    if ( input.id === undefined ) return {isSucceeded:true, result:result}
    return {isSucceeded:true,result:searchBasedOnIDList(input.id,result)}
}
async function modifyList_UseSIdId<T extends IItemOfResolveTableToName>(
    input:IReceivedDataAtServer_getlist_UseSIdId, searchFunc:(gameSystemID:string)=>Promise<T[]>):Promise<IReceivedDataAtClient_getlist<T>>{

    if (input.start === undefined) input.start = 0;
    const end = (input.limit === undefined) ? undefined : input.start + input.limit
    const result = (await searchFunc(input.gameSystemEnv.gameSystemID)).slice(input.start,end);
    if ( input.id === undefined ) return {isSucceeded:true, result:result}
    return {isSucceeded:true,result:searchBasedOnIDList(input.id,result)}
}
async function modifyList_UseSIdMIdId<T extends IItemOfResolveTableToName>(
    input:IReceivedDataAtServer_getlist_UseSIdMIdId, searchFunc:(gameSystemID:string,gameModeID:string)=>Promise<T[]>):Promise<IReceivedDataAtClient_getlist<T>>{
    if (input.start === undefined) input.start = 0;
    const end = (input.limit === undefined) ? undefined : input.start + input.limit
    const result = (await searchFunc(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID)).slice(input.start,end);
    if ( input.id === undefined ) return {isSucceeded:true, result:result}
    return {isSucceeded:true,result:searchBasedOnIDList(input.id,result)}
}

export const gameSystems    = async (database:RecordDataBase,input:APIFunctions["list_gameSystems"]["atServer"],) =>  modifyList_UseId(input,() => database.getGameSystemCollection())
export const runners        = async (database:RecordDataBase,input:APIFunctions["list_runners"]["atServer"]) =>  modifyList_UseId(input,() => database.getRunnerCollection())

export const gameModes    = async (database:RecordDataBase,input:APIFunctions["list_gameModes"]["atServer"]) =>  modifyList_UseSIdId(input,(s) => database.getGameModeCollection(s))
export const hashTags       = async (database:RecordDataBase,input:APIFunctions["list_hashTags"]["atServer"]) =>  modifyList_UseSIdId(input,(s) => database.getHashTagCollection(s))

export const targets        = async (database:RecordDataBase,input:APIFunctions["list_targets"]["atServer"]) =>  modifyList_UseSIdMIdId(input,(s,m) => database.getTargetCollection(s,m))
export const abilities      = async (database:RecordDataBase,input:APIFunctions["list_abilities"]["atServer"]) =>  modifyList_UseSIdMIdId(input,(s,m) => database.getAbilityCollection(s,m))
export const difficulties   = async (database:RecordDataBase,input:APIFunctions["list_difficulties"]["atServer"]) =>  modifyList_UseSIdMIdId(input,(s,m) => database.getGameDifficultyCollection(s,m))

