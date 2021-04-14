import { IRecordResolved } from "../../record/IRecord";
import { IReceivedDataAtClient } from "../transmissionBase";

export default interface IReceivedDataAtClient_recordDetail extends IReceivedDataAtClient {
    result: IRecordResolved;
}
