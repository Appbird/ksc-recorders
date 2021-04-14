import { isIReceivedDataAtServer_getlist_UseId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId.validator";
import { isIReceivedDataAtServer_getlist_UseSIdMIdId } from "../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId.validator";
import { isIReceivedDataAtServer_pickUp_UseSIdMIdId } from "../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId.validator";
import { IReceivedData_listAbilities,IReceivedData_listDifficulties,  IReceivedData_listGameModes, IReceivedData_listGameSystems, IReceivedData_listHashTags, IReceivedData_listRunners, IReceivedData_listTargets, IReceivedData_pickUpAbility, IReceivedData_pickUpDifficulty, IReceivedData_pickUpGameMode, IReceivedData_pickUpGameSystem, IReceivedData_pickUpHashTag, IReceivedData_pickUpRunner, IReceivedData_pickUpTarget } from "../../type/api/list/relation";
import { isIReceivedDataAtServer_recordDetail } from "../../type/api/record/IReceivedDataAtServer_recordDetail.validator";
import { isIReceivedDataAtServer_recordSearch } from "../../type/api/record/IReceivedDataAtServer_recordSearch.validator";
import { IReceivedData_recordDetail, IReceivedData_recordSearch } from "../../type/api/record/relation";
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

apiList.set<IReceivedData_recordSearch> ("/record/search", isIReceivedDataAtServer_recordSearch, search)
apiList.set<IReceivedData_recordDetail> ("/record/search", isIReceivedDataAtServer_recordDetail, detail)

apiList.set<IReceivedData_listGameSystems>  ("/list/gameSystems", isIReceivedDataAtServer_getlist_UseId, gameSystems)
apiList.set<IReceivedData_listRunners>      ("/list/runners", isIReceivedDataAtServer_getlist_UseId, runners)
apiList.set<IReceivedData_listGameModes>    ("/list/gameModes", isIReceivedDataAtServer_getlist_UseSIdId, gameModes)
apiList.set<IReceivedData_listHashTags>     ("/list/hashTags",isIReceivedDataAtServer_getlist_UseSIdId,hashTags)
apiList.set<IReceivedData_listDifficulties> ("/list/difficulties", isIReceivedDataAtServer_getlist_UseSIdMIdId, difficulties)
apiList.set<IReceivedData_listAbilities>    ("/list/abilities", isIReceivedDataAtServer_getlist_UseSIdMIdId, abilities)
apiList.set<IReceivedData_listTargets>      ("/list/gameTargets", isIReceivedDataAtServer_getlist_UseSIdMIdId, targets)

apiList.set<IReceivedData_pickUpGameSystem> ("/list/gameSystems", isIReceivedDataAtServer_pickUp_UseId, gameSystem)
apiList.set<IReceivedData_pickUpRunner>     ("/list/runners", isIReceivedDataAtServer_pickUp_UseId, runner)
apiList.set<IReceivedData_pickUpGameMode>   ("/list/gameModes", isIReceivedDataAtServer_pickUp_UseSIdId, gameMode)
apiList.set<IReceivedData_pickUpHashTag>    ("/list/hashTags",isIReceivedDataAtServer_pickUp_UseSIdId,hashTag)
apiList.set<IReceivedData_pickUpDifficulty> ("/list/difficulties", isIReceivedDataAtServer_pickUp_UseSIdMIdId, difficulty)
apiList.set<IReceivedData_pickUpAbility>    ("/list/abilities", isIReceivedDataAtServer_pickUp_UseSIdMIdId, ability)
apiList.set<IReceivedData_pickUpTarget>     ("/list/gameTargets", isIReceivedDataAtServer_pickUp_UseSIdMIdId, target)




