import { IRecordInShort, IRecordInShortResolved } from "./IRecord";

export interface IRecordGroup {
    groupName: string;
    records:IRecordInShortResolved[];
    lastPost: number;
    numberOfRecords:number;
    numberOfRunners:number;
}
