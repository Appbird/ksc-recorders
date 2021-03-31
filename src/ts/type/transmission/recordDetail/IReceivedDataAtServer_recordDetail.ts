export interface IReceivedDataAtServer_recordDetail{
    gameSystemEnv:{
        gameSystemID: string;
        gameModeID: string;
    };
    id: number;
}

export const checker = {
    gameSystemEnv:{
        gameSystemID: "string",
        gameModeID: "string"
    },
    id: "number"
}