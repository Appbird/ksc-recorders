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
exports.recordDataBase = void 0;
var firebaseAdmin_1 = require("../firebaseAdmin");
//[x] getRecordsWithConditionメソッドの実装
var RecordDataBase = /** @class */ (function () {
    function RecordDataBase() {
        var _this = this;
        this.getRunnersRef = function () { return _this.dataBase.collection("runners"); };
        this.getGameSystemCollectionRef = function () { return _this.dataBase.collection("works"); };
        this.getGameSystemRef = function (gameSystemID) { return _this.dataBase.collection("works").doc(gameSystemID); };
        this.getGameModeRef = function (gameSystemID, gameModeID) { return _this.getGameSystemCollectionRef().doc(gameSystemID).collection("modes").doc(gameModeID); };
        this.getGameSystemCollection = function () { return _this.getCollection(_this.getGameSystemCollectionRef()); };
        this.getGameSystemInfo = function (gameSystemID) { return _this.getDoc(_this.getGameSystemCollectionRef().doc(gameSystemID)); };
        this.getGameModeCollection = function (gameSystemID) { return _this.getCollection(_this.getGameSystemRef(gameSystemID).collection("modes")); };
        this.getGameModeInfo = function (gameSystemID, gameModeID) { return _this.getDoc(_this.getGameModeRef(gameSystemID, gameModeID)); };
        this.getGameDifficultyCollection = function (gameSystemID, gameModeID) { return _this.getCollection(_this.getGameModeRef(gameSystemID, gameModeID).collection("difficulty")); };
        this.getGameDifficultyInfo = function (gameSystemID, gameModeID, id) { return _this.getDoc(_this.getGameModeRef(gameSystemID, gameModeID).collection("difficulty").doc(id)); };
        this.getAbilityCollection = function (gameSystemID, gameModeID) { return _this.getCollection(_this.getGameModeRef(gameSystemID, gameModeID).collection("ability")); };
        this.getAbilityInfo = function (gameSystemID, gameModeID, id) { return _this.getDoc(_this.getGameModeRef(gameSystemID, gameModeID).collection("ability").doc(id)); };
        this.getTargetCollection = function (gameSystemID, gameModeID) { return _this.getCollection(_this.getGameModeRef(gameSystemID, gameModeID).collection("target")); };
        this.getTargetInfo = function (gameSystemID, gameModeID, id) { return _this.getDoc(_this.getGameModeRef(gameSystemID, gameModeID).collection("target").doc(id)); };
        this.getRunnerCollection = function () { return _this.getCollection(_this.getRunnersRef()); };
        this.getRunnerInfo = function (id) { return _this.getDoc(_this.getRunnersRef().doc(id)); };
        //#TODO テストをするときにはデータベースが保存するハッシュタグの場所を修正する。
        this.getHashTagCollection = function (gameSystemID) { return _this.getCollection(_this.getGameSystemRef(gameSystemID).collection("hashTag")); };
        this.getHashTagInfo = function (gameSystemID, id) { return _this.getDoc(_this.getGameSystemRef(gameSystemID).collection("HashTag").doc(id)); };
        this.dataBase = firebaseAdmin_1.firebase.firestore;
    }
    RecordDataBase.prototype.getCollection = function (ref) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ref.get()];
                    case 1:
                        result = _a.sent();
                        if (result.empty)
                            throw new Error("\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3" + ref.path + "\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result.docs];
                }
            });
        });
    };
    RecordDataBase.prototype.getDoc = function (ref) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ref.get()];
                    case 1:
                        result = _a.sent();
                        if (result.exists)
                            throw new Error("\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8" + ref.path + "\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result.data()];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecord = function (gameSystemID, gameModeID, recordID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameModeRef(gameSystemID, gameModeID).collection("records").doc(recordID).get()];
                    case 1:
                        result = _a.sent();
                        if (!result.exists)
                            throw new Error("\u6307\u5B9A\u3055\u308C\u305F\u30B2\u30FC\u30E0ID" + gameSystemID + ",\u30E2\u30FC\u30C9ID" + gameModeID + "\u5185\u306E\u8A18\u9332ID" + recordID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30E2\u30FC\u30C9\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result.data()];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecordsWithCondition = function (gameSystemID, gameModeID, order, abilityIDsCondition, abilityIDs, targetIDs, runnerIDs) {
        if (abilityIDs === void 0) { abilityIDs = []; }
        if (targetIDs === void 0) { targetIDs = []; }
        if (runnerIDs === void 0) { runnerIDs = []; }
        return __awaiter(this, void 0, void 0, function () {
            var recordsQuery, recordsQuerySnapshot, records;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10)
                            throw Error("\u80FD\u529B(" + abilityIDs.length + "\u3064),\u8A08\u6E2C\u5BFE\u8C61(" + targetIDs.length + "\u3064),\u8D70\u8005(" + runnerIDs.length + "\u3064)\u306E\u3046\u3061\u3044\u305A\u308C\u304B\u306E\u6761\u4EF6\u6307\u5B9A\u304C10\u500B\u3088\u308A\u3082\u591A\u3044\u3067\u3059\u3002");
                        console.log("[" + new Date().toUTCString() + "]\u4EE5\u4E0B\u306E\u6761\u4EF6\u3067\u691C\u7D22\u3092\u958B\u59CB\u3057\u307E\u3059\u3002\n\u001B[33m gameSystemID:" + gameSystemID + ", gameModeID:" + gameModeID + ", order:" + order + ", abilityIDsCondition:" + abilityIDsCondition + ", abilityIDs:[" + abilityIDs + "] (" + abilityIDs.length + "), targetIDs:[" + targetIDs + "] (" + targetIDs.length + "), runnerIDs:[" + runnerIDs + "] (" + runnerIDs.length + ") \u001B[0m");
                        recordsQuery = this.getGameModeRef(gameSystemID, gameModeID).collection("records");
                        if (abilityIDs.length !== 0)
                            recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery, abilityIDsCondition, abilityIDs);
                        if (targetIDs.length !== 0)
                            recordsQuery = recordsQuery.where("regulation.targetID", "in", targetIDs);
                        if (runnerIDs.length !== 0)
                            recordsQuery = recordsQuery.where("runnerID", "in", runnerIDs);
                        return [4 /*yield*/, recordsQuery.get()];
                    case 1:
                        recordsQuerySnapshot = _a.sent();
                        records = recordsQuerySnapshot.docs.map(function (doc) {
                            var data = doc.data();
                            data.id = doc.id;
                            return data;
                        });
                        if (recordsQuerySnapshot.empty)
                            console.info("条件に該当する記録が存在しませんでした。");
                        //#NOTE abilityIDsでAND検索を行った場合の補填をここでする。
                        if (abilityIDsCondition === "AND")
                            records = records.filter(function (record) {
                                return abilityIDs.every(function (abilityID) { return record.regulation.abilityIDs.includes(abilityID); });
                            });
                        return [2 /*return*/, records.sort(function (a, b) { return _this.sortFunction(a, b, order); })];
                }
            });
        });
    };
    RecordDataBase.prototype.addQueryAboutAbilityIDs = function (recordQuery, abilityIDsCondition, abilityIDs) {
        switch (abilityIDsCondition) {
            case "AND":
                //#NOTE array-contains句は一つしか設定できずクエリでのAND検索が実装不可能であるため、必要条件のクエリとしてabilityIDs array-contains abilityIDs[0]をFirebase側に送り、のちに十分性をFunctionsサイドで補填する。
                return recordQuery.where("regulation.abilityIDs", "array-contains", abilityIDs[0]);
            case "OR":
                return recordQuery.where("regulation.abilityIDs", "array-contains-any", abilityIDs);
            case "AllowForOrder":
                return recordQuery.where("regulation.abilityIDs", "==", abilityIDs);
        }
    };
    RecordDataBase.prototype.sortFunction = function (a, b, order) {
        switch (order) {
            case "HigherFirst": return b.score - a.score;
            case "LowerFirst": return a.score - b.score;
            case "LaterFirst": return b.timestamp - a.timestamp;
            case "EarlierFirst": return a.timestamp - b.timestamp;
            default: return 0;
        }
    };
    return RecordDataBase;
}());
exports.recordDataBase = new RecordDataBase();
