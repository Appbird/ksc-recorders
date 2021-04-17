"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateInfoView = void 0;
var ViewUtility_1 = require("../../../utility/ViewUtility");
var aboutElement_1 = require("../../utility/aboutElement");
var StateInfoView = /** @class */ (function () {
    function StateInfoView() {
        this.element = aboutElement_1.createElementWithIdAndClass({ className: "c-stateInfo" });
    }
    StateInfoView.prototype.appendInfo = function (value, icon) {
        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        <div class = \"c-stateInfo__unit\">\n            <div class =\"c-iconWithDescription\"> <i class=\"fas fa-", "\"></i> ", "</div>\n        </div>"], ["\n        <div class = \"c-stateInfo__unit\">\n            <div class =\"c-iconWithDescription\"> <i class=\"fas fa-", "\"></i> ", "</div>\n        </div>"])), icon, value));
        return this;
    };
    Object.defineProperty(StateInfoView.prototype, "htmlElement", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    return StateInfoView;
}());
exports.StateInfoView = StateInfoView;
var templateObject_1;
