import { LanguageInApplication } from "../../../server/type/LanguageInApplication";
import { OrderOfRecordArray } from "../../../server/type/OrderOfRecordArray";
import { checkInputObjectWithErrorPossibility } from "../../../utility/InputCheckerUtility";
import { IRecordGroupResolved } from "../../record/IRecordGroupResolved";
import { IReceivedDataAtClient, IReceivedDataAtServer } from "../transmissionBase";

export interface IReceivedDataAtClient_recordSearch extends IReceivedDataAtClient {
    result?: IRecordGroupResolved;
}
export interface IReceivedDataAtClient_recordSearchSuccessfully extends IReceivedDataAtClient {
    result: IRecordGroupResolved;
}


export interface IReceivedDataAtServer_recordSearch extends IReceivedDataAtServer {
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
export function isIReceivedDataAtServer_recordSearch<IReceivedDataAtServer_recordSearch>(obj:unknown):obj is IReceivedDataAtServer_recordSearch{
    return checkInputObjectWithErrorPossibility<IReceivedDataAtServer_recordSearch[]>(obj,checker,`record/search > data`)
}
    
const checker = {
    groupName:"string",
    gameSystemEnv:{
        gameSystemID: "string",
        gameModeID: "string"
    },
    orderOfRecordArray:`"HigherFirst" | "LowerFirst" | "LaterFirst" | "EarlierFirst"`,
    startOfRecordArray:"number",
    limitOfRecordArray:"number",
    targetIDs:"string[]",
    abilityIDs:"string[]",
    abilityIDsCondition: `"AND" | "OR" | "AllowForOrder"`,
    runnerIDs:"string[]",
    language:`"Japanese" | "English"`
}