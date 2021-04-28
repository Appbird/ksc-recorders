import { IRecordResolved } from "../../../record/IRecord";
import { IReceivedDataAtClient } from "../../transmissionBase";

export interface IReceivedDataAtClient_recordWrite extends IReceivedDataAtClient {
    result: IRecordResolved;
}
