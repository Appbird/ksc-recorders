import { IReceivedDataAtServer_recordDetail } from "../../../../../src/ts/type/api/record/IReceivedDataAtServer_recordDetail";
import { IReceivedDataAtClient_recordDetail } from "../../../../../src/ts/type/api/record/IReceivedDataAtClient_recordDetail";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { RecordDataBase } from "../../firestore/RecordDataBase";

export async function detail(recordDataBase:RecordDataBase,input:IReceivedDataAtServer_recordDetail):Promise<IReceivedDataAtClient_recordDetail>{
    const result = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)
    const converter = new ControllerOfTableForResolvingID(recordDataBase)
    return {
        isSucceeded:true,
        result: await converter.convertRecordIntoRecordResolved(result,input.lang)
    }
}