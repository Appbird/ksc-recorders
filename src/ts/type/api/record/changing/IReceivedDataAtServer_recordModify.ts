import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer } from "../../transmissionBase";
import { IRecord } from "../../../record/IRecord";

export interface IReceivedDataAtServer_recordModify extends IReceivedDataAtServer {
    record: IRecord;
    recordID: string;
    language: LanguageInApplication;
    IDToken: LanguageInApplication;
}
