import { IRegulation } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";


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
export interface ModifiedHistoryStack{
    modifierID:string,timestamp:number,
    before:{
        score:number;
        timestamp_post:number;
        timestamp_approval?:number;
        regulation:IRegulation;
        runnerID:string;
        tagName: string[];
        languageOfTagName:LanguageInApplication;
        tagID:string[];
        link:string[];
        note:string;
}}