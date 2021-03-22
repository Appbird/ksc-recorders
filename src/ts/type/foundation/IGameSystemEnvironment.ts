export interface IGameSystemEnvironment {
    gameSystemID: number;
    gameModeID: number;
    //#NOTE このDifficultyIDについては特に記録指定の時には関わってこないとする。
    gameDifficultyID: number;
}

export interface IGameSystemEnvironmentResolved {
    gameSystemName: string;
    gameModeName: string;
    gameDifficultyName: string;
}