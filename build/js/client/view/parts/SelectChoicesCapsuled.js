"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectChoicesCapsuled = void 0;
var choices_js_1 = __importDefault(require("choices.js"));
var aboutLang_1 = require("../../../utility/aboutLang");
var SelectChoicesCapsuled = /** @class */ (function () {
    function SelectChoicesCapsuled(insertedElement, data, _a) {
        var _b = _a.needMultipleSelect, needMultipleSelect = _b === void 0 ? false : _b, _c = _a.maxItemCount, maxItemCount = _c === void 0 ? 1 : _c, _d = _a.needDuplicatedSelect, needDuplicatedSelect = _d === void 0 ? false : _d, language = _a.language, _e = _a.removeItemButton, removeItemButton = _e === void 0 ? true : _e, _f = _a.disable, disable = _f === void 0 ? false : _f, maxItemText = _a.maxItemText, _g = _a.placeholderValue, placeholderValue = _g === void 0 ? undefined : _g, _h = _a.noChoiceText, noChoiceText = _h === void 0 ? { JDescription: "選べるものがありません", EDescription: "There are no item to select." } : _h, _j = _a.noResultText, noResultText = _j === void 0 ? { JDescription: "検索に合致するものがありませんでした。", EDescription: "No item were found." } : _j;
        insertedElement.multiple = needMultipleSelect;
        insertedElement.disabled = disable;
        var result = new choices_js_1.default(insertedElement, {
            choices: data.map(function (ele) { return { value: ele.id, label: aboutLang_1.selectAppropriateName(ele, language) }; }),
            placeholderValue: placeholderValue,
            maxItemCount: maxItemCount,
            maxItemText: aboutLang_1.choiceDescription(maxItemText, language),
            removeItemButton: removeItemButton,
            shouldSort: true,
            noChoicesText: aboutLang_1.choiceDescription(noChoiceText, language),
            noResultsText: aboutLang_1.choiceDescription(noResultText, language)
        });
        this._language = language;
        this._data = data;
        this._choices = result;
        this._insertedElement = insertedElement;
        if (!needDuplicatedSelect)
            return;
        this._insertedElement.addEventListener("addItem", function (event) {
            result.setChoices([{ label: event.detail.label, value: event.detail.value }]);
        });
        this._insertedElement.addEventListener("removeItem", function () {
            result.clearStore();
            result.setChoices(data.map(function (ele) { return { value: ele.id, label: aboutLang_1.selectAppropriateName(ele, language) }; }));
        });
    }
    SelectChoicesCapsuled.prototype.addEventListener = function (eventType, callback) {
        this._insertedElement.addEventListener(eventType, callback);
    };
    SelectChoicesCapsuled.prototype.getValue = function (valueOnly) {
        if (valueOnly === void 0) { valueOnly = true; }
        return this._choices.getValue(valueOnly);
    };
    SelectChoicesCapsuled.prototype.getValueAsValue = function (valueOnly) {
        if (valueOnly === void 0) { valueOnly = true; }
        var choiced = this._choices.getValue(valueOnly);
        if (Array.isArray(choiced))
            return choiced[0];
        return choiced;
    };
    SelectChoicesCapsuled.prototype.getValueAsArray = function (valueOnly) {
        if (valueOnly === void 0) { valueOnly = true; }
        var choiced = this._choices.getValue(valueOnly);
        if (Array.isArray(choiced))
            return choiced;
        return [choiced];
    };
    SelectChoicesCapsuled.prototype.setChoices = function (item) {
        var _this = this;
        this._choices.setChoices(item.map(function (ele) {
            return { value: ele.id, label: aboutLang_1.selectAppropriateName(ele, _this._language) };
        }));
        this._data = item;
    };
    SelectChoicesCapsuled.prototype.clearChoices = function () {
        this._choices.clearChoices();
    };
    SelectChoicesCapsuled.prototype.clearStore = function () {
        this._choices.clearStore();
    };
    SelectChoicesCapsuled.prototype.disable = function () {
        this._choices.disable();
    };
    SelectChoicesCapsuled.prototype.enable = function () {
        this._choices.enable();
    };
    Object.defineProperty(SelectChoicesCapsuled.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectChoicesCapsuled.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectChoicesCapsuled.prototype, "choices", {
        get: function () {
            return this._choices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectChoicesCapsuled.prototype, "insertedElement", {
        get: function () {
            return this._insertedElement;
        },
        enumerable: false,
        configurable: true
    });
    return SelectChoicesCapsuled;
}());
exports.SelectChoicesCapsuled = SelectChoicesCapsuled;
