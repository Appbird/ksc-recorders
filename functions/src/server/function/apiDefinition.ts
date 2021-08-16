import { isIReceivedDataAtServer_getlist_UseId } from "../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdId } from "../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdMIdId } from "../../../../src/ts/type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseId } from "../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdId } from "../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdMIdId } from "../../../../src/ts/type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId.validator";
import { isIReceivedDataAtServer_recordDetail } from "../../../../src/ts/type/api/record/notChanging/IReceivedDataAtServer_recordDetail.validator";
import { isIReceivedDataAtServer_recordRawdata } from "../../../../src/ts/type/api/record/notChanging/IReceivedDataAtServer_recordRawdata.validator";
import { isIReceivedDataAtServer_recordSearch } from "../../../../src/ts/type/api/record/notChanging/IReceivedDataAtServer_recordSearch.validator";
import { isIReceivedDataAtServer_notificationRead } from "../../../../src/ts/type/api/notification/IReceivedDataAtServer_notificationRead.validator";
import { isIReceivedDataAtServer_recordWrite } from "../../../../src/ts/type/api/record/changing/IReceivedDataAtServer_recordWrite.validator";
import { isIReceivedDataAtServer_recordDelete } from "../../../../src/ts/type/api/record/changing/IReceivedDataAtServer_recordDelete.validator";
import { isIReceivedDataAtServer_recordModify } from "../../../../src/ts/type/api/record/changing/IReceivedDataAtServer_recordModify.validator";
import { isIReceivedDataAtServer_recordModerate } from "../../../../src/ts/type/api/record/changing/IReceivedDataAtServer_recordModerate.validator";
import { isIReceivedDataAtServer_addDiscordRoleID }from "../../../../src/ts/type/api/DiscordRole/IReceivedDataAtServer_addDiscordRoleID.validator"
//#CH 出来ることならTypeScript_json_validatorの出力結果を一つにまとめたい。--collection trueオプションをどう使えばいいのだろうか…。
import { APIFunctions } from "../../../../src/ts/type/api/relation";
import { IReceivedData, IReceivedDataAtClient, IReceivedDataAtServer } from "../../../../src/ts/type/api/transmissionBase";
import { ValidateFunction } from '../../../../src/ts/type/api/ValidateFunction';
import { RecordDataBase } from "../firestore/RecordDataBase";
import { abilities, difficulties, gameModes, gameSystems, hashTags, hashTags_onlyApproved, runners, targets } from "./list/getList";
import { ability, difficulty, gameMode, gameSystem, hashTag, runner, target } from "./list/pickUp";
import { detail } from "./record/detail";
import { search } from "./record/search";
import { readNotification } from "./readNotification";
import { write } from "./record/write";
import { remove } from "./record/remove";
import { modify } from "./record/modify";
import { rawdata } from "./record/rawdata";
import { moderate } from "./record/moderate";
import { addDiscordRoleID } from "./webhooks/addDiscordRoleID";

class APIList{
    private apiDefinition = new Map<string,apiInterface<IReceivedData>>()
    constructor(){}
    set<U extends IReceivedData>(title:string,validateFunction:ValidateFunction<U["atServer"]>,process:ProcessFunction<U["atServer"],U["atClient"]>,{privilege="everyone"}:{privilege?:PrivilegeType}={}){
        this.apiDefinition.set(title,{validator:validateFunction, process:process,privilege:privilege})
    }
    forEach(callback:(value:apiInterface<IReceivedData>,key:string) => void){
        return this.apiDefinition.forEach(callback)
    }
}

type ProcessFunction<AtServer extends IReceivedDataAtServer,AtClient extends IReceivedDataAtClient > = (recordDatabase:RecordDataBase,input:AtServer) => Promise<AtClient>;
export type PrivilegeType = "comiteeMemberOrOwner"|"onlyCommiteeMember"|"everyone";
interface apiInterface<Received extends IReceivedData>{    
    validator:ValidateFunction<Received["atServer"]>
    process:ProcessFunction<Received["atServer"],Received["atClient"]>
    privilege:PrivilegeType
}

