import { IRecordInShort, IRecordInShortResolved } from "./IRecord";

export interface IRecordGroup {
    groupName: string;
    groupSubName: string;
    records:IRecordInShortResolved[];
    lastPost: number;
    numberOfRecords:number;
    numberOfRunners:number;
}
