import { expected_IGameSystemEnvironment, IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export type AbilityAttribute = {attributeID:string,onFlagIDs:string[]}
export type OnePlayerOfAbilityAttribute = AbilityAttribute[]

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDs: string[];
    targetID:string;
    abilitiesAttributeIDs?:OnePlayerOfAbilityAttribute[]
}
export interface IRegulationWritedInDataBase {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDs: string[];
    targetID:string;
    abilitiesAttributeIDs?:string
}
export const expected_IRegulation = {
    gameSystemEnvironment:expected_IGameSystemEnvironment,
    abilityIDs: "string[]",
    targetID:"string",
}

export type AbilityAttributeResolved = {attributeName:string,onFlagNames:string[]}
export type OnePlayerOfAbilityAttributeResolved = AbilityAttributeResolved[]

export interface IRegulationResolved extends IRegulation {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilitiesAttributeNames?:OnePlayerOfAbilityAttributeResolved[]
    abilityNames: string[];
    targetName:string;
}