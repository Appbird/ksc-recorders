import { IReceivedDataAtClient } from "../../transmissionBase";


export interface IReceivedDataAtServer_recordModerate extends IReceivedDataAtClient {
    recordId: string;
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
    idToken: string;

}
