import { PrivilegeType } from "./server/function/apiDefinition";
import { IReceivedDataAtServerNeedAuthentication } from "../../src/ts/type/api/transmissionBase";
import { isCommiteeMember } from "./server/function/privilegeChecker/isCommiteeMember";
import { isRecordOwner } from "./server/function/privilegeChecker/isRecordOwner";

export async function checkPrivilege(privilege: PrivilegeType, request: IReceivedDataAtServerNeedAuthentication, uid: string) {
    switch (privilege) {
        case "comiteeMemberOrOwner": return await isRecordOwner(request, uid) || await isCommiteeMember(uid);
        case "onlyCommiteeMember": return isCommiteeMember(uid);
        case "everyone": return true;
    }
}
