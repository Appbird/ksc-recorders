import { LanguageInApplication } from "../../../server/type/LanguageInApplication"
import { checkInputObjectWithErrorPossibility } from "../../../utility/InputCheckerUtility"
import { IRecordResolved } from "../../record/IRecord"
import { IReceivedDataAtClient, IReceivedDataAtServer } from "../transmissionBase"
export interface IReceivedDataAtClient_recordDetail extends IReceivedDataAtClient{
    result?:IRecordResolved
}
export interface IReceivedDataAtClient_recordDetailSuccessfully extends IReceivedDataAtClient{
    result:IRecordResolved
}
export interface IReceivedDataAtServer_recordDetail extends IReceivedDataAtServer{
    gameSystemEnv:{
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
    lang:LanguageInApplication
}

export function isIReceivedDataAtServer_recordDetail<IReceivedDataAtServer_recordDetail>(obj:unknown):obj is IReceivedDataAtServer_recordDetail{
    return checkInputObjectWithErrorPossibility<IReceivedDataAtServer_recordDetail>(obj,checker,"record/detail > data")
}

const checker = {
    gameSystemEnv:{
        gameSystemID: "string",
        gameModeID: "string"
    },
    id: "string"
}