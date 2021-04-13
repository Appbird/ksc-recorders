import { IRecordInShortResolved } from "./IRecord";

export interface IRecordGroupResolved {
    groupName: string;
    groupSubName?:string;
    records:IRecordInShortResolved[];
    lastPost: number;
    numberOfRecords:number;
    numberOfRunners:number;
}
