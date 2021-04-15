import { IRecord } from "../record/IRecord";
import { IAbilityItem } from "./IAbilityItem";
import { IGameDifficultyItem } from "./IGameDifficultyItem";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";
import { ITargetItem } from "./ITargetItem";

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
