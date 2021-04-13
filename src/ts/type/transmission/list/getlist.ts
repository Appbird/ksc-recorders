import { IItemOfResolveTableToName } from "../../../server/type/IItemOfResolveTableToName";
import { checkInputObjectWithErrorPossibility } from "../../../utility/InputCheckerUtility";
import { IReceivedDataAtClient, IReceivedDataAtServer } from "../transmissionBase";

//#NOTE SId = gameSystemID, MId = gameModeID
export interface IReceivedDataAtServer_getlist_UseId extends IReceivedDataAtServer{
    id?:string[];
    start?:number;
    limit?:number;
}
export function checker_IReceivedDataAtServer_getlist_UseId(obj:unknown):obj is IReceivedDataAtServer_getlist_UseId{
    return checkInputObjectWithErrorPossibility(obj,{
        id:"string[]?",start:"number?",limit:"number?"
    },"record/getlist_UseId > input")
}


export interface IReceivedDataAtServer_getlist_UseSIdId extends IReceivedDataAtServer{
    gameSystemEnv:{gameSystemID:string}
    id?:string[];
    start?:number;
    limit?:number;
}
export function checker_IReceivedDataAtServer_getlist_UseSIdId(obj:unknown):obj is IReceivedDataAtServer_getlist_UseSIdId{
    return checkInputObjectWithErrorPossibility(obj,{
        gameSystemEnv:{gameSystemID:"string"},id:"string[]?",start:"number?",limit:"number?"
    },"record/getlist_UseSIdId > input")
}


export interface IReceivedDataAtServer_getlist_UseSIdMIdId extends IReceivedDataAtServer{
    gameSystemEnv:{
        gameSystemID:string;
        gameModeID:string;
    },
    id?:string[];
    start?:number;
    limit?:number;
}
export function checker_IReceivedDataAtServer_getlist_UseSIdMIdId(obj:unknown):obj is IReceivedDataAtServer_getlist_UseSIdMIdId{
    return checkInputObjectWithErrorPossibility(obj,{
        gameSystemEnv:{gameSystemID:"string",gameModeID:"string"},id:"string[]?",start:"number?",limit:"number?"
    },"record/getlist_UseSIdMIdId > input")
}


export interface IReceivedDataAtClient_getlist<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient{
    result:T[]
}