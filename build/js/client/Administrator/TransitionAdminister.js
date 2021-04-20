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
var PageStates_1 = require("../view/state/PageStates");
var ViewUtility_1 = require("../../utility/ViewUtility");
var TransitionAdministrator = /** @class */ (function () {
    function TransitionAdministrator(articleDOM, app, state) {
        this.state = state;
        this.app = app;
        this.articleDOM = articleDOM;
    }
    TransitionAdministrator.prototype.clearView = function () {
        this.articleDOM.innerHTML = "";
    };
    TransitionAdministrator.prototype.transition = function (nextState, requestObject, _a) {
        var _b = (_a === void 0 ? {} : _a).title, title = _b === void 0 ? "" : _b;
        return __awaiter(this, void 0, void 0, function () {
            var pageState;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.clearView();
                        if (title !== "")
                            this.articleDOM.appendChild(ViewUtility_1.elementWithoutEscaping(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"c-title\">\n            <div class=\"c-title__main\">", "</div>\n        </div>"], ["\n        <div class=\"c-title\">\n            <div class=\"c-title__main\">", "</div>\n        </div>"])), title));
                        if (PageStates_1.pageStates[nextState] === undefined)
                            throw new Error("\u6307\u5B9A\u3055\u308C\u305F\u30AD\u30FC" + nextState + "\u306B\u5BFE\u5FDC\u3059\u308B\u30DA\u30FC\u30B8\u72B6\u614B\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        pageState = new PageStates_1.pageStates[nextState](this.app, this.articleDOM, requestObject);
                        return [4 /*yield*/, pageState.init()];
                    case 1:
                        _c.sent();
                        this.state.setState(nextState, pageState.requiredObject);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TransitionAdministrator;
}());
exports.TransitionAdministrator = TransitionAdministrator;
var templateObject_1;
