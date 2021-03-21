import { IRegulation, IRegulationWithName } from "../foundation/IRegulation";

export interface IRecordInShortWithName {
    score: number;
    regulation: IRegulationWithName;
    runnerID: number;
    runnerName:string;
    recordID: number;
}
export interface IRecord{
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp: number;
    regulation: IRegulation;
    runnerID: number;
    recordID: number;
    tag: number[];
    link: string[];
    note: string;
}