import { IRecordInShortWithName } from "./IRecord";

export interface IRecordGroupWithName {
    groupName: string;
    groupSubName: string;
    records: IRecordInShortWithName[];
    lastPost: number;
    numberOfRecords:number;
    numberOfRunners:number;
}
