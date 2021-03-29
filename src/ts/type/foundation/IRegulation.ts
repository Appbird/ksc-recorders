import { expected_IGameSystemEnvironment, IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDsOfPlayerCharacters: string[];
    targetID:string;
}
export const expected_IRegulation = {
    gameSystemEnvironment:expected_IGameSystemEnvironment,
    abilityIDsOfPlayerCharacters: "string[]",
    targetID:"string",
}
export interface IRegulationResolved extends IRegulation {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilityNamesOfPlayerCharacters: string[];
    targetName:string;
}