import { icooonResolvable } from "../foundation/icooonResolvable";
import { IRecord } from "../record/IRecord";
import { IAbilityItem } from "./IAbilityItem";
import { IGameDifficultyItem } from "./IGameDifficultyItem";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";
import { ITargetItem } from "./ITargetItem";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 */
export type ScoreType = "score"|"time";
export type IGameModeItem = IGameModeItemWithoutCollections & CollectionsInIGameModeItem
export interface IGameModeItemWithoutCollections extends IItemOfResolveTableToName,icooonResolvable{
    runnersNumber:number;
    recordsNumber:number;
    dateOfLatestPost:number;
    maxNumberOfPlayer:number;
    scoreType:ScoreType;
}
export interface CollectionsInIGameModeItem{
    targets: ITargetItem[];
    difficulties: IGameDifficultyItem[];
    abilities: IAbilityItem[];
    records:IRecord[];
}
