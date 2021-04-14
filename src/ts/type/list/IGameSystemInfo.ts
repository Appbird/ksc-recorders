import { IRecord } from "../record/IRecord";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";
import { GameModeItem } from "./UniqueResolveTableToGameSystem";

export interface IGameSystemInfo extends IItemOfResolveTableToName {
    id: string;
    JName: string;
    EName: string;
    tags:HashTagItem[];
    JDescription?: string;
    EDescription?: string;
    modes : GameModeItem[];
}


export interface HashTagItem extends IItemOfResolveTableToName{
    description?:string;
}