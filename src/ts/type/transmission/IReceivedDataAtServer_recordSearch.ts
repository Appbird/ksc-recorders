import { LanguageInApplication } from "../../server/type/LanguageInApplication";
import { OrderOfRecordArray } from "../../server/type/OrderOfRecordArray";

export interface IReceivedDataAtServer_recordSearch {
    groupName:string;

    gameSystemEnv:{
        gameSystemID: string;
        gameModeID: string;
    };
    orderOfRecordArray:OrderOfRecordArray;
    startOfRecordArray:number;
    limitOfRecordArray:number;

    targetIDs:string[];
    abilityIDs:string[];
    /** 能力カテゴリを用いた記録検索において、And検索を行うかOr検索を行うか */
    abilityIDsCondition: "AND" | "OR" | "AllowForOrder";
    runnerIDs:string[];
    language:LanguageInApplication
    
}

export const checker = {
    groupName:"string",
    gameSystemEnv:{
        gameSystemID: "string",
        gameModeID: "string"
    },
    orderOfRecordArray:`"HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"`,
    startOfRecordArray:"string",
    limitOfRecordArray:"string",
    targetIDs:"string[]",
    abilityIDs:"string[]",
    abilityIDsCondition: `"AND" | "OR" | "AllowForOrder"`,
    runnerIDs:"string[]",
    language:`"Japanese" | "English"`
}