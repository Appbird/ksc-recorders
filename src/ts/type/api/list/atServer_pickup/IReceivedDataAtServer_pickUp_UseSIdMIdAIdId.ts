import { IReceivedDataAtServer } from "../../transmissionBase";

export interface IReceivedDataAtServer_pickUp_UseSIdMIdAIdId extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    abilityAttributeID:string;
    id: string;
}
