import { IReceivedDataAtServer } from "../transmissionBase";

export interface IReceivedDataAtServer_notificationRead extends IReceivedDataAtServer {
    idToken:string;
}
