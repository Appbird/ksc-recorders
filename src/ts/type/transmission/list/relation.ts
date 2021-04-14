import { HashTagItem, IGameSystemInfo } from "../../../server/type/IGameSystemInfo";
import { AbilityItem, GameDifficultyItem, GameModeItem, TargetItem } from "../../../server/type/UniqueResolveTableToGameSystem";
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
    atClient:IReceivedDataAtClient_getlist<IGameSystemInfo>
}
export interface IReceivedData_listRunners extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseId
    atClient:IReceivedDataAtClient_getlist<IRunner>
}
export interface IReceivedData_listGameModes extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdId
    atClient:IReceivedDataAtClient_getlist<GameModeItem>
}
export interface IReceivedData_listHashTags extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdId
    atClient:IReceivedDataAtClient_getlist<HashTagItem>
}
export interface IReceivedData_listTargets extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<TargetItem>
}
export interface IReceivedData_listAbilities extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<AbilityItem>
}
export interface IReceivedData_listDifficulties extends IReceivedData{
    atServer:IReceivedDataAtServer_getlist_UseSIdMIdId
    atClient:IReceivedDataAtClient_getlist<GameDifficultyItem>
}


export interface IReceivedData_pickUpGameSystem extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseId
    atClient:IReceivedDataAtClient_pickUp<IGameSystemInfo>
}
export interface IReceivedData_pickUpRunner extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseId
    atClient:IReceivedDataAtClient_pickUp<IRunner>
}
export interface IReceivedData_pickUpGameMode extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdId
    atClient:IReceivedDataAtClient_pickUp<IGameSystemInfo>
}
export interface IReceivedData_pickUpHashTag extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdId
    atClient:IReceivedDataAtClient_pickUp<HashTagItem>
}
export interface IReceivedData_pickUpTarget extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<TargetItem>
}
export interface IReceivedData_pickUpAbility extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<AbilityItem>
}
export interface IReceivedData_pickUpDifficulty extends IReceivedData{
    atServer:IReceivedDataAtServer_pickUp_UseSIdMIdId
    atClient:IReceivedDataAtClient_pickUp<GameDifficultyItem>
}