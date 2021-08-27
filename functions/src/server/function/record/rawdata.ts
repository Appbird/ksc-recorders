import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";

export async function rawdata(input:APIFunctions["record_rawdata"]["atServer"]):Promise<APIFunctions["record_rawdata"]["atClient"]>{
    return {
        isSucceeded:true,
        result: await new RecordCollectionController(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID).getInfo(input.id)
    }
}