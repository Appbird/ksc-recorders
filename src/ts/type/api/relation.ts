import { IReceivedData_recordWrite } from "./record/IReceivedData_recordWrite";
import { IReceivedData_listAbilities, IReceivedData_listAbility, IReceivedData_listDifficulties, IReceivedData_listDifficulty, IReceivedData_listGameMode, IReceivedData_listGameModes, IReceivedData_listGameSystem, IReceivedData_listGameSystems, IReceivedData_listHashTag, IReceivedData_listHashTags, IReceivedData_listRunner, IReceivedData_listRunners, IReceivedData_listTarget, IReceivedData_listTargets } from "./list/relation";
import { IReceivedData_recordDetail, IReceivedData_recordSearch } from "./record/relation";
import { IReceivedDataAtClient, IReceivedDataAtServer } from "./transmissionBase";

export type APIFunctions = APIFunctions_noChanging & APIFunctions_changing;

export interface APIFunctions_noChanging{
    record_search:IReceivedData_recordSearch;
    record_detail:IReceivedData_recordDetail;

    list_gameSystems:IReceivedData_listGameSystems;
    list_gameModes:IReceivedData_listGameModes;
    list_runners:IReceivedData_listRunners;
    list_difficulties:IReceivedData_listDifficulties;
    list_abilities:IReceivedData_listAbilities;
    list_targets:IReceivedData_listTargets;
    list_hashTags:IReceivedData_listHashTags;

    list_gameSystem:IReceivedData_listGameSystem;
    list_gameMode:IReceivedData_listGameMode;
    list_runner:IReceivedData_listRunner;
    list_difficulty:IReceivedData_listDifficulty;
    list_ability:IReceivedData_listAbility;
    list_target:IReceivedData_listTarget;
    list_hashTag:IReceivedData_listHashTag;
}

export interface APIFunctions_changing{
    record_write:IReceivedData_recordWrite
}