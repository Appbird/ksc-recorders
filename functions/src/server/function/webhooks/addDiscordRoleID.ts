import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { GameModeItemController } from "../../firestore/GameModeItemController";
import { authCodeForAddDiscordRoleID } from "../../secret.json"
export async function addDiscordRoleID(input:APIFunctions["addDiscordRoleID"]["atServer"]):Promise<APIFunctions["addDiscordRoleID"]["atClient"]>{
    if (input.token !== authCodeForAddDiscordRoleID){
        throw new Error("Token is invalid.")
    }
    const ig = input.gameSystemEnv
    await new GameModeItemController(ig.gameSystemID).update(ig.gameModeID,{DiscordRoleID:input.id})
    return {isSucceeded:true,result:undefined};
}