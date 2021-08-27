import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecordWithoutID } from "../../../../../src/ts/type/record/IRecord";
import { AbilityAttributeCollectionController } from "../../firestore/AbilityAttributeCollectionController";
import { GameModeItemController } from "../../firestore/GameModeItemController";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { RecordResolver } from "../../wraper/RecordResolver";
import { authentication } from "../foundation/auth";
import { Notifier } from "../webhooks/Notificator";
import { convertTagNameToTagID } from "./convertTagNameToTagID";
import { validateRecord } from "./validateRecord";

export async function modify(input:APIFunctions["record_modify"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    const ir = input.gameSystemEnv
    const recordC = new RecordCollectionController(ir.gameSystemID,ir.gameModeID)
    const recordBeforeModified = await recordC.getInfo(input.recordID)
    const {timestamp_post,runnerID,languageOfTagName} = recordBeforeModified
    const modifier = await authentication(input.IDToken);
    const result:IRecordWithoutID = {
        ...input.recordModified,
        regulation:{
            ...input.recordModified.regulation,
            gameSystemEnvironment:{
                gameDifficultyID:input.recordModified.regulation.gameSystemEnvironment.gameDifficultyID,
                gameSystemID:recordBeforeModified.regulation.gameSystemEnvironment.gameSystemID,
                gameModeID:recordBeforeModified.regulation.gameSystemEnvironment.gameModeID
            }
        },
        timestamp_post:timestamp_post,
        runnerID:runnerID,
        languageOfTagName:languageOfTagName,
        tagID:await convertTagNameToTagID(
                    ir.gameSystemID,
                    input.recordModified.tagName,
                    input.language),
    }
    
    const irrg = result.regulation.gameSystemEnvironment
    const gameMode = await new GameModeItemController(irrg.gameSystemID).getInfo(irrg.gameModeID)
    const attributes = await new AbilityAttributeCollectionController(irrg.gameSystemID,irrg.gameModeID).getCollection()
    validateRecord(result,gameMode,attributes)
    const record = await recordC.modifyWithConsistency(input.recordID,modifier,result);
    const cotfr = new RecordResolver(irrg.gameSystemID,irrg.gameModeID);
    
    const recordResolved = await cotfr.convertRecordIntoRecordResolved(record,input.language);
    
    const discord = new Notifier();
    await discord.sendRecordModifiedMessage(modifier,(input.language === "English") ? recordResolved:await cotfr.convertRecordIntoRecordResolved(record,"English"),input.reason)
    return {
        isSucceeded:true,
        result: recordResolved
    }
}
