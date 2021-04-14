import { LanguageInApplication } from "../../../server/type/LanguageInApplication";
import { OrderOfRecordArray } from "../../../server/type/OrderOfRecordArray";

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
    /** 能力カテゴリを用いた記録検索において、And検索を行うかOr検索を行うか */
    abilityIDsCondition?: "AND" | "OR" | "AllowForOrder";
    runnerIDs?: string[];
    tagIDs?: string[];
    language: LanguageInApplication;
}
