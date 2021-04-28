import { IRegulation } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";

export interface IOfferedRecord {
    score: number;
    regulation: IRegulation;
    tagName: string[];
    languageOfTagName: LanguageInApplication;
    link: string[];
    note: string;
    IDToken: string;
}
