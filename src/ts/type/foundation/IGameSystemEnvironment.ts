export interface IGameSystemEnvironment {
    gameSystemID: string;
    gameModeID: string;
    //#NOTE このDifficultyIDについては特に記録指定の時には関わってこないとする。
    gameDifficultyID: string;
}

export interface IGameSystemEnvironmentResolved extends IGameSystemEnvironment {
    gameSystemName: string;
    gameModeName: string;
    gameDifficultyName: string;
}