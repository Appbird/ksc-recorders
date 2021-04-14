import { IRecordGroupResolved } from "../../record/IRecordGroupResolved";
import { IReceivedDataAtClient } from "../transmissionBase";


export interface IReceivedDataAtClient_recordSearch extends IReceivedDataAtClient {
    result: IRecordGroupResolved[];
}
