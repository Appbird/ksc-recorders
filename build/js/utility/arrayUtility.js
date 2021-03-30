"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEqualityBetweenArrays = exports.checkEqualityBetweenArraysWithConsoleMsg = void 0;
function checkEqualityBetweenArraysWithConsoleMsg(subject, elementsSupposedToHave, needConsoleMsg) {
    if (needConsoleMsg === void 0) { needConsoleMsg = false; }
    if (needConsoleMsg)
        console.log("\u001B[32m\u3010\u6BD4\u8F03\u5BFE\u8C61\u3011actual:[" + subject + "] vs expected:[" + elementsSupposedToHave + "] \u001B[0m");
    if (subject.length !== elementsSupposedToHave.length)
        return false;
    return subject.every(function (element, index) { return element === elementsSupposedToHave[index]; });
}
exports.checkEqualityBetweenArraysWithConsoleMsg = checkEqualityBetweenArraysWithConsoleMsg;
function checkEqualityBetweenArrays(subject, elementsSupposedToHave) {
    if (subject.length !== elementsSupposedToHave.length)
        return false;
    return subject.every(function (element, index) { return element === elementsSupposedToHave[index]; });
}
exports.checkEqualityBetweenArrays = checkEqualityBetweenArrays;
