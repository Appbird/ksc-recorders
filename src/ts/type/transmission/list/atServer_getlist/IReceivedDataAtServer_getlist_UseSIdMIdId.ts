import { IReceivedDataAtServer } from "../../transmissionBase";



export default interface IReceivedDataAtServer_getlist_UseSIdMIdId extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id?: string[];
    start?: number;
    limit?: number;
}
