import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { authCodeForAddDiscordRoleID } from "../../secret.json"
export async function addDiscordRoleID(recordDataBase:RecordDataBase,input:APIFunctions["addDiscordRoleID"]["atServer"]):Promise<APIFunctions["addDiscordRoleID"]["atClient"]>{
    if (input.token !== authCodeForAddDiscordRoleID){
        throw new Error("Token is invalid.")
    }
    await recordDataBase.updateGameModeInfo(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,{DiscordRoleID:input.id})
    return {isSucceeded:true,result:undefined};
}