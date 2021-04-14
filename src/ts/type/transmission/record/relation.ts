import { IReceivedData } from "../transmissionBase";
import { IReceivedDataAtClient_recordDetail } from "./IReceivedDataAtClient_recordDetail";
import { IReceivedDataAtClient_recordSearch } from "./IReceivedDataAtClient_recordSearch";
import { IReceivedDataAtServer_recordDetail } from "./IReceivedDataAtServer_recordDetail";
import { IReceivedDataAtServer_recordSearch } from "./IReceivedDataAtServer_recordSearch";

export interface IReceivedData_recordSearch extends IReceivedData{
    atServer: IReceivedDataAtServer_recordSearch
    atClient: IReceivedDataAtClient_recordSearch
}
export interface IReceivedData_recordDetail extends IReceivedData{
    atServer: IReceivedDataAtServer_recordDetail
    atClient: IReceivedDataAtClient_recordDetail
}
