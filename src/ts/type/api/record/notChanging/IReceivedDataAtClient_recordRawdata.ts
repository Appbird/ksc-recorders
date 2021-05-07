import { IRecord } from "../../../record/IRecord";
import { IReceivedDataAtClient } from "../../transmissionBase";

export interface IReceivedDataAtClient_recordRawdata extends IReceivedDataAtClient {
    result: IRecord;
}

