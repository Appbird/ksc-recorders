import { IRecordInShort, IRecordInShortResolved } from "./IRecord";

export interface IRecordGroup {
    groupName: string;
    groupSubName: string;
    records: {notResolved:IRecordInShort,resolved:IRecordInShortResolved}[];
    lastPost: number;
    numberOfRecords:number;
    numberOfRunners:number;
}
