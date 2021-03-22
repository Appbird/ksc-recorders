import { LanguageInApplication } from "../../server/ControllerOfTableForResolvingID";
import { OrderOfRecordArray } from "../../server/RecordDataBase";
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
    ANDORConditionAboutAbilityIDs:"AND" | "OR";
    runnerIDs:number[];
    language:LanguageInApplication
    
}
