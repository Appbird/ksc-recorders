import { IReceivedDataAtServer } from "../../transmissionBase";


export interface IReceivedDataAtServer_recordModerate extends IReceivedDataAtServer {
    recordId: string;
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    IDToken: string;

}
