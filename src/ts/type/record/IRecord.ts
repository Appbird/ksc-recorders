import { expected_IRegulation, IRegulation, IRegulationResolved } from "../foundation/IRegulation";
import { LanguageInApplication } from "../LanguageInApplication";
import { ModifiedHistoryStack } from "../list/IStoredOfferedRecord";

//#NOTE ここでの"Resolved"は、「IDを対応する文字列に置き換えた(ID解決済)状態である」ことを表す。Resolvedのオブジェクトでは、対応するResolvedでないオブジェクトのうち「Dを表さないパラメタ」を削除している。
//#NOTE また、"InShort"(日本語訳として「要約すると」)は、本来の記録よりも、「簡単に表示するにあたって必要ないデータを削った状態である」ことを表す。
export interface IRecordInShort {
    score: number;
    regulation: IRegulation;
    runnerID:string;
    id:string;
}
export interface IRecordInShortResolved extends IRecordInShort {
    regulation: IRegulationResolved;
    runnerName:string;
}

export interface IRecord extends IRecordInShort{
    id: string;
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    tagID: string[];
    link: string[];
    note: string;
    modifiedBy?:ModifiedHistoryStack[];
}
export interface IRecordWithoutID{
    //[x] ここの命名をtimeInMiliSecondではなくscoreにしたい…。
    score: number;
    //[x] timestampを追加する
    timestamp_post: number;
    regulation: IRegulation;
    runnerID: string;
    tagName: string[];
    languageOfTagName:LanguageInApplication;
    tagID: string[];
    link: string[];
    note: string;
    modifiedBy?:ModifiedHistoryStack[];
}
export const expected_IRecord = {
    id: "string",
    score: "number",
    timestamp: "number",
    regulation: expected_IRegulation,
    runnerID: "string",
    tagID: "string[]",
    link: "string[]",
    note: "string"
}
export interface IRecordResolved extends IRecord{
    runnerName: string;
    tagName: string[];
    regulation: IRegulationResolved;
}
