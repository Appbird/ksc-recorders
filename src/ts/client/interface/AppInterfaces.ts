import { LanguageInApplication } from "../../server/type/LanguageInApplication";
import { PageStates } from "./PageStates";

export interface IAppOnlyUsedToTransition{
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T]) => void
}
export interface IAppUsedToReadOptionsAndTransition{
    gameSystemID:string | null,
    gameModeID:string | null,
    superiorScore:"Lower"|"Higher"
    language:LanguageInApplication,
    transition:<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T]) => void
}