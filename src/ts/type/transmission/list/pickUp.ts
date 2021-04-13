import { IItemOfResolveTableToName } from "../../../server/type/IItemOfResolveTableToName";
import { checkInputObjectWithErrorPossibility } from "../../../utility/InputCheckerUtility";
import { IReceivedDataAtClient, IReceivedDataAtServer } from "../transmissionBase";

export interface IReceivedDataAtServer_pickUp_UseId extends IReceivedDataAtServer{
    id:string;
}
export function checker_IReceivedDataAtServer_pickUp_UseId(obj:unknown):obj is IReceivedDataAtServer_pickUp_UseId{
    return checkInputObjectWithErrorPossibility(obj ,{id:"string"},"list/pickUp_useId")
}


export interface IReceivedDataAtServer_pickUp_UseSIdId extends IReceivedDataAtServer{
    gameSystemEnv:{gameSystemID:string;}
    id:string;
}
export function checker_IReceivedDataAtServer_pickUp_UseSIdId(obj:unknown):obj is IReceivedDataAtServer_pickUp_UseSIdId{
    return checkInputObjectWithErrorPossibility(obj ,{id:"string",gameSystemEnv:{gameSystemID:"string"}},"list/pickUp_useSIdId")
}


export interface IReceivedDataAtServer_pickUp_UseSIdMIdId extends IReceivedDataAtServer{
    gameSystemEnv:{
        gameSystemID:string;
        gameModeID:string;
    }
    id:string;
}
export function checker_IReceivedDataAtServer_pickUp_UseSIdMIdId(obj:unknown):obj is IReceivedDataAtServer_pickUp_UseSIdMIdId{
    return checkInputObjectWithErrorPossibility(obj ,{id:"string",gameSystemEnv:{gameSystemID:"string",gameModeID:"string"}},"list/pickUp_useSIdMIdId")
}
export interface IReceivedDataAtClient_pickUp<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient{
    item:T
}