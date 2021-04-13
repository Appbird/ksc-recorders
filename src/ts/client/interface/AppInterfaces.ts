import { LanguageInApplication } from "../../server/type/LanguageInApplication";
import { PageStates } from "./PageStates";


export interface IAppOnlyUsedToTransition{
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}
export interface IAppUsedToReadOptionsAndTransition{
    gameSystemID:string | null,
    gameModeID:string | null,
    nowState:keyof PageStates
    nowRequiredObject:PageStates[keyof PageStates]
    superiorScore:"Lower"|"Higher"
    language:LanguageInApplication,
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory?:boolean) => void
}