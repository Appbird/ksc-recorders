"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker_IReceivedDataAtServer_getlist_UseSIdMIdId = exports.checker_IReceivedDataAtServer_getlist_UseSIdId = exports.checker_IReceivedDataAtServer_getlist_UseId = void 0;
var InputCheckerUtility_1 = require("../../../utility/InputCheckerUtility");
function checker_IReceivedDataAtServer_getlist_UseId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, {
        id: "string[]?", start: "number?", limit: "number?"
    }, "record/getlist_UseId > input");
}
exports.checker_IReceivedDataAtServer_getlist_UseId = checker_IReceivedDataAtServer_getlist_UseId;
function checker_IReceivedDataAtServer_getlist_UseSIdId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, {
        gameSystemEnv: { gameSystemID: "string" }, id: "string[]?", start: "number?", limit: "number?"
    }, "record/getlist_UseSIdId > input");
}
exports.checker_IReceivedDataAtServer_getlist_UseSIdId = checker_IReceivedDataAtServer_getlist_UseSIdId;
function checker_IReceivedDataAtServer_getlist_UseSIdMIdId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, {
        gameSystemEnv: { gameSystemID: "string", gameModeID: "string" }, id: "string[]?", start: "number?", limit: "number?"
    }, "record/getlist_UseSIdMIdId > input");
}
exports.checker_IReceivedDataAtServer_getlist_UseSIdMIdId = checker_IReceivedDataAtServer_getlist_UseSIdMIdId;
