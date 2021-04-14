import { IReceivedDataAtServer } from "../../transmissionBase";


export interface IReceivedDataAtServer_pickUp_UseSIdId extends IReceivedDataAtServer {
    gameSystemEnv: { gameSystemID: string; };
    id: string;
}
