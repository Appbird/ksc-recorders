import { IRegulation } from "../foundation/IRegulation";


export interface IStoredOfferedRecord {
    score: number;
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagID: string[];
    link: string[];
    note: string;
    modifiedBy?:{modifierID:string,timestamp:number,before:{
        score:number;timestamp_post:number;regulation:IRegulation;
        runnerID:string;tagID:string[];link:string[];note:string;modifiedBy:undefined;
    }}[];
}
