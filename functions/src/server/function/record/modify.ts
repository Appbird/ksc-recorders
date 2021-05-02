import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecordWithoutID } from "../../../../../src/ts/type/record/IRecord";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { convertTagNameToTagID } from "./convertTagNameToTagID";

export async function write(recordDataBase:RecordDataBase,input:APIFunctions["record_modify"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    const modifier = await authentication(input.IDToken);
    const result:IRecordWithoutID = {
        ...input.record,
        tagID: await convertTagNameToTagID(
                                    input.record.regulation.gameSystemEnvironment.gameSystemID,
                                    recordDataBase,
                                    input.record.tagName,
                                    input.language)
    }
    const record = await recordDataBase.modifyRecord(input.recordID,modifier,result);
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase);
    
    return {
        isSucceeded:true,
        result: await cotfr.convertRecordIntoRecordResolved(record,input.language)
    }
}
