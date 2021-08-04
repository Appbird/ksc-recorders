import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecordWithoutID } from "../../../../../src/ts/type/record/IRecord";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { Notificator } from "../webhooks/Notificator";
import { convertTagNameToTagID } from "./convertTagNameToTagID";

export async function modify(recordDataBase:RecordDataBase,input:APIFunctions["record_modify"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    const recordBeforeModified = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.recordID)
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
                    input.gameSystemEnv.gameSystemID,
                    recordDataBase,
                    input.recordModified.tagName,
                    input.language),
    }
    const record = await recordDataBase.modifyRecord(input.recordID,modifier,result);
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase);
    
   const recordResolved = await cotfr.convertRecordIntoRecordResolved(record,input.language);
    
    const discord = new Notificator(recordDataBase);
    await discord.sendRecordModifiedMessage(recordDataBase,modifier,recordResolved,input.reason)
    return {
        isSucceeded:true,
        result: recordResolved
    }
}
