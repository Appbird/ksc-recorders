import { isIReceivedDataAtServer_getlist_UseId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdMIdId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdMIdId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId.validator";
import { isIReceivedDataAtServer_recordDetail } from "../../type/api/record/IReceivedDataAtServer_recordDetail.validator";
import { isIReceivedDataAtServer_recordSearch } from "../../type/api/record/IReceivedDataAtServer_recordSearch.validator";
//#TODO 出来ることならTypeScript_json_validatorの出力結果を一つにまとめたい。--collection trueオプションをどう使えばいいのだろうか…。
import { APIFunctions } from "../../type/api/relation";
import { IReceivedData } from "../../type/api/transmissionBase";
import { ValidateFunction } from '../../type/api/ValidateFunction';
import { InterfaceOfRecordDatabase } from "../type/InterfaceOfRecordDatabase";
import { abilities, difficulties, gameModes, gameSystems, hashTags, runners, targets } from "./list/getList";
import { ability, difficulty, gameMode, gameSystem, hashTag, runner, target } from "./list/pickUp";
import { detail } from "./record/detail";
import { search } from "./record/search";

class APIList{
    private apiDefinition = new Map<string,apiInterface<IReceivedData>>()
    constructor(){}
    set<U extends IReceivedData>(title:string,validateFunction:ValidateFunction<U["atServer"]>,process:ProcessFunction<U>){
        return this.apiDefinition.set(title,{validator:validateFunction, process:process})
    }
    forEach(callback:(value:apiInterface<IReceivedData>,key:string) => void){
        return this.apiDefinition.forEach(callback)
    }
}

type ProcessFunction<Received extends IReceivedData> = (recordDatabase:InterfaceOfRecordDatabase,input:Received["atServer"]) => Promise<Received["atClient"]>;

interface apiInterface<Received extends IReceivedData>{    
    validator:ValidateFunction<Received["atServer"]>
    process:ProcessFunction<Received>
}

export const apiList = new APIList();

apiList.set<APIFunctions["record_search"]> ("/record/search", isIReceivedDataAtServer_recordSearch, search)
apiList.set<APIFunctions["record_detail"]> ("/record/search", isIReceivedDataAtServer_recordDetail, detail)

apiList.set<APIFunctions["list_gameSystems"]>  ("/list/gameSystems", isIReceivedDataAtServer_getlist_UseId, gameSystems)
apiList.set<APIFunctions["list_runners"]>      ("/list/runners", isIReceivedDataAtServer_getlist_UseId, runners)
apiList.set<APIFunctions["list_gameModes"]>    ("/list/gameModes", isIReceivedDataAtServer_getlist_UseSIdId, gameModes)
apiList.set<APIFunctions["list_hashTags"]>     ("/list/hashTags",isIReceivedDataAtServer_getlist_UseSIdId,hashTags)
apiList.set<APIFunctions["list_difficulties"]> ("/list/difficulties", isIReceivedDataAtServer_getlist_UseSIdMIdId, difficulties)
apiList.set<APIFunctions["list_abilities"]>    ("/list/abilities", isIReceivedDataAtServer_getlist_UseSIdMIdId, abilities)
apiList.set<APIFunctions["list_targets"]>      ("/list/gameTargets", isIReceivedDataAtServer_getlist_UseSIdMIdId, targets)

apiList.set<APIFunctions["list_gameSystem"]> ("/list/gameSystem", isIReceivedDataAtServer_pickUp_UseId, gameSystem)
apiList.set<APIFunctions["list_runner"]>     ("/list/runner", isIReceivedDataAtServer_pickUp_UseId, runner)
apiList.set<APIFunctions["list_gameMode"]>   ("/list/gameMode", isIReceivedDataAtServer_pickUp_UseSIdId, gameMode)
apiList.set<APIFunctions["list_hashTag"]>    ("/list/hashTag",isIReceivedDataAtServer_pickUp_UseSIdId,hashTag)
apiList.set<APIFunctions["list_difficulty"]> ("/list/difficulty", isIReceivedDataAtServer_pickUp_UseSIdMIdId, difficulty)
apiList.set<APIFunctions["list_ability"]>    ("/list/ability", isIReceivedDataAtServer_pickUp_UseSIdMIdId, ability)
apiList.set<APIFunctions["list_target"]>     ("/list/target", isIReceivedDataAtServer_pickUp_UseSIdMIdId, target)




