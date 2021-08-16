import { IReceivedData_addDiscordRoleID } from "./DiscordRole/relation";
import { IReceivedData_listAbilities, IReceivedData_listAbility, IReceivedData_listDifficulties, IReceivedData_listDifficulty, IReceivedData_listGameMode, IReceivedData_listGameModes, IReceivedData_listGameSystem, IReceivedData_listGameSystems, IReceivedData_listHashTag, IReceivedData_listHashTags, IReceivedData_listRunner, IReceivedData_listRunners, IReceivedData_listTarget, IReceivedData_listTargets } from "./list/relation";
import { IReceivedData_notificationRead } from "./notification/relation";
import { IReceivedData_recordDelete, IReceivedData_recordDetail, IReceivedData_recordModerate, IReceivedData_recordModify, IReceivedData_recordRawdata, IReceivedData_recordSearch, IReceivedData_recordWrite } from "./record/relation";

export type APIFunctions = APIFunctions_noChanging & APIFunctions_changing;

export interface APIFunctions_noChanging{
    record_search:IReceivedData_recordSearch;
    record_detail:IReceivedData_recordDetail;
    record_rawdata:IReceivedData_recordRawdata;

    list_gameSystems:IReceivedData_listGameSystems;
    list_gameModes:IReceivedData_listGameModes;
    list_runners:IReceivedData_listRunners;
    list_difficulties:IReceivedData_listDifficulties;
    list_abilities:IReceivedData_listAbilities;
    list_targets:IReceivedData_listTargets;
    list_hashTags:IReceivedData_listHashTags;
    list_hashTags_onlyApproved:IReceivedData_listHashTags;

    list_gameSystem:IReceivedData_listGameSystem;
    list_gameMode:IReceivedData_listGameMode;
    list_runner:IReceivedData_listRunner;
    list_difficulty:IReceivedData_listDifficulty;
    list_ability:IReceivedData_listAbility;
    list_target:IReceivedData_listTarget;
    list_hashTag:IReceivedData_listHashTag;
}

export interface APIFunctions_changing{
    record_write:IReceivedData_recordWrite,
    record_moderate:IReceivedData_recordModerate,
    record_delete:IReceivedData_recordDelete,
    record_modify:IReceivedData_recordModify,
    notification_read:IReceivedData_notificationRead,
    addDiscordRoleID:IReceivedData_addDiscordRoleID
}