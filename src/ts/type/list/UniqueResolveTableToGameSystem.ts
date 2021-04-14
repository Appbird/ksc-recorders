import { IRecord } from "../record/IRecord";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 */
export type IGameModeItem = IGameModeItemWithoutCollections & CollectionsInIGameModeItem
 export interface IGameModeItemWithoutCollections extends IItemOfResolveTableToName{
    JDescription?: string
    EDescription?: string
}
export interface CollectionsInIGameModeItem{
    targets: ITargetItem[];
    difficulties: IGameDifficultyItem[];
    abilities: IAbilityItem[];
    records:IRecord[];
}
export interface UniqueResolveTableToGameSystem {
    GameModeList: IGameModeItem[];
}
export interface IAbilityItem extends IItemOfResolveTableToName{
}
export interface ITargetItem extends IItemOfResolveTableToName{
}

export interface IGameDifficultyItem extends IItemOfResolveTableToName{
    TargetIDsIncludedInTheDifficulty:string[]
}