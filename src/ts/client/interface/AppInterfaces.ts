import { APIFunctions, APIFunctions_noChanging } from "../../type/api/relation";
import { LanguageInApplication } from "../../type/LanguageInApplication";
import { IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { LoginAdministratorReadOnly } from "../Administrator/LoginAdministrator";
import { PageNotificationAdministrator } from "../Administrator/PageNotificationAdministrator";
import { StateAdministerReadOnly } from "../Administrator/StateAdminister";
import { PageStates, RequiredObjectType } from "../view/state/PageStates";


export interface IAppUsedToRead{
    state:StateAdministerReadOnly;
    loginAdministratorReadOnly:LoginAdministratorReadOnly;
    accessToAPI:<T extends keyof APIFunctions_noChanging>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
}
export interface IAppUsedToReadAndChangeOnlyPageState/*IAppUsedToReadAndChangeOnlyPageState*/ extends IAppUsedToRead{
    
    notie:PageNotificationAdministrator;
    accessToAPI:<T extends keyof APIFunctions_noChanging>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
    transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>):void
    transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>,{ifAppendHistory,title}:{ifAppendHistory?:boolean,title?:string}):void
    errorCatcher(error:any,title?:string):void
}
export interface IAppUsedToReadAndChangePage extends IAppUsedToReadAndChangeOnlyPageState{
    login():Promise<void>
    logout():Promise<void>
    changeTargetGameMode:(gameSystemEnv:{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}|null) =>  Promise<void> | undefined
    setLanguage(lang:LanguageInApplication):void;
}
export interface IAppUsedToChangeState extends IAppUsedToReadAndChangePage{
    accessToAPI:<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]) => Promise<APIFunctions[T]["atClient"]>
}
