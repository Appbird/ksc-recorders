"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker = void 0;
exports.checker = {
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
