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
import { S_OfferForm } from "./offerForm";
import { S_SendRecordOffer } from "./sendRecordOffer";
import { S_SpinnerExhibition } from "./SpinnerExhibition";

export type RequiredObjectType<StateClass> = StateClass extends PageStateBaseClass<infer U,IAppUsedToRead>? U : never;
export type UsedIAppLimited<IAppLimited> = IAppLimited extends PageStateBaseClass<any,infer U>? U:never;
export type PageStates = PageStatesWithRequiredObject & PageStateWithoutRequiredObject;
export interface PageStatesWithRequiredObject{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchResultView:S_SearchResult,
    gameModeSeletor:S_GameModeSelector,
    sendRecordOffer:S_SendRecordOffer
}
export interface PageStateWithoutRequiredObject{
    none:S_None,
    searchConditionSelectorView:S_SearchConditionSelector,
    gameSystemSelector:S_GameSystemSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    spinnerExhibition:S_SpinnerExhibition
}
export const pageStates:PageStatesConstructorObj= {
    none:S_None,
    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchConditionSelectorView:S_SearchConditionSelector,
    searchResultView:S_SearchResult,
    gameSystemSelector:S_GameSystemSelector,
    gameModeSeletor:S_GameModeSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    sendRecordOffer:S_SendRecordOffer,
    spinnerExhibition:S_SpinnerExhibition
}
