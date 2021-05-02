import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer } from "../../transmissionBase";
import { IRegulation } from "../../../foundation/IRegulation";

export interface IReceivedDataAtServer_recordWrite extends IReceivedDataAtServer {
    record: ISentRecordOffer;
    language: LanguageInApplication;
    IDToken: string;
}

export interface ISentRecordOffer{
    score: number;
    regulation: IRegulation;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    link: string[];
    note: string;
}