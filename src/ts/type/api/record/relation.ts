import { IReceivedData } from "../transmissionBase";
import { IReceivedDataAtClient_recordDelete } from "./changing/IReceivedDataAtClient_recordDelete";
import { IReceivedDataAtClient_recordModify } from "./changing/IReceivedDataAtClient_recordModify";
import { IReceivedDataAtClient_recordWrite } from "./changing/IReceivedDataAtClient_recordWrite";
import { IReceivedDataAtServer_recordDelete } from "./changing/IReceivedDataAtServer_recordDelete";
import { IReceivedDataAtServer_recordModify } from "./changing/IReceivedDataAtServer_recordModify";
import { IReceivedDataAtServer_recordWrite } from "./changing/IReceivedDataAtServer_recordWrite";
import { IReceivedDataAtClient_recordDetail } from "./notChanging/IReceivedDataAtClient_recordDetail";
import { IReceivedDataAtClient_recordSearch } from "./notChanging/IReceivedDataAtClient_recordSearch";
import { IReceivedDataAtServer_recordDetail } from "./notChanging/IReceivedDataAtServer_recordDetail";
import { IReceivedDataAtServer_recordSearch } from "./notChanging/IReceivedDataAtServer_recordSearch";

export interface IReceivedData_recordSearch extends IReceivedData{
    atServer: IReceivedDataAtServer_recordSearch
    atClient: IReceivedDataAtClient_recordSearch
}
export interface IReceivedData_recordDetail extends IReceivedData{
    atServer: IReceivedDataAtServer_recordDetail
    atClient: IReceivedDataAtClient_recordDetail
}

export interface IReceivedData_recordWrite extends IReceivedData {
    atServer: IReceivedDataAtServer_recordWrite;
    atClient: IReceivedDataAtClient_recordWrite;
}
export interface IReceivedData_recordModify extends IReceivedData {
    atServer: IReceivedDataAtServer_recordModify;
    atClient: IReceivedDataAtClient_recordModify;
}
export interface IReceivedData_recordDelete extends IReceivedData {
    atServer: IReceivedDataAtServer_recordDelete;
    atClient: IReceivedDataAtClient_recordDelete;
}