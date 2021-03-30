"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.controllerOfTableForResolvingID = void 0;
//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[x] クライアントに与えるべきデータをJSONで出力する。
//#NOTE ここの実装はRecordDataBaseの実装に依存しない。
var RecordDataBase_1 = require("../tmpDataBase/RecordDataBase");
var ControllerOfTableForResolvingID_1 = require("../tmpDataBase/ControllerOfTableForResolvingID");
var convertRecordsIntoRecordGroup_1 = require("../recordConverter/convertRecordsIntoRecordGroup");
var InputCheckerUtility_1 = require("../../utility/InputCheckerUtility");
var database = new RecordDataBase_1.RecordDataBase();
var checkerObj = {
    groupName: "string",
    gameSystemEnv: {
        gameSystemID: "string",
        gameModeID: "string"
    },
    orderOfRecordArray: "\"HigherFirst\" | \"LowerFirst\" | \"LaterFirst\" | \"EarlierFirst\"",
    startOfRecordArray: "string",
    limitOfRecordArray: "string",
    targetIDs: "string[]",
    abilityIDs: "string[]",
    abilityIDsCondition: "\"AND\" | \"OR\" | \"AllowForOrder\"",
    runnerIDs: "string[]",
    language: "\"Japanese\" | \"English\""
};
exports.controllerOfTableForResolvingID = new ControllerOfTableForResolvingID_1.ControllerOfTableForResolvingID(database);
function search(dataInJSON) {
    return __awaiter(this, void 0, void 0, function () {
        var sent, requestGroup, recordGroups, reason_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    requestGroup = JSON.parse(dataInJSON);
                    if (!Array.isArray(requestGroup))
                        throw new Error("与データが配列ではありません。");
                    if (!InputCheckerUtility_1.checkInputObjectWithErrorPossibility(requestGroup, [checkerObj], "data"))
                        throw new Error("入力されたデータが正しくありません");
                    return [4 /*yield*/, Promise.all(requestGroup.map(function (request) { return __awaiter(_this, void 0, void 0, function () {
                            var records;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, database.getRecordsWithCondition(request.gameSystemEnv.gameSystemID, request.gameSystemEnv.gameModeID, request.orderOfRecordArray, request.abilityIDsCondition, request.abilityIDs, request.targetIDs, request.runnerIDs)];
                                    case 1:
                                        records = _a.sent();
                                        return [2 /*return*/, convertRecordsIntoRecordGroup_1.convertRecordsIntoRecordGroup(records.slice(request.startOfRecordArray, request.limitOfRecordArray), {
                                                groupName: request.groupName,
                                                numberOfRecords: records.length,
                                                numberOfRunners: countRunners(records),
                                                lang: request.language
                                            })];
                                }
                            });
                        }); }))];
                case 1:
                    recordGroups = _a.sent();
                    sent = {
                        isSuccess: true,
                        recordGroups: recordGroups
                    };
                    return [3 /*break*/, 3];
                case 2:
                    reason_1 = _a.sent();
                    console.error("\u001B[31m" + reason_1 + "\u001B[0m");
                    sent = {
                        isSuccess: false,
                        message: String(reason_1)
                    };
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, sent];
            }
        });
    });
}
exports.search = search;
function countRunners(record) {
    return new Set(record.map(function (element) { return element.runnerID; })).size;
}
