import { IGameSystemEnvironment } from "./IGameSystemEnvironment";

export interface IRegulation {
    gameSystemEnvironment:IGameSystemEnvironment;
    abilityIDsOfPlayerCharacters: number[];
    targetID:number;
}