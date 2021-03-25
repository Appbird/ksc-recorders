"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = exports.htmlToElement = void 0;
function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function htmlToElement(html) {
    var template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstElementChild;
}
exports.htmlToElement = htmlToElement;
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
