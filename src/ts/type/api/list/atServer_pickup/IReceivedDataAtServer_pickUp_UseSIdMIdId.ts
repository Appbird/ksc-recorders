import { IReceivedDataAtServer } from "../../transmissionBase";

export interface IReceivedDataAtServer_pickUp_UseSIdMIdId extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
}
