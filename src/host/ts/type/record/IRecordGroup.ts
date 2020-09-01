import { IRecordInNutShell } from "./IRecord";

export interface IRecordGroup {
    groupName: string;
    groupSubName: string;
    records: IRecordInNutShell[];
    lastPost: string;
    numberOfRecords:number;
    numberOfRunners:number;
}
