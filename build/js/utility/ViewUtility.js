"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementWithoutEscaping = exports.element = exports.HTMLConverter = exports.htmlToElement = void 0;
function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function htmlToElement(html) {
    var template = document.createElement("div");
    template.innerHTML = html;
    return template.firstElementChild;
}
exports.htmlToElement = htmlToElement;
var HTMLConverter = /** @class */ (function () {
    function HTMLConverter(lang) {
        this.language = lang;
    }
    HTMLConverter.prototype.element = function (strings) {
        var _this = this;
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var htmlString = strings.reduce(function (result, str, i) {
            var value = values[i - 1];
            if (value === null)
                return result + "null" + str;
            if (value === undefined)
                return result + "undefined" + str;
            if (typeof value == "string") {
                return result + escapeSpecialChars(value) + str;
            }
            else if (typeof value === "object") {
                return result + ((value[_this.language] === undefined) ? "undefined" : value[_this.language]) + str;
            }
            else {
                return result + String(value) + str;
            }
        });
        var ele = htmlToElement(htmlString);
        if (ele === null)
            throw new Error("与HTMLを要素に変換できませんでした。");
        return ele;
    };
    return HTMLConverter;
}());
exports.HTMLConverter = HTMLConverter;
function element(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var htmlString = strings.reduce(function (result, str, i) {
        var value = values[i - 1];
        if (typeof value == "string") {
            return result + escapeSpecialChars(value) + str;
        }
        else {
            return result + String(value) + str;
        }
    });
    var ele = htmlToElement(htmlString);
    if (ele === null)
        throw new Error("与HTMLを要素に変換できませんでした。");
    return ele;
}
exports.element = element;
function elementWithoutEscaping(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var htmlString = strings.reduce(function (result, str, i) {
        var value = values[i - 1];
        if (typeof value == "string") {
            return result + value + str;
        }
        else {
            return result + String(value) + str;
        }
    });
    var ele = htmlToElement(htmlString);
    if (ele === null)
        throw new Error("与HTMLを要素に変換できませんでした。");
    return ele;
}
exports.elementWithoutEscaping = elementWithoutEscaping;
