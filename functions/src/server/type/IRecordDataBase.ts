import { IRunner } from "../../../../src/ts/type/record/IRunner";
import { IGameSystemInfo } from "../../../../src/ts/type/list/IGameSystemInfo";


export interface IRecordDataBase {
    runners: IRunner[];
    titles: IGameSystemInfo[];
}
