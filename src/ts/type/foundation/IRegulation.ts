import { IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDsOfPlayerCharacters: number[];
    targetID:number;
}
export interface IRegulationResolved {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilityIDsOfPlayerCharacters: number[];
    targetID:number;
    abilityNamesOfPlayerCharacters: string[];
    targetName:string;
}