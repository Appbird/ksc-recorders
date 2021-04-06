import { IReceivedDataAtClient_recordDetail, IReceivedDataAtServer_recordDetail } from "../../../type/transmission/record/IReceivedData_recordDetail";
import { convertRecordIntoRecordResolved } from "../../recordConverter/convertRecordIntoIRecordResolved";
import { recordDataBase } from "../../tmpDataBase/RecordDataBase";

export async function detail(input:IReceivedDataAtServer_recordDetail):Promise<IReceivedDataAtClient_recordDetail>{
    const result = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)
    return {
        isSuccess:true,
        result: await convertRecordIntoRecordResolved(result,input.lang)
    }
}