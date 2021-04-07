"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIReceivedDataAtServer_recordDetail = void 0;
var InputCheckerUtility_1 = require("../../../utility/InputCheckerUtility");
function isIReceivedDataAtServer_recordDetail(obj) {
    return InputCheckerUtility_1.checkInputObjectWithErrorPossibility(obj, checker, "record/detail > data");
}
exports.isIReceivedDataAtServer_recordDetail = isIReceivedDataAtServer_recordDetail;
var checker = {
    gameSystemEnv: {
        gameSystemID: "string",
        gameModeID: "string"
    },
    id: "string"
};
