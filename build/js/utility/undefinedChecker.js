"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUndefined = void 0;
function checkIsUndefined(subject, errorMsg) {
    if (subject === undefined)
        throw new Error("found undefined! : " + errorMsg);
    return subject;
}
exports.checkIsUndefined = checkIsUndefined;
