import { expected_IGameSystemEnvironment, IGameSystemEnvironment, IGameSystemEnvironmentResolved } from "./IGameSystemEnvironment";

export type OnePlayerOfAbilityAttribute = AbilityAttribute[]
export type AbilityAttribute = {attributeID:string,onFlagIDs:string[]}
export type OnePlayerOfAbilityAttributeResolved = AbilityAttributeResolved[]
export type AbilityAttributeResolved = {attributeName:string,onFlagNames:string[]}

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDs: string[];
    targetID:string;
    abilitiesAttributeIDs?:OnePlayerOfAbilityAttribute[]
}
export const expected_IRegulation = {
    gameSystemEnvironment:expected_IGameSystemEnvironment,
    abilityIDs: "string[]",
    targetID:"string",
}
export interface IRegulationResolved extends IRegulation {
    gameSystemEnvironment:IGameSystemEnvironmentResolved;
    abilitiesAttributeNames?:OnePlayerOfAbilityAttributeResolved[]
    abilityNames: string[];
    targetName:string;
}