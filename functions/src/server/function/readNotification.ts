import { APIFunctions } from "../../../../src/ts/type/api/relation";
import { NotificationListController } from "../firestore/NotificationListController";
import { authentication } from "./foundation/auth";

export async function readNotification({idToken}:APIFunctions["notification_read"]["atServer"]):Promise<APIFunctions["notification_read"]["atClient"]>{
    new NotificationListController(await authentication(idToken)).readNotification();
    return {isSucceeded:true,result:undefined}
}