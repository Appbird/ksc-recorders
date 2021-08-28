import { LanguageInApplication } from "../../LanguageInApplication";
import { IReceivedDataAtServer } from "../transmissionBase";


export interface IReceivedDataAtServer_gameRule_get extends IReceivedDataAtServer{
    gameSystemEnv:{
        gameSystemID:string,
        gameModeID:string
    }
    targetRuleID?:string[]
    language:LanguageInApplication
}
