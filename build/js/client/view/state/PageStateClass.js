"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageStateBaseClass = void 0;
var ViewUtility_1 = require("../../../utility/ViewUtility");
var aboutElement_1 = require("../../utility/aboutElement");
var PageStateBaseClass = /** @class */ (function () {
    function PageStateBaseClass(app, articleDOM, requiredObj) {
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
        this.loadingDisplayElement = this.articleDOM.appendChild(aboutElement_1.createElementWithIdAndClass({ className: "" }));
    }
    /** ローディングスピナーをページ中に表示します。 */
    PageStateBaseClass.prototype.generateLoadingSpinner = function (spinnerKindClassName, message) {
        if (spinnerKindClassName === void 0) { spinnerKindClassName = "u-background--star"; }
        this.loadingDisplayElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class=\"u-width50per u-marginUpDown5em\">\n            <div class=\"c-loadingSpinner \">\n                <div class=\"__spinner --delay0 u-background--", "\"></div>\n                <div class=\"__spinner --delay1 u-background--", "\"></div>\n                <div class=\"__spinner --delay2 u-background--", "\"></div>\n            </div>\n        </div>\n        "], ["\n        <div class=\"u-width50per u-marginUpDown5em\">\n            <div class=\"c-loadingSpinner \">\n                <div class=\"__spinner --delay0 u-background--", "\"></div>\n                <div class=\"__spinner --delay1 u-background--", "\"></div>\n                <div class=\"__spinner --delay2 u-background--", "\"></div>\n            </div>\n        </div>\n        "])), spinnerKindClassName, spinnerKindClassName, spinnerKindClassName));
        if (message === undefined)
            return;
        this.loadingDisplayElement.appendChild(ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <div class=\"c-balloon\">\n            <p>", "</p>\n        </div>\n        "], ["\n        <div class=\"c-balloon\">\n            <p>", "</p>\n        </div>\n        "])), message));
    };
    PageStateBaseClass.prototype.deleteLoadingSpinner = function () {
        this.loadingDisplayElement.innerHTML = "";
    };
    Object.defineProperty(PageStateBaseClass.prototype, "requiredObject", {
        get: function () {
            return this.requiredObj;
        },
        enumerable: false,
        configurable: true
    });
    return PageStateBaseClass;
}());
exports.PageStateBaseClass = PageStateBaseClass;
var templateObject_1, templateObject_2;
