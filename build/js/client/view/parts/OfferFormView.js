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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferFormView = void 0;
var aboutLang_1 = require("../../../utility/aboutLang");
var timeUtility_1 = require("../../../utility/timeUtility");
var ViewUtility_1 = require("../../../utility/ViewUtility");
var aboutElement_1 = require("../../utility/aboutElement");
var MovieWidgetCreator_1 = require("./MovieWidgetCreator");
var SelectChoicesCapsuled_1 = require("./SelectChoicesCapsuled");
var TextInputCapsuled_1 = require("./TextInputCapsuled");
var simplemde_1 = __importDefault(require("simplemde"));
var TextChoicesCapsuled_1 = require("./TextChoicesCapsuled");
var OfferFormView = /** @class */ (function () {
    function OfferFormView(app, difficulties, abilities, runnerID) {
        var _this = this;
        this.element = aboutElement_1.createElementWithIdAndClass({ className: "offerForm u-width95per u-marginUpDown2emToChildren" });
        this.isTextInputRight = false;
        this.app = app;
        this.htmlConverter = new ViewUtility_1.HTMLConverter(this.app.state.language);
        this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<h1>", "", "</h1>"], ["<h1>", "", "</h1>"])), aboutElement_1.generateIcooonHTML({ icooonName: "link" }), { Japanese: "リンク" }));
        this.evidenceMovieElement = this.element.appendChild(aboutElement_1.createElementWithIdAndClass({ className: "c-evidenceMovie" }));
        this.evidenceMovie = new MovieWidgetCreator_1.MovieWidgetCreator();
        var textInputs = this.createTextInput();
        this.URLInput = textInputs.link;
        this.scoreInput = textInputs.score;
        this.difficultyChoices = this.createDifficultyChoices(difficulties);
        this.targetChoices = this.createTargetChoices([]);
        this.abilityChoices = this.createAbilityChoices(abilities);
        this.tagInput = this.createTagInputChoices();
        this.runnerID = runnerID;
        //#TODO 追加されるタグの色を対応させる。
        this.setTargetDropdownEventListener();
        this.setURLInputChangeEventListener();
        this.setScoreInputChangeEventListener();
        this.simpleMDE = new simplemde_1.default({
            element: this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                                <div class=\"offerForm__noteInput\">\n                                    <h1>", "", "</h1>\n                                    <ul class=\"u-margin05em\">\n                                        <li>", "</li>\n                                        <li>", "</li>\n                                        <li>", "</li>\n                                    </ul>\n                                </div>\n                                "], ["\n                                <div class=\"offerForm__noteInput\">\n                                    <h1>", "", "</h1>\n                                    <ul class=\"u-margin05em\">\n                                        <li>", "</li>\n                                        <li>", "</li>\n                                        <li>", "</li>\n                                    </ul>\n                                </div>\n                                "])), aboutElement_1.generateIcooonHTML({ icooonName: "notebook" }), { Japanese: "走者ノート" }, { Japanese: "[任意] 記録を出すうえで必要となる事項を書きます。" }, { Japanese: "markdownでの記述が出来ます。" }, { Japanese: "10秒に一度オートセーブを行います。" })).appendChild(aboutElement_1.createElementWithIdTagClass({ className: "offerForm__runnerNote" }, "textarea")),
            autosave: {
                enabled: true, uniqueId: "offerForm__runnerNote"
            },
            spellChecker: false
        });
        this.errorDisplay = this.element.appendChild(ViewUtility_1.element(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div class=\"u-width90per u-margin2em u-redChara\"></div>"], ["<div class=\"u-width90per u-margin2em u-redChara\"></div>"])))).appendChild(document.createElement("h3"));
        this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div class=\"u-width50per u-margin2em\"><div class=\"c-button\">\u6C7A\u5B9A</div></div>"], ["<div class=\"u-width50per u-margin2em\"><div class=\"c-button\">\u6C7A\u5B9A</div></div>"]))))
            .addEventListener("click", function () { return _this.whenDecide(); });
        this.element.appendChild(aboutElement_1.createElementWithIdAndClass({ className: "u-space3em" }));
    }
    OfferFormView.prototype.whenDecide = function () {
        var _this = this;
        var abilityIDs = this.abilityChoices.getValueAsArray();
        var targetID = this.targetChoices.getValueAsValue();
        var difficultyID = this.difficultyChoices.getValueAsValue();
        if (this.isTextInputRight || difficultyID === undefined || targetID === undefined || abilityIDs.length === 0) {
            this.errorDisplay.textContent = "[Error] 入力されていない必須項目が存在します。";
            return;
        }
        this.app.transition("sendRecordOffer", {
            score: (function () {
                var score = _this.scoreInput.value;
                switch (_this.app.state.scoreType) {
                    case "score": return timeUtility_1.convertScoreIntoNumber(score);
                    case "time": return timeUtility_1.convertTimeIntoNumber(score);
                }
            })(),
            runnerID: this.runnerID,
            tagName: this.tagInput.valueAsArray,
            languageOfTagName: this.app.state.language,
            link: [this.URLInput.value],
            note: this.simpleMDE.value(),
            regulation: {
                abilityIDs: abilityIDs,
                targetID: targetID,
                gameSystemEnvironment: {
                    gameSystemID: this.app.state.gameSystemIDDisplayed, gameModeID: this.app.state.gameModeIDDisplayed,
                    gameDifficultyID: difficultyID,
                }
            }
        });
    };
    OfferFormView.prototype.modifyScoreInput = function () {
        var score = this.scoreInput.value;
        switch (this.app.state.scoreType) {
            case "score": return this.scoreInput.value = String(timeUtility_1.convertScoreIntoNumber(score));
            case "time": return this.scoreInput.value = timeUtility_1.converseMiliSecondsIntoTime(timeUtility_1.convertTimeIntoNumber(score));
        }
    };
    OfferFormView.prototype.setScoreInputChangeEventListener = function () {
        var _this = this;
        this.scoreInput.addEventListener("change", function () {
            try {
                _this.modifyScoreInput();
            }
            catch (error) {
                var errorBaseMsg = aboutLang_1.choiceDescription({ JDescription: "入力されたタイム/記録が不正です。", EDescription: "invalid time/score string." }, _this.app.state.language);
                if (!(error instanceof Error)) {
                    _this.scoreInput.setError(errorBaseMsg);
                    return;
                }
                _this.scoreInput.setError(errorBaseMsg);
            }
        });
    };
    OfferFormView.prototype.setURLInputChangeEventListener = function () {
        var _this = this;
        this.URLInput.addEventListener("change", function () {
            try {
                _this.evidenceMovie.set(_this.URLInput.value);
                _this.evidenceMovieElement.innerHTML = "";
                _this.evidenceMovie.setWidget(_this.evidenceMovieElement);
                _this.URLInput.setError("");
            }
            catch (error) {
                var errorBaseMsg = aboutLang_1.choiceDescription({ JDescription: "入力されたURLが不正です。", EDescription: "invalid link." }, _this.app.state.language);
                if (!(error instanceof Error)) {
                    _this.URLInput.setError("\u5165\u529B\u3055\u308C\u305FURL\u304C\u4E0D\u6B63\u3067\u3059\u3002");
                    return;
                }
                _this.URLInput.setError(errorBaseMsg);
            }
        });
    };
    OfferFormView.prototype.setTargetDropdownEventListener = function () {
        var _this = this;
        this.difficultyChoices.addEventListener("change", function () {
            _this.targetChoices.enable();
            if (_this.difficultyChoices.getValue(true) === undefined) {
                _this.targetChoices.disable();
                return;
            }
            _this.setTargetChoices();
        });
    };
    OfferFormView.prototype.setTargetChoices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedTargetItem, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.targetChoices.clearChoices();
                        this.targetChoices.clearStore();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        selectedTargetItem = this.difficultyChoices.data.find(function (ele) { return ele.id === _this.difficultyChoices.getValueAsValue(true); });
                        if (selectedTargetItem === undefined)
                            throw new Error("# \u30A8\u30E9\u30FC\u306E\u5185\u5BB9\n\nID " + this.difficultyChoices.getValueAsValue(true) + " \u306B\u5BFE\u5FDC\u3057\u305F\u96E3\u6613\u5EA6\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [4 /*yield*/, this.app.accessToAPI("list_targets", {
                                gameSystemEnv: { gameSystemID: this.app.state.gameSystemIDDisplayed, gameModeID: this.app.state.gameModeIDDisplayed }, id: selectedTargetItem.TargetIDsIncludedInTheDifficulty
                            })];
                    case 2:
                        result = _a.sent();
                        this.targetChoices.setChoices(result.result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        if (!(error_1 instanceof Error))
                            return [2 /*return*/];
                        this.app.transition("errorView", { title: "難易度に対応する計測対象の取得に失敗しました。", message: "" + error_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //#CH ここあたりのコードを分離したいけどするべきか迷う
    OfferFormView.prototype.createTextInput = function () {
        var _this = this;
        var offerForm__textInputElement = this.element.appendChild(
        //#TODO 英語訳の追加
        aboutElement_1.createElementWithIdAndClass({ className: "offerForm__textInput" })).appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            <div class=\"offerForm__textInput\">\n                <div class=\"c-title offerForm__textInput__link\">\n                </div>\n                <ul class=\"u-margin05em offerForm__textInput__linkDescription\">\n                    <li>", "</li>\n                    <li>", "</li>\n                    <li>", "</li>\n                </ul>\n            <h1>", "", "</h1>\n                <div class=\"c-title offerForm__textInput__score\">\n                </div>\n                <ul class=\"u-margin05em offerForm__textInput__scoreDescription\">\n                    <li>", "</li>\n                    <li><strong>", "</strong></li>\n                    <li>", "</li>\n                </ul>\n            </div>"], ["\n            <div class=\"offerForm__textInput\">\n                <div class=\"c-title offerForm__textInput__link\">\n                </div>\n                <ul class=\"u-margin05em offerForm__textInput__linkDescription\">\n                    <li>", "</li>\n                    <li>", "</li>\n                    <li>", "</li>\n                </ul>\n            <h1>", "", "</h1>\n                <div class=\"c-title offerForm__textInput__score\">\n                </div>\n                <ul class=\"u-margin05em offerForm__textInput__scoreDescription\">\n                    <li>", "</li>\n                    <li><strong>", "</strong></li>\n                    <li>", "</li>\n                </ul>\n            </div>"])), { Japanese: "<strong class='u-redChara'>[必須]</strong> 登録する記録の証拠となる動画へのリンクを貼ります。", English: "English Description" }, { Japanese: "TwitterかYoutubeのいずれかのリンクのみを受け付けます。", English: "English Description" }, { Japanese: "Youtubeへのリンクの場合、動画の開始秒数を指定することが出来ます。" }, aboutElement_1.generateIcooonHTML({ icooonName: "time" }), { Japanese: "記録" }, { Japanese: "<strong class='u-redChara'>[必須]</strong> 計測区間で得たスコア,あるいはかかった時間を記述します。" }, { Japanese: "01:00:00 / 02:12.32-03:12.32 / 60.00といった形式でも入力が出来ます。" }, { Japanese: "この場合、全て01:00.00に統一されます。" }));
        var element_textInput_link = aboutElement_1.findElementByClassNameWithErrorPossibility(offerForm__textInputElement, "offerForm__textInput__link");
        var element_textInput_score = aboutElement_1.findElementByClassNameWithErrorPossibility(offerForm__textInputElement, "offerForm__textInput__score");
        var element_linkDescription = aboutElement_1.findElementByClassNameWithErrorPossibility(offerForm__textInputElement, "offerForm__textInput__linkDescription");
        var element_scoreDescription = aboutElement_1.findElementByClassNameWithErrorPossibility(offerForm__textInputElement, "offerForm__textInput__scoreDescription");
        var link_errorInput = element_linkDescription.appendChild(aboutElement_1.createElementWithIdTagClass({ className: "u-redChara u-bolderChara" }, "li"));
        var score_errorInput = element_scoreDescription.appendChild(aboutElement_1.createElementWithIdTagClass({ className: "u-redChara u-bolderChara" }, "li"));
        return {
            link: new TextInputCapsuled_1.TextInputCapsuled(element_textInput_link, "link to the movie", link_errorInput, "u-smallerChara"),
            score: new TextInputCapsuled_1.TextInputCapsuled(element_textInput_score, (function () {
                switch (_this.app.state.scoreType) {
                    case "score": return "0";
                    case "time": return "00:00.00";
                }
            })(), score_errorInput, "u-biggerChara")
        };
    };
    OfferFormView.prototype.createDifficultyChoices = function (difficulties) {
        var difficultySelector = this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        <div class=\"offerForm__difficultySelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__difficultySelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                <li>", "</li>\n            </ul>\n        </div>"], ["\n        <div class=\"offerForm__difficultySelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__difficultySelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                <li>", "</li>\n            </ul>\n        </div>"])), aboutElement_1.generateIcooonHTML({ icooonName: "difficulty" }), { Japanese: "難易度" }, { Japanese: "<strong class='u-redChara'>[必須]</strong> 取得した記録がどの難易度で取られたかを入力します。" }));
        return new SelectChoicesCapsuled_1.SelectChoicesCapsuled(aboutElement_1.findElementByClassNameWithErrorPossibility(difficultySelector, "offerForm__difficultySelector__Choices").appendChild(document.createElement("select")), difficulties, { language: this.app.state.language, needMultipleSelect: false });
    };
    OfferFormView.prototype.createTargetChoices = function (targets) {
        var targetSelector = this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        <div class=\"offerForm__targetSelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__targetSelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                <li>", "</li>\n            </ul>\n        </div>"], ["\n        <div class=\"offerForm__targetSelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__targetSelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                <li>", "</li>\n            </ul>\n        </div>"])), aboutElement_1.generateIcooonHTML({ icooonName: "flag" }), { Japanese: "計測対象" }, { Japanese: "<strong class='u-redChara'>[必須]</strong> どの敵を倒したか / どのステージをクリアしたかを入力します。" }));
        return new SelectChoicesCapsuled_1.SelectChoicesCapsuled(aboutElement_1.findElementByClassNameWithErrorPossibility(targetSelector, "offerForm__targetSelector__Choices").appendChild(document.createElement("select")), targets, { language: this.app.state.language, needMultipleSelect: false });
    };
    OfferFormView.prototype.createAbilityChoices = function (abilities) {
        var _a, _b;
        var maxNumberOfPlayer = (_a = this.app.state.gameSystemEnvDisplayed.gameMode) === null || _a === void 0 ? void 0 : _a.maxNumberOfPlayer;
        var abilitySelector = this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n        <div class=\"offerForm__abilitySelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__abilitySelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                    <li>", "</li>\n                    <li>", "</li>\n                    <li>", "</li>\n            </ul>\n        </div>"], ["\n        <div class=\"offerForm__abilitySelector\">\n            <h1>", "", "</h1>\n            <div class=\"offerForm__abilitySelector__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                    <li>", "</li>\n                    <li>", "</li>\n                    <li>", "</li>\n            </ul>\n        </div>"])), aboutElement_1.generateIcooonHTML({ icooonName: "star" }), { Japanese: "自機の能力" }, { Japanese: "<strong class='u-redChara'>[必須]</strong> この記録を取った時のカービィのコピー能力を選びます。" }, { Japanese: "<strong>順序が考慮される</strong>ので注意してください。" }, { Japanese: "\u3053\u306E\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9\u306F" + maxNumberOfPlayer + "\u4EBA\u30D7\u30EC\u30A4\u307E\u3067\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002" }));
        return new SelectChoicesCapsuled_1.SelectChoicesCapsuled(aboutElement_1.findElementByClassNameWithErrorPossibility(abilitySelector, "offerForm__abilitySelector__Choices").appendChild(document.createElement("select")), abilities, { language: this.app.state.language, maxItemCount: (_b = this.app.state.gameSystemEnvDisplayed.gameMode) === null || _b === void 0 ? void 0 : _b.maxNumberOfPlayer, needMultipleSelect: true, needDuplicatedSelect: true, maxItemText: { JDescription: "\u3053\u306E\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9\u306F\u6700\u5927" + maxNumberOfPlayer + "\u4EBA\u30D7\u30EC\u30A4\u307E\u3067\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002",
                EDescription: "This mode can be played with at most " + maxNumberOfPlayer + " kirbys (friends)!" }
        });
    };
    OfferFormView.prototype.createTagInputChoices = function () {
        var tagSegment = this.element.appendChild(this.htmlConverter.elementWithoutEscaping(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        <div class=\"offerForm__tagInput\">\n        <h1>", "", "</h1>\n            <div class=\"offerForm__tagInput__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                    <li>", "</li>\n                    <li>", "</li>\n            </ul>\n        </div>"], ["\n        <div class=\"offerForm__tagInput\">\n        <h1>", "", "</h1>\n            <div class=\"offerForm__tagInput__Choices\">\n            </div>\n            <ul class=\"u-margin05em\">\n                    <li>", "</li>\n                    <li>", "</li>\n            </ul>\n        </div>"])), aboutElement_1.generateIcooonHTML({ icooonName: "tag" }), { Japanese: "タグ" }, { Japanese: "[任意] 使ったTAにおけるテクニックの名前などをタグとして登録します。" }, { Japanese: "検索がより容易になります。" }));
        return new TextChoicesCapsuled_1.TextChoicesCapsuled(aboutElement_1.findElementByClassNameWithErrorPossibility(tagSegment, "offerForm__tagInput__Choices").appendChild(document.createElement("input")));
    };
    Object.defineProperty(OfferFormView.prototype, "htmlElement", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    return OfferFormView;
}());
exports.OfferFormView = OfferFormView;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
