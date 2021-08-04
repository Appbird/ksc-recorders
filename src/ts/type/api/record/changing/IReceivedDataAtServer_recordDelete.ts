import { IReceivedDataAtServer, IReceivedDataAtServerNeedAuthentication, IReceivedDataAtServerNeedOwner } from "../../transmissionBase";

export interface IReceivedDataAtServer_recordDelete extends IReceivedDataAtServer,IReceivedDataAtServerNeedAuthentication,IReceivedDataAtServerNeedOwner {
    reason?:string;
}
