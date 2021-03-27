"use strict";
//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.controllerOfTableForResolvingID = void 0;
var exampledata_1 = require("../test/exampledata");
var RecordDataBase_1 = require("../DataBase/RecordDataBase");
var ControllerOfTableForResolvingID_1 = require("../DataBase/ControllerOfTableForResolvingID");
var convertRecordsIntoRecordGroup_1 = require("../RecordConverter/convertRecordsIntoRecordGroup");
var InputCheckerUtility_1 = require("../../utility/InputCheckerUtility");
var database = new RecordDataBase_1.RecordDataBase(exampledata_1.exampleData);
var checkerObj = {
    groupName: "string",
    gameSystemEnv: {
        gameSystemID: "number",
        gameModeID: "number",
        gameDifficultyID: "number",
    },
    orderOfRecordArray: "\"HigherFirst\" | \"LowerFirst\" | \"LaterFirst\" | \"EarlierFirst\"",
    startOfRecordArray: "number",
    limitOfRecordArray: "number",
    targetIDs: "number[]",
    abilityIDs: "number[]",
    abilityIDsCondition: "\"AND\" | \"OR\" | \"AllowForOrder\"",
    runnerIDs: "number[]",
    language: "\"Japanese\" | \"English\""
};
exports.controllerOfTableForResolvingID = new ControllerOfTableForResolvingID_1.ControllerOfTableForResolvingID(database);
function search(dataInJSON) {
    var sent;
    try {
        var requestGroup = JSON.parse(dataInJSON);
        if (!Array.isArray(requestGroup))
            throw new Error("与データが配列ではありません。");
        if (!assureInputDataBelongToProperType(requestGroup))
            throw new Error("入力されたデータが正しくありません");
        var recordGroups = requestGroup.map(function (request) {
            var recordIDs = database.getRecordIDsWithCondition(request.gameSystemEnv.gameSystemID, request.orderOfRecordArray, request.abilityIDsCondition, request.abilityIDs, request.targetIDs, request.runnerIDs);
            var records = database.getRecords(request.gameSystemEnv.gameSystemID, recordIDs.slice(request.startOfRecordArray, request.startOfRecordArray + request.limitOfRecordArray));
            return convertRecordsIntoRecordGroup_1.convertRecordsIntoRecordGroup(records, { groupName: request.groupName,
                numberOfRecords: recordIDs.length,
                numberOfRunners: countRunner(database.getRecords(request.gameSystemEnv.gameSystemID, recordIDs)),
                lang: request.language
            });
        });
        sent = {
            isSuccess: true,
            recordGroups: recordGroups
        };
    }
    catch (reason) {
        console.error("\u001B[31m" + reason + "\u001B[0m");
        sent = {
            isSuccess: false,
            message: String(reason)
        };
    }
    return sent;
}
exports.search = search;
function countRunner(record) {
    var copy = record.concat();
    copy.sort(function (a, b) { return a.runnerID - b.runnerID; });
    var note = -1;
    var result = 0;
    for (var _i = 0, copy_1 = copy; _i < copy_1.length; _i++) {
        var element = copy_1[_i];
        if (note === element.runnerID)
            continue;
        result++;
        note = element.runnerID;
    }
    return result;
}
function assureInputDataBelongToProperType(data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var unit = data_1[_i];
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility(unit, checkerObj, "data");
    }
    return true;
}
