import { IRegulation } from "../foundation/IRegulation";

export interface IRecordInNutShell {
    timeInMilliseconds: number;
    regulation: IRegulation;
    runnerID: number;
    runnerName:string;
    recordID: number;
}
export interface IRecord{
    timeInMilliseconds: number;
    regulation: IRegulation;
    runnerID: number;
    recordID: number;
    tag:number[];
    link:string;
    note:string;
}