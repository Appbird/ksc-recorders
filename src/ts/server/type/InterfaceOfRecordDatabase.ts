import { IRecord } from "../../type/record/IRecord";
import { OrderOfRecordArray } from "./OrderOfRecordArray";
import { AbilityItem, GameDifficultyItem, GameModeItem, TargetItem } from "./UniqueResolveTableToGameSystem";
import { HashTagItem, IGameSystemInfo } from "./IGameSystemInfo";
import { IRunner } from "../../type/record/IRunner";

//[x] getRecordsWithConditionメソッドの実装
export interface InterfaceOfRecordDatabase {
    getGameSystemCollection: () => Promise<IGameSystemInfo[]>;
    getGameSystemInfo: (gameSystemID: string) => Promise<IGameSystemInfo>;
    
    getGameModeCollection:(gameSystemID: string) => Promise<GameModeItem[]>;
    getGameModeInfo: (gameSystemID: string, gameModeID: string) => Promise<GameModeItem>;

    getRunnerCollection: () => Promise<IRunner[]>;
    getRunnerInfo: (id:string) => Promise<IRunner>;

    getTargetCollection: (gameSystemID: string, gameModeID: string) => Promise<TargetItem[]>;
    getTargetInfo: (gameSystemID: string, gameModeID: string,id:string) => Promise<TargetItem>;

    getAbilityCollection: (gameSystemID: string, gameModeID: string) => Promise<AbilityItem[]>;
    getAbilityInfo: (gameSystemID: string, gameModeID: string, id:string) => Promise<AbilityItem>;

    getGameDifficultyCollection: (gameSystemID: string, gameModeID: string) => Promise<GameDifficultyItem[]>;
    getGameDifficultyInfo: (gameSystemID: string, gameModeID: string,id:string) => Promise<GameDifficultyItem>;

    getHashTagCollection: (gameSystemID: string) => Promise<HashTagItem[]>;
    getHashTagInfo: (gameSystemID: string,id:string) => Promise<HashTagItem>;

    getRecord: (gameSystemID: string, gameModeID: string,recordID:string) => Promise<IRecord>;
    getRecordsWithCondition: (gameSystemID: string, gameModeID: string,
        order: OrderOfRecordArray,
        abilityIDsCondition?: "AND" | "OR" | "AllowForOrder",
        abilityIDs?: string[],
        targetIDs?: string[],
        runnerIDs?: string[]
    ) => Promise<IRecord[]>;
}
