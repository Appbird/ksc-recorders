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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var clone_deep_1 = __importDefault(require("clone-deep"));
var ControllerOfTableForResolvingID_1 = require("../../recordConverter/ControllerOfTableForResolvingID");
function search(recordDataBase, input) {
    return __awaiter(this, void 0, void 0, function () {
        var cotfr, _a, result;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cotfr = new ControllerOfTableForResolvingID_1.ControllerOfTableForResolvingID(recordDataBase);
                    if (!(input.condition[0].gameSystemEnv.gameDifficultyID !== undefined)) return [3 /*break*/, 2];
                    _a = input;
                    return [4 /*yield*/, prepareForDifficultySearch(cotfr, recordDataBase, input.condition[0])];
                case 1:
                    _a.condition = _b.sent();
                    _b.label = 2;
                case 2: return [4 /*yield*/, Promise.all(input.condition.map(function (input) { return __awaiter(_this, void 0, void 0, function () {
                        var records;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, recordDataBase.getRecordsWithCondition(input.gameSystemEnv.gameSystemID, input.gameSystemEnv.gameModeID, input.orderOfRecordArray, input.abilityIDsCondition, input.abilityIDs, input.targetIDs, input.runnerIDs)];
                                case 1:
                                    records = (_a.sent());
                                    if (input.startOfRecordArray === undefined)
                                        input.startOfRecordArray = 0;
                                    if (input.limitOfRecordArray === undefined)
                                        input.limitOfRecordArray = 7;
                                    return [2 /*return*/, cotfr.convertRecordsIntoRecordGroupResolved(records.slice(input.startOfRecordArray, input.limitOfRecordArray), { groupName: input.groupName, numberOfRecords: records.length, numberOfRunners: countRunners(records), lang: input.language })];
                            }
                        });
                    }); }))];
                case 3:
                    result = _b.sent();
                    return [2 /*return*/, {
                            isSucceeded: true,
                            result: result
                        }];
            }
        });
    });
}
exports.search = search;
function countRunners(record) {
    return new Set(record.map(function (element) { return element.runnerID; })).size;
}
function prepareForDifficultySearch(converter, recordDataBase, input) {
    return __awaiter(this, void 0, void 0, function () {
        var gameEnv, targetIDs, targetNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.gameSystemEnv.gameDifficultyID === undefined)
                        throw new Error("予期せぬエラーが発生しました。");
                    gameEnv = input.gameSystemEnv;
                    if (!(input.gameSystemEnv.gameDifficultyID === "whole")) return [3 /*break*/, 2];
                    return [4 /*yield*/, recordDataBase.getTargetCollection(gameEnv.gameSystemID, gameEnv.gameModeID)];
                case 1:
                    targetIDs = (_a.sent()).map(function (ele) { return ele.id; });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, recordDataBase.getGameDifficultyInfo(gameEnv.gameSystemID, gameEnv.gameModeID, input.gameSystemEnv.gameDifficultyID)];
                case 3:
                    targetIDs = (_a.sent()).TargetIDsIncludedInTheDifficulty;
                    _a.label = 4;
                case 4: return [4 /*yield*/, Promise.all(targetIDs.map(function (targetID) { return converter.resolveTargetID(gameEnv.gameSystemID, gameEnv.gameModeID, targetID, input.language); }))];
                case 5:
                    targetNames = _a.sent();
                    input.gameSystemEnv.gameDifficultyID = undefined;
                    return [2 /*return*/, targetIDs.map(function (targetID, index) {
                            var result = clone_deep_1.default(input);
                            result.targetIDs = [targetID];
                            result.groupName = targetNames[index];
                            return result;
                        })];
            }
        });
    });
}
