import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { Notificator } from "../webhooks/Notificator";

export async function moderate(recordDataBase:RecordDataBase,input:APIFunctions["record_moderate"]["atServer"]):Promise<APIFunctions["record_moderate"]["atClient"]>{
    const moderator = await authentication(input.IDToken);
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase)
    const record = await cotfr.convertRecordIntoRecordResolved(
        await recordDataBase.verifyRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.recordId,moderator),"English"
    )

    const webhooker = new Notificator(recordDataBase)
    
    webhooker.sendRecordModeratedMessage(recordDataBase,record,moderator)
    return {
        isSucceeded:true,
        result:undefined
    }

}