import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer, IReceivedDataAtServerNeedAuthentication, IReceivedDataAtServerNeedOwner } from "../../transmissionBase";

export interface IReceivedDataAtServer_recordModify extends IReceivedDataAtServer,IReceivedDataAtServerNeedAuthentication,IReceivedDataAtServerNeedOwner {
    recordModified: RecordPropertiesInModifiable
    reason?:string;
    language: LanguageInApplication;
}

export interface RecordPropertiesInModifiable{
    note:string;
    link:string[];
    tagName:string[];
    score:number;
    regulation:{
        abilityIDs:string[]
        targetID:string
        gameSystemEnvironment:{
            gameDifficultyID:string
        }
    },
    

};