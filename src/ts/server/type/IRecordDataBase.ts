import { IRunner } from "../../type/record/IRunner";
import { IGameSystemInfo } from "../../type/list/IGameSystemInfo";


export interface IRecordDataBase {
    runnersTable: IRunner[];
    gameSystemInfo: IGameSystemInfo[];
}
