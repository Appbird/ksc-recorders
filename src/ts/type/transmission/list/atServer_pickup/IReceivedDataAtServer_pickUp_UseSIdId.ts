import { IReceivedDataAtServer } from "../../transmissionBase";


export default interface IReceivedDataAtServer_pickUp_UseSIdId extends IReceivedDataAtServer {
    gameSystemEnv: { gameSystemID: string; };
    id: string;
}
