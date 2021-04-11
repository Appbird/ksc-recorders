import { IRecord } from "../../type/record/IRecord";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 */
 export interface GameModeItem extends IItemOfResolveTableToName{
    abilities: AbilityItem[];
    records:IRecord[];
    targets: TargetItem[];
    difficulties: GameDifficultyItem[];
    JDescription?: string
    EDescription?: string
    
}
export interface UniqueResolveTableToGameSystem {
    GameModeList: GameModeItem[];
}
export interface AbilityItem extends IItemOfResolveTableToName{
}
export interface TargetItem extends IItemOfResolveTableToName{
}

export interface GameDifficultyItem extends IItemOfResolveTableToName{
    TargetIDsIncludedInTheDifficulty:string[]
}