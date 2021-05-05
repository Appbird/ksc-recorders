import { APIFunctions } from "../../../../src/ts/type/api/relation";
import { RecordDataBase } from "../firestore/RecordDataBase";
import { authentication } from "./foundation/auth";

export async function readNotification(recordDataBase:RecordDataBase,{idToken}:APIFunctions["notification_read"]["atServer"]):Promise<APIFunctions["notification_read"]["atClient"]>{
    recordDataBase.readNotificationsOfRunner(await authentication(idToken));
    return {isSucceeded:true,result:undefined}
}