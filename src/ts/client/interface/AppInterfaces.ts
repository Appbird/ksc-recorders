import { StateAdministerReadOnly } from "../administers/StateAdminister";
import { PageStates } from "./PageStates";


export interface IAppOnlyUsedToTransition{
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}
export interface IAppUsedToReadOptionsAndTransition{
    state:StateAdministerReadOnly
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}