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
    abilityIDsCondition: "string[]",
    runnerIDs: "number[]",
    language: "Ja | En"
};
exports.controllerOfTableForResolvingID = new ControllerOfTableForResolvingID_1.ControllerOfTableForResolvingID(database);
function search(dataInJSON) {
    var inputData = JSON.parse(dataInJSON);
    var requestGroup = JSON.parse(dataInJSON);
    if (Array.isArray(requestGroup))
        throw new Error("与データが配列ではありません。");
    InputCheckerUtility_1.checkInputObjectWithErrorPossibility(requestGroup, checkerObj);
    var sent;
    try {
        var recordGroups = requestGroup.map(function (request) {
            var recordIDs = database.getRecordIDsWithCondition(request.gameSystemEnv.gameSystemID, request.orderOfRecordArray, request.abilityIDsCondition, request.abilityIDs, request.targetIDs, request.runnerIDs);
            var records = database.getRecords(request.gameSystemEnv.gameSystemID, recordIDs.slice(request.startOfRecordArray, request.startOfRecordArray + request.limitOfRecordArray));
            return convertRecordsIntoRecordGroup_1.convertRecordsIntoRecordGroup(records, { groupName: request.groupName,
                numberOfRecords: recordIDs.length,
                numberOfRunners: 3,
                lang: request.language
            });
        });
        sent = {
            isSuccess: true,
            recordGroups: recordGroups
        };
    }
    catch (e) {
        sent = {
            isSuccess: false,
            recordGroups: undefined,
            message: e
        };
    }
    return JSON.stringify(sent);
}
exports.search = search;
