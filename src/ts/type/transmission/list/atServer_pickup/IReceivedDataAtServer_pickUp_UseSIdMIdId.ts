import { IReceivedDataAtServer } from "../../transmissionBase";


export default interface IReceivedDataAtServer_pickUp_UseSIdMIdId extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
}
