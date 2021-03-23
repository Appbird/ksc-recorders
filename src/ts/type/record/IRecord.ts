import { IRegulation, IRegulationResolved } from "../foundation/IRegulation";

//#NOTE ここでの"Resolved"は、「IDを対応する文字列に置き換えた(ID解決済)状態である」ことを表す。Resolvedのオブジェクトでは、対応するResolvedでないオブジェクトのうち「Dを表さないパラメタ」を削除している。
//#NOTE また、"InShort"(日本語訳として「要約すると」)は、本来の記録よりも、「簡単に表示するにあたって必要ないデータを削った状態である」ことを表す。
export interface IRecordInShort {
    score: number;
    regulation: IRegulation;
    runnerID:number;
    recordID:number;
}
export interface IRecordInShortResolved {
    score: number;
    runnerID:number;
    recordID:number;
    regulation: IRegulationResolved;
    runnerName:string;
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
export interface IRecordResolved{
    score: number;
    timestamp: number;
    runnerID: number;
    recordID: number;
    tag: number[];
    link: string[];
    note: string;
    regulation: IRegulationResolved;
    runnerName: number;
    tagName: string[];
}
