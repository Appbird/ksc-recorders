import { IReceivedDataAtClient_notificationRead } from "./IReceivedDataAtClient_notificationRead";
import { IReceivedDataAtServer_notificationRead } from "./IReceivedDataAtServer_notificationRead";

export interface IReceivedData_notificationRead{
    atServer:IReceivedDataAtServer_notificationRead
    atClient:IReceivedDataAtClient_notificationRead
}