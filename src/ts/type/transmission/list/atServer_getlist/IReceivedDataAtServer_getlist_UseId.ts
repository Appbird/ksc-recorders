import { IReceivedDataAtServer } from "../../transmissionBase";

//#NOTE SId = gameSystemID, MId = gameModeID

export interface IReceivedDataAtServer_getlist_UseId extends IReceivedDataAtServer {
    id?: string[];
    start?: number;
    limit?: number;
}
