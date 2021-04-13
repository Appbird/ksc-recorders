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
var assert_1 = __importDefault(require("assert"));
var RecordDataBase_1 = require("../firestore/RecordDataBase");
var arrayUtility_1 = require("../../utility/arrayUtility");
var database = RecordDataBase_1.recordDataBase;
var workID = "fpNF4dAftZV2ffQJLvv6";
var modeID = "OkXl20WqP6KKVnHeM31O";
var _recordIDs = ["dEM2ZqreBJWFlPBi1DKP", "OSisCLCeVulU1YvCjbkN", "x9uswxT60LwBj3mANb79", "a63aPqWLoxPLAYLAdsIa"];
var _abilityIDs = ["fFP6AoTUpj0g2XuRaED1", "wSRE6MPhAxotO4lvQP6V", "qjHvv97ajO0B4c3FgpUF"];
var _targetIDs = ["uqfq8ggNMxmQOk6OPQfs", "a0OVgCEoigK3zgG25J1V", "wH2m8P6Nnm1TuouFIFyj"];
var _runnerIDs = ["6RVv7FuJmFTeV6yUlmSu", "NdAjJP82wpsoZeQiMWQx", "O0mzND0yxOuTko7zWPga"];
describe("正しく記録が選別されるか", function () {
    //[x] これらのテストコードの実装
    //[x] こいつらをどういう配置にしてコンパイルするか…を考えたい！
    //[x] 挙動の確認
    //[x] Firestoreの物に切り替えてもしっかりとチェックが通るかを確認
    it("無条件でデータを取り出す。", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [0,1,3,2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([0, 1, 3, 2], workID, modeID, "LowerFirst", "OR", [], [], [])];
                case 1:
                    //*> [0,1,3,2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    //[x]ここのエラーの修正
    it("能力IDに2を含む記録を早い順で取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [1,3,2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([1, 3, 2], workID, modeID, "LowerFirst", "OR", [2], [], [])];
                case 1:
                    //*> [1,3,2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("能力IDに2を含む記録を新しい投稿順で取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [2,3]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([2, 1, 3], workID, modeID, "LaterFirst", "OR", [2], [], [])];
                case 1:
                    //*> [2,3]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("能力IDに1,2をどちらも含む記録を取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [3,2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([3, 2], workID, modeID, "LowerFirst", "AND", [1, 2])];
                case 1:
                    //*> [3,2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("能力IDに1,2をいずれか含む記録を取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [1,3,2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([1, 3, 2], workID, modeID, "LowerFirst", "OR", [1, 2])];
                case 1:
                    //*> [1,3,2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("対象IDが1である記録を取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [1,2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([1, 2], workID, modeID, "LowerFirst", "OR", undefined, [1], undefined)];
                case 1:
                    //*> [1,2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("走者IDが1である記録を取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> [2]
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, checkF([2], workID, modeID, "LowerFirst", "OR", undefined, undefined, [1])];
                case 1:
                    //*> [2]
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("記録IDが2である記録を取り出す", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    //*> idが2の記録
                    _b = (_a = assert_1.default).ok;
                    return [4 /*yield*/, database.getRecord(workID, modeID, _recordIDs[2])];
                case 1:
                    //*> idが2の記録
                    _b.apply(_a, [(_c.sent()).id === "2"]);
                    return [2 /*return*/];
            }
        });
    }); });
});
function converseIntoIDs(records) {
    return records.map(function (record) { return record.id; });
}
function checkF(expectedRecordIDs, gameSystemID, gameModeID, order, abilityIDsCondition, abilityIDs, targetIDs, runnerIDs, limits) {
    if (abilityIDs === void 0) { abilityIDs = []; }
    if (targetIDs === void 0) { targetIDs = []; }
    if (runnerIDs === void 0) { runnerIDs = []; }
    if (limits === void 0) { limits = 10; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = arrayUtility_1.checkEqualityBetweenArraysWithConsoleMsg;
                    _b = converseIntoIDs;
                    return [4 /*yield*/, database.getRecordsWithCondition(gameSystemID, gameModeID, order, abilityIDsCondition, abilityIDs.map(function (ele) { return _abilityIDs[ele]; }), targetIDs.map(function (ele) { return _targetIDs[ele]; }), runnerIDs.map(function (ele) { return _runnerIDs[ele]; }))];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [(_c.sent()).slice(0, limits)]), expectedRecordIDs.map(function (expectedRecordID) { return _recordIDs[expectedRecordID]; })])];
                case 2:
                    error_1 = _c.sent();
                    console.error(error_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
