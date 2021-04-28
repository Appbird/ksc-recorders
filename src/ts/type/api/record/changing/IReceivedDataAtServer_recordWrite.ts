import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer } from "../../transmissionBase";
import { IRegulation } from "../../../foundation/IRegulation";

export interface IReceivedDataAtServer_recordWrite extends IReceivedDataAtServer {
    record: {
        id: string;
        score: number;
        timestamp_post: number;
        regulation: IRegulation;
        runnerID: string;
        tagName: string[];
        languageOfTagName:LanguageInApplication;
        link: string[];
        note: string;
    };
    language: LanguageInApplication;
    IDToken: LanguageInApplication;
}