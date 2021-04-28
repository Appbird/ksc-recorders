import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer } from "../../transmissionBase";
import { IOfferedRecord } from "../../../record/IOfferedRecord";

export interface IReceivedDataAtServer_recordModify extends IReceivedDataAtServer {
    record: IOfferedRecord;
    recordID: string;
    language: LanguageInApplication;
    IDToken: LanguageInApplication;
}
