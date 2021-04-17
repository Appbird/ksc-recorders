import { IRecord, IRecordResolved } from "../../record/IRecord";
import { IReceivedData, IReceivedDataAtClient, IReceivedDataAtServer } from "../transmissionBase";

export interface IReceivedData_recordWrite extends IReceivedData {
    atServer: IReceivedDataAtServer_recordWrite;
    atClient: IReceivedDataAtClient_recordWrite;
}

interface IReceivedDataAtServer_recordWrite extends IReceivedDataAtServer{
    record:IRecord
}
interface IReceivedDataAtClient_recordWrite extends IReceivedDataAtClient{
    result:IRecordResolved
}