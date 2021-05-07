import { RecordDataBase } from "../../firestore/RecordDataBase";
import { APIFunctions } from "../../../../../src/ts/type/api/relation";

export async function rawdata(recordDataBase:RecordDataBase,input:APIFunctions["record_rawdata"]["atServer"]):Promise<APIFunctions["record_rawdata"]["atClient"]>{
    return {
        isSucceeded:true,
        result: await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)
    }
}