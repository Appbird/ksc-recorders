import { expected_IGameSystemEnvironment, IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDs: string[];
    targetID:string;
}
export const expected_IRegulation = {
    gameSystemEnvironment:expected_IGameSystemEnvironment,
    abilityIDs: "string[]",
    targetID:"string",
}
export interface IRegulationResolved extends IRegulation {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilityNames: string[];
    targetName:string;
}