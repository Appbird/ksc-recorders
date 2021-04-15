import { IHashTagItem, IGameSystemInfo, IGameSystemInfoWithoutCollections } from "../../list/IGameSystemInfo";
import { IGameModeItem, IGameModeItemWithoutCollections } from "../../list/IGameModeItem";
import { IGameDifficultyItem } from "../../list/IGameDifficultyItem";
import { ITargetItem } from "../../list/ITargetItem";
import { IAbilityItem } from "../../list/IAbilityItem";
import { IRunner } from "../../record/IRunner";
import { IReceivedData } from "../transmissionBase";
import { IReceivedDataAtServer_getlist_UseId } from "./atServer_getlist/IReceivedDataAtServer_getlist_UseId";
import { IReceivedDataAtServer_getlist_UseSIdId } from "./atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId";
import { IReceivedDataAtServer_getlist_UseSIdMIdId } from "./atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId";
import { IReceivedDataAtServer_pickUp_UseId } from "./atServer_pickup/IReceivedDataAtServer_pickUp_UseId";
import { IReceivedDataAtServer_pickUp_UseSIdId } from "./atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId";
import { IReceivedDataAtServer_pickUp_UseSIdMIdId } from "./atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId";
import { IReceivedDataAtClient_getlist } from "./IReceivedDataAtClient_getlist";
import { IReceivedDataAtClient_pickUp } from "./IReceivedDataAtClient_pickUp";

export interface IReceivedData_listGameSystems extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseId
    atClient:IReceivedDataAtClient_getlist<IGameSystemInfoWithoutCollections>
}
export interface IReceivedData_listRunners extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseId
    atClient:IReceivedDataAtClient_getlist<IRunner>
}
export interface IReceivedData_listGameModes extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdId
    atClient:IReceivedDataAtClient_getlist<IGameModeItemWithoutCollections>
}
export interface IReceivedData_listHashTags extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdId
    atClient:IReceivedDataAtClient_getlist<IHashTagItem>
}
export interface IReceivedData_listTargets extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<ITargetItem>
}
export interface IReceivedData_listAbilities extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<IAbilityItem>
}
export interface IReceivedData_listDifficulties extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<IGameDifficultyItem>
}


export interface IReceivedData_listGameSystem extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseId
    atClient:IReceivedDataAtClient_pickUp<IGameSystemInfoWithoutCollections>
}
export interface IReceivedData_listRunner extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseId
    atClient:IReceivedDataAtClient_pickUp<IRunner>
}
export interface IReceivedData_listGameMode extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdId
    atClient:IReceivedDataAtClient_pickUp<IGameModeItemWithoutCollections>
}
export interface IReceivedData_listHashTag extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdId
    atClient:IReceivedDataAtClient_pickUp<IHashTagItem>
}
export interface IReceivedData_listTarget extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<ITargetItem>
}
export interface IReceivedData_listAbility extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<IAbilityItem>
}
export interface IReceivedData_listDifficulty extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<IGameDifficultyItem>
}