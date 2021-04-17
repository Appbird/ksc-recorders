import { S_None } from "./none";
import { S_ErrorState} from "./ErrorState"
import { PageStatesConstructorObj} from "../../interface/PageStatesStructure";
import { S_SearchDetail } from "./SearchDetail";
import { S_SearchConditionSelector } from "./searchConditionSelector";
import { S_SearchResult } from "./searchResult";
import { S_GameSystemSelector } from "./gameSystemSelector";
import { S_GameModeSelector } from "./GameModeSelector";
import { S_MainMenu } from "./mainMenu";
import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export type RequiredObjectType<StateClass> = StateClass extends PageStateBaseClass<infer U,IAppUsedToRead>? U : never;
export type UsedIAppLimited<IAppLimited> = IAppLimited extends PageStateBaseClass<any,infer U>? U:never;
export interface PageStates{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    none:S_None,
    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchConditionSelectorView:S_SearchConditionSelector,
    searchResultView:S_SearchResult,
    gameSystemSelector:S_GameSystemSelector,
    gameModeSeletor:S_GameModeSelector,
    mainMenu:S_MainMenu
}
export const pageStates:PageStatesConstructorObj= {
    none:S_None,
    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchConditionSelectorView:S_SearchConditionSelector,
    searchResultView:S_SearchResult,
    gameSystemSelector:S_GameSystemSelector,
    gameModeSeletor:S_GameModeSelector,
    mainMenu:S_MainMenu
}
export const stateView = ["none","errorView","detailView","searchConditionSelectorView","searchResultView","gameSystemSelector","mainMenu"];

