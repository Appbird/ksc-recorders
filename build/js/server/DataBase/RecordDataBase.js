"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordDataBase = void 0;
var fs = __importStar(require("fs"));
var arrayUtility_1 = require("../../utility/arrayUtility");
var RecordDataBase = /** @class */ (function () {
    function RecordDataBase(data) {
        this.dataBase = (data === undefined) ? JSON.parse(fs.readFileSync("exampleData.json", { encoding: "utf8" })) : data;
    }
    Object.defineProperty(RecordDataBase.prototype, "runnersList", {
        get: function () {
            return this.dataBase.runnersTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecordDataBase.prototype, "gameSystemList", {
        get: function () {
            return this.dataBase.runnersTable;
        },
        enumerable: false,
        configurable: true
    });
    RecordDataBase.prototype.getGameSystemInfo = function (gameSystemID) {
        var result = this.dataBase.gameSystemInfo.find(function (item) { return item.id === gameSystemID; });
        if (result === undefined)
            throw new Error("\u6307\u5B9A\u3055\u308C\u305FID" + gameSystemID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30B2\u30FC\u30E0\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
        return result;
    };
    RecordDataBase.prototype.getRecord = function (gameSystemID, recordID) {
        //[x] 与えられた条件に適した記録を記録を一つ返す。
        var result = this.getGameSystemInfo(gameSystemID).records.find(function (item) { return item.recordID === recordID; });
        if (result === undefined)
            throw new Error("\u30B2\u30FC\u30E0\u30B7\u30B9\u30C6\u30E0ID" + gameSystemID + "\u306E\u8A18\u9332\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306B\u3001\u6307\u5B9A\u3055\u308C\u305FID" + recordID + "\u306B\u5BFE\u3059\u308B\u8A18\u9332\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
        return result;
    };
    RecordDataBase.prototype.getRecordIDsWithCondition = function (gameSystemID, order, abilityIDsCondition, abilityIDs, targetIDs, runnerIDs) {
        var _this = this;
        if (abilityIDs === void 0) { abilityIDs = []; }
        if (targetIDs === void 0) { targetIDs = []; }
        if (runnerIDs === void 0) { runnerIDs = []; }
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        var records = this.getGameSystemInfo(gameSystemID).records;
        return records.filter(function (record) {
            return ((targetIDs.length === 0) ? true : targetIDs.some(function (id) { return id === record.regulation.targetID; })) &&
                ((abilityIDs.length === 0) ? true : _this.ifRecordIncludeThatAbilityIDs(record, abilityIDsCondition, abilityIDs)) &&
                ((runnerIDs.length === 0) ? true : runnerIDs.some(function (id) { return id === record.runnerID; }));
        }).sort(function (a, b) {
            switch (order) {
                case "HigherFirst": return b.score - a.score;
                case "LowerFirst": return a.score - b.score;
                case "LaterFirst": return -1;
                case "EarlierFirst": return 1;
            }
        }).map(function (record) { return record.recordID; });
    };
    RecordDataBase.prototype.ifRecordIncludeThatAbilityIDs = function (record, abilityIDsCondition, abilityIDs) {
        switch (abilityIDsCondition) {
            case "AND":
                return abilityIDs.every(function (id) { return record.regulation.abilityIDsOfPlayerCharacters.includes(id); });
            case "OR":
                return abilityIDs.some(function (id) { return record.regulation.abilityIDsOfPlayerCharacters.includes(id); });
            case "AllowForOrder":
                return arrayUtility_1.checkEqualityBetweenArrays(record.regulation.abilityIDsOfPlayerCharacters, abilityIDs);
        }
    };
    RecordDataBase.prototype.getRecords = function (gameSystemID, recordIDs) {
        return this.getGameSystemInfo(gameSystemID).records.filter(function (record) { return recordIDs.includes(record.recordID); });
    };
    return RecordDataBase;
}());
exports.RecordDataBase = RecordDataBase;
