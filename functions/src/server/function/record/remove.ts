import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { authentication } from "../foundation/auth";

export async function remove(recordDataBase:RecordDataBase,input:APIFunctions["record_delete"]["atServer"]):Promise<APIFunctions["record_delete"]["atClient"]>{
    const uid = authentication(input.IDToken);
    //#TODO Discordに通知する際にuidを使う。
    recordDataBase.removeRecord(
        input.gameSystemEnv.gameSystemID,
        input.gameSystemEnv.gameModeID,
        input.recordID
    );
    return {
        isSucceeded:true
    }
}