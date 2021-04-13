"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker_IReceivedDataAtServer_pickUp_UseSIdMIdId = exports.checker_IReceivedDataAtServer_pickUp_UseSIdId = exports.checker_IReceivedDataAtServer_pickUp_UseId = void 0;
var InputCheckerUtility_1 = require("../../../utility/InputCheckerUtility");
function checker_IReceivedDataAtServer_pickUp_UseId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, { id: "string" }, "list/pickUp_useId");
}
exports.checker_IReceivedDataAtServer_pickUp_UseId = checker_IReceivedDataAtServer_pickUp_UseId;
function checker_IReceivedDataAtServer_pickUp_UseSIdId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, { id: "string", gameSystemEnv: { gameSystemID: "string" } }, "list/pickUp_useSIdId");
}
exports.checker_IReceivedDataAtServer_pickUp_UseSIdId = checker_IReceivedDataAtServer_pickUp_UseSIdId;
function checker_IReceivedDataAtServer_pickUp_UseSIdMIdId(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, { id: "string", gameSystemEnv: { gameSystemID: "string", gameModeID: "string" } }, "list/pickUp_useSIdMIdId");
}
exports.checker_IReceivedDataAtServer_pickUp_UseSIdMIdId = checker_IReceivedDataAtServer_pickUp_UseSIdMIdId;
