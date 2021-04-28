import { IReceivedDataAtServer } from "../../transmissionBase";

export interface IReceivedDataAtServer_recordDelete extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    recordID: string;
    IDToken: string;
}
