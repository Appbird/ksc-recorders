import { IReceivedDataAtServer } from "../transmissionBase";

export interface IReceivedDataAtServer_addDiscordRoleID extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
    token:string;
}
