"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionAdministrator = void 0;
var ViewUtility_1 = require("../../utility/ViewUtility");
var RecordsGroupView_1 = require("../view/RecordsGroupView");
var RecordDetailView_1 = require("../view/RecordDetailView");
var aboutElement_1 = require("../utility/aboutElement");
var gameSystemCardsGroup_1 = require("../view/gameSystemCardsGroup");
var marked = require("marked");
var gameModeCardsGroup_1 = require("../view/gameModeCardsGroup");
var StateAdminister_1 = require("./StateAdminister");
var aboutLang_1 = require("../../utility/aboutLang");
var searchConditionSelector_1 = require("../view/searchConditionSelector");
var TransitionAdministrator = /** @class */ (function () {
    function TransitionAdministrator(articleDOM, app, state) {
        this.state = state;
        this.app = app;
        this.articleDOM = articleDOM;
    }
    TransitionAdministrator.prototype.clearView = function () {
        this.articleDOM.innerHTML = "";
    };
    TransitionAdministrator.prototype.transition = function (nextState, requestObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.clearView();
                        _a = nextState;
                        switch (_a) {
                            case "none": return [3 /*break*/, 1];
                            case "errorView": return [3 /*break*/, 2];
                            case "detailView": return [3 /*break*/, 4];
                            case "searchConditionSelectorView": return [3 /*break*/, 6];
                            case "searchResultView": return [3 /*break*/, 8];
                            case "gameSystemSelector": return [3 /*break*/, 10];
                            case "gameModeSeletor": return [3 /*break*/, 12];
                            case "mainMenu": return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 16];
                    case 1: return [3 /*break*/, 17];
                    case 2: return [4 /*yield*/, this.errorView(requestObject)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 4: return [4 /*yield*/, this.detail(requestObject)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 6: return [4 /*yield*/, this.searchConditionSelector(requestObject)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 8: return [4 /*yield*/, this.search(requestObject)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 10: return [4 /*yield*/, this.gameSystemSelector()];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 12: return [4 /*yield*/, this.gameModeSelector(requestObject)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 14: return [4 /*yield*/, this.mainMenu(requestObject)];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 16: throw new Error("\u6307\u5B9A\u3055\u308C\u305F\u30AD\u30FC" + nextState + "\u306B\u5BFE\u5FDC\u3059\u308B\u30DA\u30FC\u30B8\u72B6\u614B\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                    case 17:
                        this.articleDOM.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div class=\"u-space20vh\"></div>"], ["<div class=\"u-space20vh\"></div>"]))));
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.errorView = function (request) {
        this.articleDOM.appendChild(ViewUtility_1.elementWithoutEscaping(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <div class = \"c-recordGroupHeader\">\n            <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n                <div class=\"c-title__sub\">Failed to prepare the page.</div>\n            </div>\n            <hr noshade class=\"u-bold\">\n            <div class=\"u-width90per\">", "</div>\n        </div>"], ["\n        <div class = \"c-recordGroupHeader\">\n            <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n                <div class=\"c-title__sub\">Failed to prepare the page.</div>\n            </div>\n            <hr noshade class=\"u-bold\">\n            <div class=\"u-width90per\">", "</div>\n        </div>"])), request.title, marked(request.message)));
        return;
    };
    TransitionAdministrator.prototype.search = function (requestConditions) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.accessToAPI("record_search", requestConditions.required)];
                    case 1:
                        result = (_a.sent()).result;
                        if (requestConditions.title !== undefined)
                            this.articleDOM.appendChild(ViewUtility_1.element(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div id=\"articleTitle\">\n            <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n            </div>\n            <hr noshade class=\"u-bold\" /></div>"], ["<div id=\"articleTitle\">\n            <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n            </div>\n            <hr noshade class=\"u-bold\" /></div>"])), requestConditions.title));
                        result.map(function (receivedData) { return _this.articleDOM.appendChild(new RecordsGroupView_1.RecordGroupView(receivedData, _this.app).htmlElement); });
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.detail = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var detailDiv, relatedRecordDiv, record, relatedRecord, rank;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        detailDiv = this.articleDOM.appendChild(aboutElement_1.createElementWithIdAndClass({ id: "detail" }));
                        relatedRecordDiv = this.articleDOM.appendChild(aboutElement_1.createElementWithIdAndClass({ id: "related" }));
                        return [4 /*yield*/, this.app.accessToAPI("record_detail", request)];
                    case 1:
                        record = (_a.sent()).result;
                        return [4 /*yield*/, this.app.accessToAPI("record_search", {
                                condition: [{
                                        groupName: "同レギュレーションの記録", gameSystemEnv: { gameSystemID: record.regulation.gameSystemEnvironment.gameSystemID, gameModeID: record.regulation.gameSystemEnvironment.gameModeID }, orderOfRecordArray: "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                                        targetIDs: [record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", language: request.lang
                                    }]
                            })];
                    case 2:
                        relatedRecord = (_a.sent()).result[0];
                        rank = relatedRecord.records.findIndex(function (element) { return element.id === record.id; }) + 1;
                        detailDiv.appendChild(new RecordDetailView_1.RecordDetailView(record, this.app, rank).htmlElement);
                        relatedRecordDiv.appendChild(new RecordsGroupView_1.RecordGroupView(relatedRecord, this.app).htmlElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.gameSystemSelector = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.changeHeader("Kirby-Speed/Score-Recorders", "KSSRs");
                        return [4 /*yield*/, this.app.accessToAPI("list_gameSystems", {})];
                    case 1:
                        result = (_a.sent()).result;
                        this.articleDOM.appendChild(new gameSystemCardsGroup_1.GameSystemCardGroup(result, this.app).htmlElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.gameModeSelector = function (required) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.accessToAPI("list_gameModes", { gameSystemEnv: { gameSystemID: required.id } })];
                    case 1:
                        result = (_a.sent()).result;
                        this.articleDOM.appendChild(new gameModeCardsGroup_1.GameModeCardsGroup(required, result, this.app).htmlElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.searchConditionSelector = function (requestObject) {
        return __awaiter(this, void 0, void 0, function () {
            var difficulties, abilities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (requestObject !== null)
                            this.changeDisplayedGameMode(requestObject);
                        if (requestObject === null && !StateAdminister_1.StateAdministrator.checkGameSystemEnvIsSet(this.state.gameSystemEnvDisplayed))
                            throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。");
                        return [4 /*yield*/, this.app.accessToAPI("list_difficulties", {
                                gameSystemEnv: { gameSystemID: getGameSystemID(this.state), gameModeID: getGameModeID(this.state) }
                            })];
                    case 1:
                        difficulties = (_a.sent()).result;
                        return [4 /*yield*/, this.app.accessToAPI("list_abilities", {
                                gameSystemEnv: { gameSystemID: getGameSystemID(this.state), gameModeID: getGameModeID(this.state) }
                            })];
                    case 2:
                        abilities = (_a.sent()).result;
                        this.articleDOM.appendChild(new searchConditionSelector_1.SearchConditionSelectorView(this.app, difficulties, abilities).htmlElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    TransitionAdministrator.prototype.mainMenu = function (required) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (required === null)
                    return [2 /*return*/];
                this.changeDisplayedGameMode(required);
                return [2 /*return*/];
            });
        });
    };
    TransitionAdministrator.prototype.changeDisplayedGameMode = function (required) {
        this.state.setGameSystemEnv(required);
        this.app.changeHeader(aboutLang_1.selectAppropriateName(required.gameSystem, "English"), " " + aboutLang_1.selectAppropriateName(required.gameMode, "English"));
    };
    return TransitionAdministrator;
}());
exports.TransitionAdministrator = TransitionAdministrator;
function getGameSystemID(state) {
    if (state.gameSystemEnvDisplayed.gameSystem === null || state.gameSystemEnvDisplayed.gameMode === null)
        throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。");
    return state.gameSystemEnvDisplayed.gameSystem.id;
}
function getGameModeID(state) {
    if (state.gameSystemEnvDisplayed.gameSystem === null || state.gameSystemEnvDisplayed.gameMode === null)
        throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。");
    return state.gameSystemEnvDisplayed.gameMode.id;
}
var templateObject_1, templateObject_2, templateObject_3;
