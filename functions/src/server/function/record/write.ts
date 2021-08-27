import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecord } from "../../../../../src/ts/type/record/IRecord";
import { AbilityAttributeCollectionController } from "../../firestore/AbilityAttributeCollectionController";
import { GameModeItemController } from "../../firestore/GameModeItemController";
import { WithoutID } from "../../firestore/IFirestoreCollectionController";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { RecordResolver } from "../../wraper/RecordResolver";
import { authentication } from "../foundation/auth";
import { Notifier } from "../webhooks/Notificator";
import { convertTagNameToTagID } from "./convertTagNameToTagID";
import { validateRecord } from "./validateRecord";

export async function write(input:APIFunctions["record_write"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    
    const result:WithoutID<IRecord> = {
        ...input.record,
        runnerID:await authentication(input.IDToken),
        tagID: await convertTagNameToTagID(
                                    input.record.regulation.gameSystemEnvironment.gameSystemID,
                                    input.record.tagName,
                                    input.language),
        timestamp_post: Date.now(),
        moderatorIDs:[]
    }
    const irrg = input.record.regulation.gameSystemEnvironment
    const recordC = new RecordCollectionController(irrg.gameSystemID,irrg.gameModeID)
    const gameMode = await new GameModeItemController(irrg.gameSystemID).getInfo(irrg.gameModeID)
    const attributes = await new AbilityAttributeCollectionController(irrg.gameSystemID,irrg.gameModeID).getCollection()

    validateRecord(result,gameMode,attributes)

    const record = await recordC.addWithConsistency(result);
    const cotfr = new RecordResolver(irrg.gameSystemID,irrg.gameModeID);
    const resolvedRecord = await cotfr.convertRecordIntoRecordResolved(record,input.language)

    const discord = new Notifier();
    await discord.sendRecordRegisteredMessage(resolvedRecord);
    return {
        isSucceeded:true,
        result: resolvedRecord
    }
}

