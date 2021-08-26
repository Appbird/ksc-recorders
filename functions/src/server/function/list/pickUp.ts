import { IReceivedDataAtServer_pickUp_UseSIdMIdAIdId } from "../../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdAIdId";
import { IReceivedDataAtServer_pickUp_UseSIdMIdId } from "../../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId";
import { IReceivedDataAtServer_pickUp_UseSIdId } from "../../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId";
import { IReceivedDataAtServer_pickUp_UseId } from "../../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId";
import { ILabelledDocument } from "../../../../../src/ts/type/list/ILabelledDocument";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { IReceivedDataAtClient_pickUp } from "../../../../../src/ts/type/api/list/IReceivedDataAtClient_pickUp";
import { APIFunctions } from "../../../../../src/ts/type/api/relation";
 
async function pickUp_UseId<T extends ILabelledDocument>(input:IReceivedDataAtServer_pickUp_UseId, searchFunc:(id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result: await searchFunc(input.id)}
}
async function pickUp_UseSIdId<T extends ILabelledDocument>(input:IReceivedDataAtServer_pickUp_UseSIdId, searchFunc:(gameSystemID:string,id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result:await searchFunc(input.gameSystemEnv.gameSystemID,input.id)}
}
async function pickUp_UseSIdMIdId<T extends ILabelledDocument>(input:IReceivedDataAtServer_pickUp_UseSIdMIdId, searchFunc:(gameSystemID:string,gameModeID:string,id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result:await searchFunc(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)}
}
async function pickUp_UseSIdMIdAIdId<T extends ILabelledDocument>(input:IReceivedDataAtServer_pickUp_UseSIdMIdAIdId, searchFunc:(gameSystemID:string,gameModeID:string,abilityAttributeID:string,id:string)=>Promise<T>):Promise<IReceivedDataAtClient_pickUp<T>>{
    return {isSucceeded:true,result:await searchFunc(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.abilityAttributeID,input.id)}
}

export const gameSystem    = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseId) =>  pickUp_UseId(input,(id) => database.getGameSystemInfo(id))
export const runner        = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseId) =>  pickUp_UseId(input,(id) => database.getRunnerInfo(id))

export const gameMode    = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseSIdId) =>  pickUp_UseSIdId(input,(s,id) => database.getGameModeInfo(s,id))
export const hashTag       = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseSIdId) =>  pickUp_UseSIdId(input,(s,id) => database.getHashTagInfo(s,id))

export const target        = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getTargetInfo(s,m,id))
export const ability      = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getAbilityInfo(s,m,id))
export const difficulty   = (database:RecordDataBase,input:IReceivedDataAtServer_pickUp_UseSIdMIdId) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getGameDifficultyInfo(s,m,id))

export const abilityAttribute      = async (database:RecordDataBase,input:APIFunctions["list_abilityAttribute"]["atServer"]) =>  pickUp_UseSIdMIdId(input,(s,m,id) => database.getAbilityAttributeInfo(s,m,id))
export const abilityAttributeFlag  = async (database:RecordDataBase,input:APIFunctions["list_abilityAttributeFlag"]["atServer"]) =>  pickUp_UseSIdMIdAIdId(input,(s,m,a,id) => database.getAbilityAttributeFlagInfo(s,m,a,id))
