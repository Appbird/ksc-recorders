import { IRecordInShortResolved } from "./IRecord";

export interface IRecordGroupResolved {
    groupName: string;
    groupSubName?:string;
    records:IRecordInShortResolved[];
    lastPost: number|undefined;
    numberOfRecords:number;
    numberOfRunners:number;
}
