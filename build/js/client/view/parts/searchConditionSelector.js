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
exports.SearchConditionSelectorView = void 0;
var ViewUtility_1 = require("../../../utility/ViewUtility");
var aboutElement_1 = require("../../utility/aboutElement");
var aboutLang_1 = require("../../../utility/aboutLang");
var StateAdminister_1 = require("../../administers/StateAdminister");
var SelectChoicesCapsuled_1 = require("./SelectChoicesCapsuled");
var SearchConditionSelectorView = /** @class */ (function () {
    function SearchConditionSelectorView(app, difficulties, abilities) {
        var _this = this;
        this.element = aboutElement_1.createElementWithIdAndClass({ id: "searchConditionSelector" });
        this.difficultyColumn = aboutElement_1.createElementWithIdAndClass({ id: "selector_difficulty", className: "u-width90per" });
        this.targetColumn = aboutElement_1.createElementWithIdAndClass({ id: "selector_target", className: "u-width90per" });
        this.abilityColumn = aboutElement_1.createElementWithIdAndClass({ id: "selector_difficulty", className: "u-width90per" });
        this.app = app;
        if (!StateAdminister_1.StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed))
            throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。");
        this.difficultySelectedID = null;
        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"articleTitle\">\n            <div class=\"c-title\">\n                <div class = \"c-title__main\"><i class=\"fas fa-star\"></i>\u8A18\u9332\u691C\u7D22</div> <div class = \"c-title__sub\">Set conditions to search records!</div>\n            </div>\n            <hr noshade class=\"u-bold\">\n        </div>"], ["\n        <div class=\"articleTitle\">\n            <div class=\"c-title\">\n                <div class = \"c-title__main\"><i class=\"fas fa-star\"></i>\u8A18\u9332\u691C\u7D22</div> <div class = \"c-title__sub\">Set conditions to search records!</div>\n            </div>\n            <hr noshade class=\"u-bold\">\n        </div>"]))));
        var context = this.element.appendChild(aboutElement_1.createElementWithIdAndClass({ className: "u-width90per" }));
        context.appendChild(this.difficultyColumn);
        context.appendChild(this.targetColumn);
        context.appendChild(this.abilityColumn);
        //#TODO ヘッダの下にp要素を加えて説明を書く。
        this.difficultyColumn.appendChild(ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u96E3\u6613\u5EA6</div> <div class = \"c-title__sub\">Difficulty</div>\n            </div>"], ["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u96E3\u6613\u5EA6</div> <div class = \"c-title__sub\">Difficulty</div>\n            </div>"]))));
        this.targetColumn.appendChild(ViewUtility_1.element(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u8A08\u6E2C\u5BFE\u8C61</div> <div class = \"c-title__sub\">Target</div>\n            </div>"], ["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u8A08\u6E2C\u5BFE\u8C61</div> <div class = \"c-title__sub\">Target</div>\n            </div>"]))));
        this.abilityColumn.appendChild(ViewUtility_1.element(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u80FD\u529B</div> <div class = \"c-title__sub\">Ability</div>\n            </div>"], ["\n            <div class=\"c-title\">\n                <div class = \"c-title__sub u-biggerChara\">\u80FD\u529B</div> <div class = \"c-title__sub\">Ability</div>\n            </div>"]))));
        this.difficultyChoices = new SelectChoicesCapsuled_1.SelectChoicesCapsuled(this.difficultyColumn.appendChild(document.createElement("select")), difficulties, { language: this.app.state.language });
        this.targetChoices = new SelectChoicesCapsuled_1.SelectChoicesCapsuled(this.targetColumn.appendChild(document.createElement("select")), [], { language: this.app.state.language, maxItemCount: 10, disable: true, needMultipleSelect: true });
        //#CTODO 思えばモードによって最大プレイ人数が変わるので、データベースにそのデータを組み込んでおく必要がある。
        var maxNubmerOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode.maxNumberOfPlayer;
        this.abilityChoices = new SelectChoicesCapsuled_1.SelectChoicesCapsuled(this.abilityColumn.appendChild(document.createElement("select")), abilities, { maxItemCount: maxNubmerOfPlayer, needDuplicatedSelect: true, needMultipleSelect: true, language: this.app.state.language, maxItemText: { JDescription: "\u3053\u306E\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9\u306F\u6700\u5927" + maxNubmerOfPlayer + "\u4EBA\u30D7\u30EC\u30A4\u307E\u3067\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002",
                EDescription: "This mode can be played with at most " + maxNubmerOfPlayer + " kirbys (friends)!" }
        });
        this.difficultyChoices.addEventListener("hideDropdown", function () {
            _this.targetChoices.enable();
            if (_this.difficultySelectedID === _this.difficultyChoices.getValue(true))
                return;
            if (_this.difficultyChoices.getValue(true) === undefined) {
                _this.targetChoices.disable();
                return;
            }
            _this.difficultySelectedID = _this.difficultyChoices.getValueAsValue(true);
            _this.setTargetChoices();
        });
        //#CTODO いいボタンのデザインを探してくる。
        this.element.appendChild(ViewUtility_1.element(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<div class=\"u-width50per u-margin2em\"><div class=\"c-button\">\u6C7A\u5B9A</div></div>"], ["<div class=\"u-width50per u-margin2em\"><div class=\"c-button\">\u6C7A\u5B9A</div></div>"]))))
            .addEventListener("click", function () { return _this.whenDecideCondition(); });
    }
    SearchConditionSelectorView.prototype.whenDecideCondition = function () {
        var abilitySelected = this.abilityChoices.getValueAsArray(true);
        var targetSelected = this.targetChoices.getValueAsArray(true);
        if (!StateAdminister_1.StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed))
            throw new Error("閲覧する記録のゲームタイトルとゲームモードが設定されていません。");
        var gameSystemID = this.app.state.gameSystemEnvDisplayed.gameSystem.id;
        var gameModeID = this.app.state.gameSystemEnvDisplayed.gameMode.id;
        this.app.transition("searchResultView", {
            condition: this.generateCondition(targetSelected, abilitySelected, gameSystemID, gameModeID)
        }, { title: "検索画面" });
    };
    SearchConditionSelectorView.prototype.generateCondition = function (targetSelected, abilitySelected, gameSystemID, gameModeID) {
        var _this = this;
        if (targetSelected.length === 0) {
            return [{
                    groupName: "", groupSubName: "",
                    gameSystemEnv: {
                        gameSystemID: gameSystemID, gameModeID: gameModeID,
                        gameDifficultyID: (this.difficultySelectedID === null) ? "whole" : this.difficultySelectedID
                    },
                    language: this.app.state.language, startOfRecordArray: 0, limitOfRecordArray: 3,
                    orderOfRecordArray: this.app.state.superiorScore, abilityIDs: abilitySelected
                }];
        }
        return targetSelected.map(function (id, index) {
            var result = _this.targetChoices.data.find(function (target) { return target.id === id; });
            return {
                groupName: (result === undefined) ? "" : aboutLang_1.selectAppropriateName(result, _this.app.state.language),
                groupSubName: index + 1 + "\u6226\u76EE",
                gameSystemEnv: { gameSystemID: gameSystemID, gameModeID: gameModeID },
                language: _this.app.state.language, startOfRecordArray: 0, limitOfRecordArray: 3, orderOfRecordArray: _this.app.state.superiorScore,
                abilityIDs: abilitySelected, targetIDs: [id]
            };
        });
    };
    SearchConditionSelectorView.prototype.setTargetChoices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedTargetItem, asg, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.targetChoices.clearChoices();
                        this.targetChoices.clearStore();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        selectedTargetItem = this.difficultyChoices.data.find(function (ele) { return ele.id === _this.difficultySelectedID; });
                        if (selectedTargetItem === undefined)
                            throw new Error("# \u30A8\u30E9\u30FC\u306E\u5185\u5BB9\n\nID" + selectedTargetItem + "\u306B\u5BFE\u5FDC\u3057\u305F\u96E3\u6613\u5EA6\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        asg = this.app.state.gameSystemEnvDisplayed;
                        if (asg.gameSystem === null || asg.gameMode === null)
                            throw new Error();
                        return [4 /*yield*/, this.app.accessToAPI("list_targets", {
                                gameSystemEnv: { gameSystemID: asg.gameSystem.id, gameModeID: asg.gameMode.id }, id: selectedTargetItem.TargetIDsIncludedInTheDifficulty
                            })];
                    case 2:
                        result = _a.sent();
                        this.targetChoices.setChoices(result.result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        if (!(error_1 instanceof Error))
                            return [2 /*return*/, []];
                        this.app.transition("errorView", { title: "難易度に対応する計測対象の取得に失敗しました。", message: "" + error_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(SearchConditionSelectorView.prototype, "htmlElement", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    return SearchConditionSelectorView;
}());
exports.SearchConditionSelectorView = SearchConditionSelectorView;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
