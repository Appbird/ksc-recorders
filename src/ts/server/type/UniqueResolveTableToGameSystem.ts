import { IItemOfResolveTableToName } from "../DataBase/ControllerOfTableForResolvingID";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 */
export interface UniqueResolveTableToGameSystem {
    AbilityList: AbilityList[];

    TargetList: TargetList[];
    GameModeList: GameModeList[];
    //#NOTE ターゲットについてはID解決テーブルという目的以上に難易度に所属するターゲットを示す目的もあることに注意
    GameDifficultyList: GameDifficultyList[];
}

export interface AbilityList extends IItemOfResolveTableToName {
}
export interface TargetList extends IItemOfResolveTableToName{
}
export interface GameModeList extends IItemOfResolveTableToName{
    JDescription?: string
    EDescription?: string
}
export interface GameDifficultyList extends IItemOfResolveTableToName{
    IDsOfTargetIncludedInTheDifficulty?:number[]
}