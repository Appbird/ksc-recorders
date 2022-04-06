import { IRegulation } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";

export interface IUncompletedRecord{
    id: string;
    timestamp_post: number;
    runnerID?: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    moderatorIDs: {id:string,date:number}[]; 
    tagID: string[];
    link: string[];
    note: string;
}