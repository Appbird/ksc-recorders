import { IRunner } from "../type/record/IRunner";
import { IGameSystemInfo } from "./IGameSystemInfo";


export interface IRecordDataBase {
    runnersTable: IRunner[];
    gameSystemInfo: IGameSystemInfo[];
}
