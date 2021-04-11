"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementWithoutEscaping = exports.element = exports.htmlToElement = void 0;
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
    return template.firstChild;
}
exports.htmlToElement = htmlToElement;
function element(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var htmlString = strings.reduce(function (result, str, i) {
        if (i === 0) {
        }
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
