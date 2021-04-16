"use strict";
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
var TransitionAdminister_1 = require("./administers/TransitionAdminister");
var StateAdminister_1 = require("./administers/StateAdminister");
var APICaller_1 = require("./administers/APICaller");
var HistoryAdministrator_1 = require("./administers/HistoryAdministrator");
var HeaderController_1 = require("./administers/HeaderController");
var App = /** @class */ (function () {
    function App(articleDOM, language) {
        this.header = new HeaderController_1.HeaderController();
        this.apiCaller = new APICaller_1.APIAdministrator();
        this._state = new StateAdminister_1.StateAdministrator(language);
        this.historyAd = new HistoryAdministrator_1.HistoryAdministrator(this);
        this.transitionAd = new TransitionAdminister_1.TransitionAdministrator(articleDOM, this, this._state);
    }
    App.prototype.transition = function (nextState, requestObject, ifAppendHistory) {
        if (ifAppendHistory === void 0) { ifAppendHistory = true; }
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ifAppendHistory)
                            this.historyAd.appendHistory();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transitionAd.transition(nextState, requestObject)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.errorCatcher(error_1, "ページの遷移に失敗しました。");
                        return [3 /*break*/, 4];
                    case 4:
                        this._state.setState(nextState, requestObject);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(App.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    App.prototype.setLanguage = function (lang) {
        this._state.setLanguage(lang);
    };
    App.prototype.changeHeader = function (str, sub) {
        return this.header.changeHeaderRightLeft(str, sub);
    };
    App.prototype.accessToAPI = function (functionName, requiredObj) {
        return this.apiCaller.access(functionName, requiredObj);
    };
    App.prototype.errorCatcher = function (error, title) {
        if (title === void 0) { title = "エラーが発生しました。"; }
        if (!(error instanceof Error)) {
            console.error("\u4E88\u671F\u305B\u306C\u30A8\u30E9\u30FC\u3067\u3059\u3002 : " + error);
            return;
        }
        var errorInString = error.message;
        console.error(errorInString + "\n" + error.stack);
        this.transitionAd.transition("errorView", { title: title, message: errorInString });
    };
    return App;
}());
exports.default = App;
