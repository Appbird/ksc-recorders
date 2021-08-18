import { IReceivedDataAtServer } from "../../transmissionBase";

export interface IReceivedDataAtServer_getList_UseSIdMIdAIdId extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    abilityAttributeID:string;
    id?: string[];
    start?: number;
    limit?: number;
}
