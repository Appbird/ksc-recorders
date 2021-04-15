"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsNull = exports.checkIsUndefined = void 0;
function checkIsUndefined(subject, errorMsg) {
    if (subject === undefined)
        throw new Error("found undefined! : " + errorMsg);
    return subject;
}
exports.checkIsUndefined = checkIsUndefined;
function checkIsNull(subject, errorMsg) {
    if (subject === null)
        throw new Error("found undefined! : " + errorMsg);
    return subject;
}
exports.checkIsNull = checkIsNull;
