import { IRecordResolved } from "../../../record/IRecord";
import { IReceivedDataAtClient } from "../../transmissionBase";

export interface IReceivedDataAtClient_recordDetail extends IReceivedDataAtClient {
    result: IRecordResolved;
}
