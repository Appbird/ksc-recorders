import { IReceivedDataAtServer_recordDetail } from "../../../type/api/record/IReceivedDataAtServer_recordDetail";
import { IReceivedDataAtClient_recordDetail } from "../../../type/api/record/IReceivedDataAtClient_recordDetail";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { InterfaceOfRecordDatabase } from "../../type/InterfaceOfRecordDatabase";

export async function detail(recordDataBase:InterfaceOfRecordDatabase,input:IReceivedDataAtServer_recordDetail):Promise<IReceivedDataAtClient_recordDetail>{
    const result = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.id)
    const converter = new ControllerOfTableForResolvingID(recordDataBase)
    return {
        isSucceeded:true,
        result: await converter.convertRecordIntoRecordResolved(result,input.lang)
    }
}