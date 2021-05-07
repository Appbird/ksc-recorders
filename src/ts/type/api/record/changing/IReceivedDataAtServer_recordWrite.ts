import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer, IReceivedDataAtServerNeedAuthentication } from "../../transmissionBase";
import { IRegulation } from "../../../foundation/IRegulation";

export interface IReceivedDataAtServer_recordWrite extends IReceivedDataAtServer,IReceivedDataAtServerNeedAuthentication {
    record: ISentRecordOffer;
    language: LanguageInApplication;
}

export interface ISentRecordOffer{
    score: number;
    regulation: IRegulation;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    link: string[];
    note: string;
}