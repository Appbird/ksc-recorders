import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { APIFunctions } from "../../../../../src/ts/type/api/relation";

export async function detail(recordDataBase:RecordDataBase,input:APIFunctions["record_detail"]["atServer"]):Promise<APIFunctions["record_detail"]["atClient"]>{
    const result = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)
    const converter = new ControllerOfTableForResolvingID(recordDataBase)
    return {
        isSucceeded:true,
        result: await converter.convertRecordIntoRecordResolved(result,input.lang)
    }
}