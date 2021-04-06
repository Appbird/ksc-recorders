"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIReceivedDataAtServer_recordSearch = void 0;
var InputCheckerUtility_1 = require("../../../utility/InputCheckerUtility");
function isIReceivedDataAtServer_recordSearch(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, checker, "record/search > data");
}
exports.isIReceivedDataAtServer_recordSearch = isIReceivedDataAtServer_recordSearch;
var checker = {
    groupName: "string",
    gameSystemEnv: {
        gameSystemID: "string",
        gameModeID: "string"
    },
    orderOfRecordArray: "\"HigherFirst\" | \"LowerFirst\" | \"LaterFirst\" | \"EarlierFirst\"",
    startOfRecordArray: "number",
    limitOfRecordArray: "number",
    targetIDs: "string[]",
    abilityIDs: "string[]",
    abilityIDsCondition: "\"AND\" | \"OR\" | \"AllowForOrder\"",
    runnerIDs: "string[]",
    language: "\"Japanese\" | \"English\""
};