export const apiList = new APIList();

apiList.set<APIFunctions["record_search"]>  ("/record/search", isIReceivedDataAtServer_recordSearch, search)
apiList.set<APIFunctions["record_detail"]>  ("/record/detail", isIReceivedDataAtServer_recordDetail, detail)
apiList.set<APIFunctions["record_rawdata"]>  ("/record/rawdata", isIReceivedDataAtServer_recordRawdata, rawdata)
apiList.set<APIFunctions["record_write"]>   ("/record/write", isIReceivedDataAtServer_recordWrite, write)
apiList.set<APIFunctions["record_delete"]>  ("/record/delete", isIReceivedDataAtServer_recordDelete, remove,{privilege:"comiteeMemberOrOwner"})
apiList.set<APIFunctions["record_modify"]>  ("/record/modify", isIReceivedDataAtServer_recordModify, modify,{privilege:"comiteeMemberOrOwner"})
apiList.set<APIFunctions["record_moderate"]>  ("/record/moderate", isIReceivedDataAtServer_recordModerate, moderate,{privilege:"onlyCommiteeMember"})

apiList.set<APIFunctions["list_gameSystems"]>  ("/list/gameSystems", isIReceivedDataAtServer_getlist_UseId, gameSystems)
apiList.set<APIFunctions["list_runners"]>      ("/list/runners", isIReceivedDataAtServer_getlist_UseId, runners)
apiList.set<APIFunctions["list_gameModes"]>    ("/list/gameModes", isIReceivedDataAtServer_getlist_UseSIdId, gameModes)
apiList.set<APIFunctions["list_hashTags"]>     ("/list/hashTags",isIReceivedDataAtServer_getlist_UseSIdId,hashTags)
apiList.set<APIFunctions["list_hashTags_onlyApproved"]>("/list/hashTags/onlyApproved",isIReceivedDataAtServer_getlist_UseSIdId,hashTags_onlyApproved)
apiList.set<APIFunctions["list_difficulties"]> ("/list/difficulties", isIReceivedDataAtServer_getlist_UseSIdMIdId, difficulties)
apiList.set<APIFunctions["list_abilities"]>    ("/list/abilities", isIReceivedDataAtServer_getlist_UseSIdMIdId, abilities)
apiList.set<APIFunctions["list_targets"]>      ("/list/targets", isIReceivedDataAtServer_getlist_UseSIdMIdId, targets)

apiList.set<APIFunctions["list_gameSystem"]> ("/list/gameSystem", isIReceivedDataAtServer_pickUp_UseId, gameSystem)
apiList.set<APIFunctions["list_runner"]>("/list/runner", isIReceivedDataAtServer_pickUp_UseId, runner)
apiList.set<APIFunctions["list_gameMode"]>   ("/list/gameMode", isIReceivedDataAtServer_pickUp_UseSIdId, gameMode)
apiList.set<APIFunctions["list_hashTag"]>    ("/list/hashTag",isIReceivedDataAtServer_pickUp_UseSIdId,hashTag)
apiList.set<APIFunctions["list_difficulty"]> ("/list/difficulty", isIReceivedDataAtServer_pickUp_UseSIdMIdId, difficulty)
apiList.set<APIFunctions["list_ability"]>    ("/list/ability", isIReceivedDataAtServer_pickUp_UseSIdMIdId, ability)
apiList.set<APIFunctions["list_target"]>     ("/list/target", isIReceivedDataAtServer_pickUp_UseSIdMIdId, target)

apiList.set<APIFunctions["notification_read"]>  ("/notification/read", isIReceivedDataAtServer_notificationRead, readNotification)

apiList.set<APIFunctions["addDiscordRoleID"]>  ("/addDiscordRoleID", isIReceivedDataAtServer_addDiscordRoleID, addDiscordRoleID)
