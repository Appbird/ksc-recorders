import { IRecord } from "../../type/record/IRecord";
import { OrderOfRecordArray } from "./OrderOfRecordArray";
import { IGameModeItem, IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";
import { IGameDifficultyItem } from "../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../type/list/ITargetItem";
import { IAbilityItem } from "../../type/list/IAbilityItem";
import { IHashTagItem, IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { IRunner } from "../../type/record/IRunner";

//[x] getRecordsWithConditionメソッドの実装
export interface InterfaceOfRecordDatabase {
    getGameSystemCollection: () => Promise<IGameSystemInfoWithoutCollections[]>;
    getGameSystemInfo: (gameSystemID: string) => Promise<IGameSystemInfoWithoutCollections>;
    
    getGameModeCollection:(gameSystemID: string) => Promise<IGameModeItemWithoutCollections[]>;
    getGameModeInfo: (gameSystemID: string, gameModeID: string) => Promise<IGameModeItemWithoutCollections>;

    getRunnerCollection: () => Promise<IRunner[]>;
    getRunnerInfo: (id:string) => Promise<IRunner>;

    getTargetCollection: (gameSystemID: string, gameModeID: string) => Promise<ITargetItem[]>;
    getTargetInfo: (gameSystemID: string, gameModeID: string,id:string) => Promise<ITargetItem>;

    getAbilityCollection: (gameSystemID: string, gameModeID: string) => Promise<IAbilityItem[]>;
    getAbilityInfo: (gameSystemID: string, gameModeID: string, id:string) => Promise<IAbilityItem>;

    getGameDifficultyCollection: (gameSystemID: string, gameModeID: string) => Promise<IGameDifficultyItem[]>;
    getGameDifficultyInfo: (gameSystemID: string, gameModeID: string,id:string) => Promise<IGameDifficultyItem>;

    getHashTagCollection: (gameSystemID: string) => Promise<IHashTagItem[]>;
    getHashTagInfo: (gameSystemID: string,id:string) => Promise<IHashTagItem>;

    getRecord: (gameSystemID: string, gameModeID: string,recordID:string) => Promise<IRecord>;
    getRecordsWithCondition: (gameSystemID: string, gameModeID: string,
        order: OrderOfRecordArray,
        abilityIDsCondition?: "AND" | "OR" | "AllowForOrder",
        abilityIDs?: string[],
        targetIDs?: string[],
        runnerIDs?: string[]
    ) => Promise<IRecord[]>;
}
