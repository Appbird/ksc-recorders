
import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";
import { RecordResolver } from "../../wraper/RecordResolver";

export async function detail(input:APIFunctions["record_detail"]["atServer"]):Promise<APIFunctions["record_detail"]["atClient"]>{
    const ig = input.gameSystemEnv
    const recordC = new RecordCollectionController(ig.gameSystemID,ig.gameModeID)
    const recordResolver = new RecordResolver(ig.gameSystemID,ig.gameModeID)
    const result = await recordC.getInfo(input.id)
    return {
        isSucceeded:true,
        result: await recordResolver.convertRecordIntoRecordResolved(result,input.lang)
    }
}