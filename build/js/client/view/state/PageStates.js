"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateView = exports.pageStates = void 0;
var none_1 = require("./none");
var ErrorState_1 = require("./ErrorState");
var SearchDetail_1 = require("./SearchDetail");
var searchConditionSelector_1 = require("./searchConditionSelector");
var searchResult_1 = require("./searchResult");
var gameSystemSelector_1 = require("./gameSystemSelector");
var GameModeSelector_1 = require("./GameModeSelector");
var mainMenu_1 = require("./mainMenu");
var offerForm_1 = require("./offerForm");
var sendRecordOffer_1 = require("./sendRecordOffer");
var SpinnerExhibition_1 = require("./SpinnerExhibition");
exports.pageStates = {
    none: none_1.S_None,
    errorView: ErrorState_1.S_ErrorState,
    detailView: SearchDetail_1.S_SearchDetail,
    searchConditionSelectorView: searchConditionSelector_1.S_SearchConditionSelector,
    searchResultView: searchResult_1.S_SearchResult,
    gameSystemSelector: gameSystemSelector_1.S_GameSystemSelector,
    gameModeSeletor: GameModeSelector_1.S_GameModeSelector,
    mainMenu: mainMenu_1.S_MainMenu,
    offerForm: offerForm_1.S_OfferForm,
    sendRecordOffer: sendRecordOffer_1.S_SendRecordOffer,
    spinnerExhibition: SpinnerExhibition_1.S_SpinnerExhibition
};
exports.stateView = ["none", "errorView", "detailView", "searchConditionSelectorView", "searchResultView", "gameSystemSelector", "mainMenu"];
