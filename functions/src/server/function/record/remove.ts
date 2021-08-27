import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { RecordResolver } from "../../wraper/RecordResolver";
import { authentication } from "../foundation/auth";
import { Notifier } from "../webhooks/Notificator";

//#CH ユーザーの権限認証をこの関数から分離したい、APIList側にそういうチェック関数を持たせられないか？
export async function remove(input:APIFunctions["record_delete"]["atServer"]):Promise<APIFunctions["record_delete"]["atClient"]>{
    const uid = await authentication(input.IDToken);
    const ig = input.gameSystemEnv
    const recordC = new RecordCollectionController(ig.gameSystemID,ig.gameModeID)
    const deleted = await recordC.deleteWithConsistency(input.recordID)
        const cotfr = new RecordResolver(ig.gameSystemID,ig.gameModeID)
        const resolvedRecord = await cotfr.convertRecordIntoRecordResolved(deleted,"English")

    //#CTODO Discordに通知する際にuidを使う。
    recordC.deleteWithConsistency(
        input.recordID
    );
    
    await new Notifier().sendRecordRemovedMessage(uid,deleted,resolvedRecord,input.reason);
    return {
        isSucceeded:true
    }
}