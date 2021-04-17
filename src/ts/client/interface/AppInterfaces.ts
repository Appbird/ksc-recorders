import { APIFunctions, APIFunctions_noChanging } from "../../type/api/relation";
import { LanguageInApplication } from "../../type/LanguageInApplication";
import { IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { StateAdministerReadOnly } from "../administers/StateAdminister";
import { PageStates, RequiredObjectType } from "../view/state/PageStates";


export interface IAppUsedToRead{
    state:StateAdministerReadOnly,
    accessToAPI:<T extends keyof APIFunctions_noChanging>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
    /* 入力要求画面を要するのであれば、入力要求画面自体はAppのステートを変えないので、ここに分類される。 */
}
export interface IAppUsedToReadAndChangeOnlyPageState/*IAppUsedToReadAndChangeOnlyPageState*/ extends IAppUsedToRead{
    accessToAPI:<T extends keyof APIFunctions_noChanging>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
    transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>):void
    transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>,{ifAppendHistory,title}:{ifAppendHistory?:boolean,title?:string}):void
}
export interface IAppUsedToReadAndChangePage extends IAppUsedToReadAndChangeOnlyPageState{
    changeTargetGameMode:(gameSystemEnv:{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}) =>  Promise<void>
    setLanguage(lang:LanguageInApplication):void;
}
export interface IAppUsedToChangeState extends IAppUsedToReadAndChangePage{
    accessToAPI:<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
}
