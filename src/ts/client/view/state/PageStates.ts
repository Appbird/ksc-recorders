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
import { S_SettingNewRegulationState_CollectionViewer } from "./settingNewRegulationState/S_SettingRegulationState_CollectionViewer";
import { S_SettingRegulationState_GameSystemDocViewer } from "./settingNewRegulationState/S_SettingRegulationState_GameSystemDocViewer";
import { S_SettingRegulationState_GameModeDocViewer } from "./settingNewRegulationState/S_SettingRegulationState_GameModeDocViewer";
import { S_SettingRegulationState_AbilityDocViewer } from "./settingNewRegulationState/S_SettingRegulationState_AbilityDocViewer";
import { S_SettingRegulationState_TargetDocViewer } from "./settingNewRegulationState/S_SettingRegulationState_TargetDocViewer";
import { S_SettingRegulationState_DifficultyDocViewer } from "./settingNewRegulationState/S_SettingRegulationState_DifficultyDocViewer";
import { S_GamemodeListOfPlayersPlayed } from "./gamemodeListOfPlayersPlayed";
import { S_UserPageInSpecific } from "./UserPageInSpecific";
import { S_UserPageInWhole } from "./UserPageInWhole";
import { S_SettingUserInfo } from "./settingUserInfo";
import { S_NotificationList } from "./notificationList";

export type RequiredObjectType<StateClass> = StateClass extends PageStateBaseClass<infer U,IAppUsedToRead>? U : never;
export type UsedIAppLimited<IAppLimited> = IAppLimited extends PageStateBaseClass<any,infer U>? U:never;
export type PageStates = PageStatesWithRequiredObject & PageStateWithoutRequiredObject;
export interface PageStatesWithRequiredObject{
    //#NOTE それぞれのステートに対応するステートクラスをここに記述する。
    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchResultView:S_SearchResult,
    gameModeSeletor:S_GameModeSelector,
    sendRecordOffer:S_SendRecordOffer,

    userPageInWhole:S_UserPageInWhole,
    userPageInSpecific:S_UserPageInSpecific,
    gamemodeListOfPlayersPlayed:S_GamemodeListOfPlayersPlayed,
    settingUserInfo:S_SettingUserInfo,
    notificationList:S_NotificationList,

    settingRegulation_GameSystemDocViewer:S_SettingRegulationState_GameSystemDocViewer,
    settingRegulation_GameModeDocViewer:S_SettingRegulationState_GameModeDocViewer,
    settingRegulation_AbilityDocViewer:S_SettingRegulationState_AbilityDocViewer,
    settingRegulation_TargetDocViewer:S_SettingRegulationState_TargetDocViewer,
    settingRegulation_DifficultyDocViewer:S_SettingRegulationState_DifficultyDocViewer,
}
export interface PageStateWithoutRequiredObject{
    none:S_None,
    searchConditionSelectorView:S_SearchConditionSelector,
    gameSystemSelector:S_GameSystemSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    spinnerExhibition:S_SpinnerExhibition,
    settingNewRegulation_CollectionViewer:S_SettingNewRegulationState_CollectionViewer
}
export const pageStates:PageStatesConstructorObj= {
    none:S_None,
    searchConditionSelectorView:S_SearchConditionSelector,
    gameSystemSelector:S_GameSystemSelector,
    mainMenu:S_MainMenu,
    offerForm:S_OfferForm,
    spinnerExhibition:S_SpinnerExhibition,
    settingNewRegulation_CollectionViewer:S_SettingNewRegulationState_CollectionViewer,


    errorView:S_ErrorState,
    detailView:S_SearchDetail,
    searchResultView:S_SearchResult,
    gameModeSeletor:S_GameModeSelector,
    sendRecordOffer:S_SendRecordOffer,
    notificationList:S_NotificationList,

    userPageInWhole:S_UserPageInWhole,
    userPageInSpecific:S_UserPageInSpecific,
    gamemodeListOfPlayersPlayed:S_GamemodeListOfPlayersPlayed,
    settingUserInfo:S_SettingUserInfo,

    settingRegulation_GameSystemDocViewer:S_SettingRegulationState_GameSystemDocViewer,
    settingRegulation_GameModeDocViewer:S_SettingRegulationState_GameModeDocViewer,
    settingRegulation_AbilityDocViewer:S_SettingRegulationState_AbilityDocViewer,
    settingRegulation_TargetDocViewer:S_SettingRegulationState_TargetDocViewer,
    settingRegulation_DifficultyDocViewer:S_SettingRegulationState_DifficultyDocViewer,
}
