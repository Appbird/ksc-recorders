import { APIFunctions } from "../../type/api/relation";
import { StateAdministerReadOnly } from "../administers/StateAdminister";
import { PageStates } from "./PageStates";


export interface IAppOnlyUsedToTransition{
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}
export interface IAppUsedToReadOptionsAndTransition{
    state:StateAdministerReadOnly
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}
export interface IAppUsedToReadOptionsTransitionUseAPI{
    state:StateAdministerReadOnly
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
    accessToAPI:<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
}