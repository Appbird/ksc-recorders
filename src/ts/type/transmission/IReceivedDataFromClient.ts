import { LanguageInApplication } from "../../server/firestore/ControllerOfTableForResolvingID";
import { OrderOfRecordArray } from "../../server/firestore/RecordDataBase";
import { IGameSystemEnvironment } from "../foundation/IGameSystemEnvironment";

export interface IReceivedDataFromClient_AboutRecordExhibition {
    groupName:string;

    gameSystemEnv:IGameSystemEnvironment;
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
