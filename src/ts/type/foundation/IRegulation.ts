import { IGameSystemEnvironment, IGameSystemEnvironmentWithName } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDsOfPlayerCharacters: number[];
    targetID:number;
}
export interface IRegulationWithName {
    gameSystemEnvironment:IGameSystemEnvironmentWithName;
    abilityIDsOfPlayerCharacters: number[];
    abilityNamesOfPlayerCharacters: string[];
    targetID:number;
    targetName:string;
}