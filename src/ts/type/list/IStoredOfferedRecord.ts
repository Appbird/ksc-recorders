import { IRegulation } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";
import { ModifiedHistoryStack } from "../record/IRecord";


export interface IStoredOfferedRecord {
    score: number;
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    link: string[];
    note: string;
    modifiedBy?:ModifiedHistoryStack[];
}