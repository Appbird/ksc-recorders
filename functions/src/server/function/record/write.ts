import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecordWithoutID } from "../../../../../src/ts/type/record/IRecord";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { DiscordWebhookers } from "../webhooks/discord";
import { convertTagNameToTagID } from "./convertTagNameToTagID";

export async function write(recordDataBase:RecordDataBase,input:APIFunctions["record_write"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    
    const result:IRecordWithoutID = {
        ...input.record,
        runnerID:await authentication(input.IDToken),
        tagID: await convertTagNameToTagID(
                                    input.record.regulation.gameSystemEnvironment.gameSystemID,
                                    recordDataBase,
                                    input.record.tagName,
                                    input.language),
        timestamp_post: Date.now()
    }
    const record = await recordDataBase.writeRecord(result);
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase);
    const resolvedRecord = await cotfr.convertRecordIntoRecordResolved(record,input.language)

    const discord = new DiscordWebhookers(recordDataBase);
    await discord.sendRecordRegisteredMessage(resolvedRecord);
    return {
        isSucceeded:true,
        result: resolvedRecord
    }
}
