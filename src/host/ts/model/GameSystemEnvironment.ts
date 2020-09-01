import { gameSystemList, gameModeList, gameDifficultyList } from "../list/Lists";
import { Settings } from "../list/settings";
import { IGameSystemEnvironment } from "../type/foundation/IGameSystemEnvironment";

export class GameSystemEnvironmentModel{
    gameSystemEnvironment:IGameSystemEnvironment
    constructor(data:IGameSystemEnvironment){
        this.gameSystemEnvironment = data;
    }
    public get gameSystemName(){
        return gameSystemList.resolveIdForName(this.gameSystemEnvironment.gameSystemID,Settings.language);
    }
    public get gameModeName(){
        return gameModeList.resolveIdForName(this.gameSystemEnvironment.gameSystemID,Settings.language);
    }
    public get gameDifficultyName(){
        return gameDifficultyList.resolveIdForName(this.gameSystemEnvironment.gameSystemID,Settings.language);
    }
    public get gameSystemEnv(){
        return {
            gameSystemName:this.gameSystemName,
            gameModeName:this.gameModeName,
            gameDifficultyName:this.gameDifficultyName
        }
    }
}