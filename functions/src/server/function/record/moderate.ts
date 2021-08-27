import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { RecordResolver } from "../../wraper/RecordResolver";
import { authentication } from "../foundation/auth";
import { Notifier } from "../webhooks/Notificator";

export async function moderate(input:APIFunctions["record_moderate"]["atServer"]):Promise<APIFunctions["record_moderate"]["atClient"]>{
    const ig = input.gameSystemEnv
    const moderator = await authentication(input.IDToken);
    const cotfr = new RecordResolver(ig.gameSystemID,ig.gameModeID)
    const record = await new RecordCollectionController(ig.gameSystemID,ig.gameModeID).verifiedRecord(input.recordId,moderator)
    
    const recordResolved = await cotfr.convertRecordIntoRecordResolved(record,"English")

    const webhooker = new Notifier()
    
    webhooker.sendRecordModeratedMessage(recordResolved,moderator)
    return {
        isSucceeded:true,
        result:undefined
    }

}