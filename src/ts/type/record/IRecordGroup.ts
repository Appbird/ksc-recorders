import { IRecordInShortWithName } from "./IRecord";

export interface IRecordGroupWithName {
    groupName: string;
    groupSubName: string;
    records: IRecordInShortWithName[];
    lastPost: string;
    numberOfRecords:number;
    numberOfRunners:number;
}
