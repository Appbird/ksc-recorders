import { IRecordResolved } from "../../../record/IRecord";
import { IReceivedDataAtClient } from "../../transmissionBase";

export interface IReceivedDataAtClient_recordModify extends IReceivedDataAtClient {
    result: IRecordResolved;
}
