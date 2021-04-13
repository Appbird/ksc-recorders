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
exports.recordDataBase = exports.RecordDataBase = void 0;
var arrayUtility_1 = require("../../utility/arrayUtility");
var exampledata_1 = require("./exampledata");
var undefinedChecker_1 = require("../../utility/undefinedChecker");
var RecordDataBase = /** @class */ (function () {
    function RecordDataBase() {
        this.dataBase = exampledata_1.exampleData;
    }
    RecordDataBase.prototype.getGameSystemCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataBase.gameSystemInfo];
            });
        });
    };
    RecordDataBase.prototype.getGameSystemInfo = function (gameSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefinedChecker_1.checkIsUndefined(this.dataBase.gameSystemInfo.find(function (item) { return item.id === gameSystemID; }), "\u6307\u5B9A\u3055\u308C\u305FID" + gameSystemID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30B7\u30EA\u30FC\u30BA\u306E\u30B2\u30FC\u30E0\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002")];
            });
        });
    };
    RecordDataBase.prototype.getGameModeCollection = function (gameSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameSystemInfo(gameSystemID)];
                    case 1: return [2 /*return*/, (_a.sent()).modes];
                }
            });
        });
    };
    RecordDataBase.prototype.getGameModeInfo = function (gameSystemID, gameModeID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = undefinedChecker_1.checkIsUndefined;
                        return [4 /*yield*/, this.getGameSystemInfo(gameSystemID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).modes.find(function (item) { return item.id === gameModeID; }), "\u6307\u5B9A\u3055\u308C\u305FID" + gameSystemID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30E2\u30FC\u30C9\u304C\u3001\u30B7\u30EA\u30FC\u30BA\u306E\u30B2\u30FC\u30E0(ID:" + gameSystemID + ")\u306B\u5B58\u5728\u3057\u307E\u305B\u3093\u3002"])];
                }
            });
        });
    };
    RecordDataBase.prototype.getRunnerCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataBase.runnersTable];
            });
        });
    };
    RecordDataBase.prototype.getRunnerInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefinedChecker_1.checkIsUndefined(this.dataBase.runnersTable.find(function (item) { return item.id === id; }), "\u6307\u5B9A\u3055\u308C\u305FID" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u8D70\u8005\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002")];
            });
        });
    };
    RecordDataBase.prototype.getTargetCollection = function (gameSystemID, gameModeID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, (_a.sent()).targets];
                }
            });
        });
    };
    RecordDataBase.prototype.getTargetInfo = function (gameSystemID, gameModeID, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = undefinedChecker_1.checkIsUndefined;
                        return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).targets.find(function (item) { return item.id === id; }), "\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9" + gameSystemID + "/" + gameModeID + "\u306B\u304A\u3051\u308B\u6307\u5B9A\u3055\u308C\u305FID" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u8A08\u6E2C\u5BFE\u8C61\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002"])];
                }
            });
        });
    };
    RecordDataBase.prototype.getAbilityCollection = function (gameSystemID, gameModeID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, (_a.sent()).abilities];
                }
            });
        });
    };
    RecordDataBase.prototype.getAbilityInfo = function (gameSystemID, gameModeID, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = undefinedChecker_1.checkIsUndefined;
                        return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).abilities.find(function (item) { return item.id === id; }), "\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9" + gameSystemID + "/" + gameModeID + "\u306B\u304A\u3051\u308B\u6307\u5B9A\u3055\u308C\u305FID" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u80FD\u529B\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002"])];
                }
            });
        });
    };
    RecordDataBase.prototype.getGameDifficultyCollection = function (gameSystemID, gameModeID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, (_a.sent()).difficulties];
                }
            });
        });
    };
    RecordDataBase.prototype.getGameDifficultyInfo = function (gameSystemID, gameModeID, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = undefinedChecker_1.checkIsUndefined;
                        return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).difficulties.find(function (item) { return item.id === id; }), "\u30B2\u30FC\u30E0\u30E2\u30FC\u30C9" + gameSystemID + "/" + gameModeID + "\u306B\u304A\u3051\u308B\u6307\u5B9A\u3055\u308C\u305FID" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u96E3\u6613\u5EA6\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002"])];
                }
            });
        });
    };
    RecordDataBase.prototype.getHashTagCollection = function (gameSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameSystemInfo(gameSystemID)];
                    case 1: return [2 /*return*/, (_a.sent()).tags];
                }
            });
        });
    };
    RecordDataBase.prototype.getHashTagInfo = function (gameSystemID, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = undefinedChecker_1.checkIsUndefined;
                        return [4 /*yield*/, this.getGameSystemInfo(gameSystemID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).tags.find(function (item) { return item.id === id; }), "\u30B2\u30FC\u30E0" + gameSystemID + "\u306B\u304A\u3051\u308B\u6307\u5B9A\u3055\u308C\u305FID" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u30CF\u30C3\u30B7\u30E5\u30BF\u30B0\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002"])];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecord = function (gameSystemID, gameModeID, recordID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1:
                        result = (_a.sent()).records.find(function (item) { return item.id === recordID; });
                        if (result === undefined)
                            throw new Error("\u30B2\u30FC\u30E0\u30B7\u30B9\u30C6\u30E0ID" + gameSystemID + "\u306E\u8A18\u9332\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306B\u3001\u6307\u5B9A\u3055\u308C\u305FID" + recordID + "\u306B\u5BFE\u3059\u308B\u8A18\u9332\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecordsWithCondition = function (gameSystemID, gameModeID, order, abilityIDsCondition, abilityIDs, targetIDs, runnerIDs) {
        if (abilityIDsCondition === void 0) { abilityIDsCondition = "AllowForOrder"; }
        if (abilityIDs === void 0) { abilityIDs = []; }
        if (targetIDs === void 0) { targetIDs = []; }
        if (runnerIDs === void 0) { runnerIDs = []; }
        return __awaiter(this, void 0, void 0, function () {
            var records;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeInfo(gameSystemID, gameModeID)];
                    case 1:
                        records = (_a.sent()).records;
                        records = records.filter(function (record) {
                            return ((targetIDs.length === 0) ? true : targetIDs.some(function (id) { return id === record.regulation.targetID; })) &&
                                ((abilityIDs.length === 0) ? true : _this.ifRecordIncludeThatAbilityIDs(record, abilityIDsCondition, abilityIDs)) &&
                                ((runnerIDs.length === 0) ? true : runnerIDs.some(function (id) { return id === record.runnerID; }));
                        }).sort(function (a, b) {
                            switch (order) {
                                case "HigherFirst": return b.score - a.score;
                                case "LowerFirst": return a.score - b.score;
                                //[x] ここの実装を、timestampをもとにしたものにする。
                                case "LaterFirst": return b.timestamp - a.timestamp;
                                case "EarlierFirst": return a.timestamp - b.timestamp;
                                default: return 0;
                            }
                        });
                        return [2 /*return*/, records];
                }
            });
        });
    };
    RecordDataBase.prototype.ifRecordIncludeThatAbilityIDs = function (record, abilityIDsCondition, abilityIDs) {
        switch (abilityIDsCondition) {
            case "AND":
                return abilityIDs.every(function (id) { return record.regulation.abilityIDs.includes(id); });
            case "OR":
                return abilityIDs.some(function (id) { return record.regulation.abilityIDs.includes(id); });
            case "AllowForOrder":
                return arrayUtility_1.checkEqualityBetweenArrays(record.regulation.abilityIDs, abilityIDs);
        }
    };
    return RecordDataBase;
}());
exports.RecordDataBase = RecordDataBase;
//#NOTE シングルトン
exports.recordDataBase = new RecordDataBase();
