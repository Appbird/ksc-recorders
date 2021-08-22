import { OnePlayerOfAbilityAttribute } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";
import { OrderOfRecordArray } from "./OrderOfRecordArray";

export interface SearchCondition {
    groupName: string;
    groupSubName?: string;
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
        /** //#NOTE これによる指定は、targetIDsによるものよりも強い指定となる */
        gameDifficultyID?: string;
    };
    orderOfRecordArray: OrderOfRecordArray;
    startOfRecordArray?: number;
    limitOfRecordArray?: number;
    targetIDs?: string[];
    abilityIDs?: string[];
    abilityAttributeIDs?: OnePlayerOfAbilityAttribute[]
    /** 能力カテゴリを用いた記録検索において、And検索を行うかOr検索を行うか */
    abilityIDsCondition?: "AND" | "OR" | "AllowForOrder";
    runnerIDs?: string[];
    tagIDs?: string[];
    searchTypeForVerifiedRecord?: SearchTypeForVerifiedRecord;
    language: LanguageInApplication;
}

export type SearchTypeForVerifiedRecord = "All" | "OnlyVerified" | "OnlyUnverified"
