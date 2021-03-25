"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsView = void 0;
var ViewUtility_1 = require("../utility/ViewUtility");
var TagsView = /** @class */ (function () {
    function TagsView() {
        this.element = document.createElement("div");
        this.element.classList.add("c-tags");
    }
    TagsView.prototype.generateTag = function (tagName, kind) {
        var icon = "";
        switch (kind) {
            case "ability":
                icon = "far fa-star";
                break;
            case "target":
                icon = "far fa-flag";
                break;
            case "gameSystem":
                icon = "fas fa-star";
                break;
        }
        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <div class = \"c-tag --", "\">\n                <div class=\"c-iconWithDescription\">\n                <i class=\"", "\"></i> ", "\n                </div>\n            </div>"], ["\n            <div class = \"c-tag --", "\">\n                <div class=\"c-iconWithDescription\">\n                <i class=\"", "\"></i> ", "\n                </div>\n            </div>"])), kind, icon, tagName));
    };
    TagsView.prototype.getElement = function () {
        return this.element;
    };
    return TagsView;
}());
exports.TagsView = TagsView;
var templateObject_1;
