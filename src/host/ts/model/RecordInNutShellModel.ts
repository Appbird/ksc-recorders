import { GameSystemEnvironmentModel } from "./GameSystemEnvironment";
import { Settings } from "../list/settings";
import { AbilityList, TargetList } from "../list/Lists";
import { IRecordInNutShell } from "../type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../utility/timeUtility";

export class RecordInNutShellModel{
    record:IRecordInNutShell;
    gameSystemEnv:GameSystemEnvironmentModel;

    constructor(record:IRecordInNutShell){
        this.record = record;
        this.gameSystemEnv = new GameSystemEnvironmentModel(record.regulation.gameSystemEnvironment);
    }
    public get time():string{
        return converseMiliSecondsIntoTime(this.record.timeInMilliseconds);
    }
    public get runner(){
        return this.record.runnerName;
    }
    public get gameSystemEnvironment() {
        return this.gameSystemEnv.gameSystemEnv;
    }
    public get ability(){
        return this.record.regulation.abilityIDsOfPlayerCharacters.map(
            (element) => AbilityList.resolveIdForName(element,Settings.language)
        )
    }
    public get target(){
        return TargetList.resolveIdForName(this.record.regulation.targetID,Settings.language);
    }
}

