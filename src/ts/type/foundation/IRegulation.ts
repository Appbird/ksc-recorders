import { IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDsOfPlayerCharacters: number[];
    targetID:number;
}
export interface IRegulationResolved {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilityNamesOfPlayerCharacters: string[];
    targetName:string;
}