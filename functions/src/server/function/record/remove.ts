import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { DiscordWebhookers } from "../webhooks/discord";

//#CH ユーザーの権限認証をこの関数から分離したい、APIList側にそういうチェック関数を持たせられないか？
export async function remove(recordDataBase:RecordDataBase,input:APIFunctions["record_delete"]["atServer"]):Promise<APIFunctions["record_delete"]["atClient"]>{
    const uid = await authentication(input.IDToken);
    const deleted = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.recordID)
        const cotfr = new ControllerOfTableForResolvingID(recordDataBase);
        const resolvedRecord = await cotfr.convertRecordIntoRecordResolved(deleted,"English")
    
    //#CTODO Discordに通知する際にuidを使う。
    recordDataBase.removeRecord(
        input.gameSystemEnv.gameSystemID,
        input.gameSystemEnv.gameModeID,
        input.recordID
    );
    const discord = new DiscordWebhookers(recordDataBase);
    
    await discord.sendRecordRemovedMessage(uid,deleted,resolvedRecord);
    return {
        isSucceeded:true
    }
}