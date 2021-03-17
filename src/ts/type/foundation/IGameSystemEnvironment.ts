export interface IGameSystemEnvironment {
    gameSystemID: number;
    gameModeID: number;
    //#NOTE このDifficultyIDについては特に記録指定の時には関わってこないとする。
    gameDifficultyID: number;
}

export interface IGameSystemEnvironmentWithName {
    gameSystemID: number;
    gameSystemName: string;
    gameModeID: number;
    gameModeName: string;
    gameDifficultyID: number;
    gameDifficultyName: string;
}