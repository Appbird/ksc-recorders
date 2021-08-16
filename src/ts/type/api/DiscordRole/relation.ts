import { IReceivedData } from "../transmissionBase";
import { IReceivedDataAtClient_addDiscordRoleID } from "./IReceivedDataAtClient_addDiscordRoleID";
import { IReceivedDataAtServer_addDiscordRoleID } from "./IReceivedDataAtServer_addDiscordRoleID";

export interface IReceivedData_addDiscordRoleID extends IReceivedData{
        atServer:IReceivedDataAtServer_addDiscordRoleID
        atClient:IReceivedDataAtClient_addDiscordRoleID
}