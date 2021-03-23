import { LanguageInApplication } from "../../server/DataBase/ControllerOfTableForResolvingID";
import { OrderOfRecordArray } from "../../server/DataBase/RecordDataBase";
import { IGameSystemEnvironment } from "../foundation/IGameSystemEnvironment";

export interface IReceivedDataFromClient_AboutRecordExhibition {
    groupName:string;
    groupSubName:string;

    gameSystemEnv:IGameSystemEnvironment;
    /**  クライアントが受け取る記録データの最大数 */
    orderOfRecordArray:OrderOfRecordArray;
    startOfRecordArray:number;
    limitOfRecordArray:number;

    targetIDs:number[];
    abilityIDs:number[];
    /** 能力カテゴリを用いた記録検索において、And検索を行うかOr検索を行うか */
    abilityIDsCondition: "AND" | "OR" | "AllowForOrder";
    runnerIDs:number[];
    language:LanguageInApplication
    
}
