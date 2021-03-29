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
exports.RecordDataBase = void 0;
var firebaseAdmin_1 = require("../firebaseAdmin");
//[x] getRecordsWithConditionメソッドの実装
var RecordDataBase = /** @class */ (function () {
    function RecordDataBase() {
        this.dataBase = firebaseAdmin_1.firebase.firestore;
    }
    Object.defineProperty(RecordDataBase.prototype, "runnersList", {
        get: function () {
            return this.dataBase.collection("runners");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecordDataBase.prototype, "gameSystemList", {
        get: function () {
            return this.dataBase.collection("gameSystem");
        },
        enumerable: false,
        configurable: true
    });
    RecordDataBase.prototype.getGameSystemInfo = function (gameSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.gameSystemList.doc(gameSystemID).get()];
                    case 1:
                        result = _a.sent();
                        if (!result.exists)
                            throw new Error("\u6307\u5B9A\u3055\u308C\u305FID" + gameSystemID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30B2\u30FC\u30E0\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result.data()];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecord = function (gameSystemID, recordID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.gameSystemList.doc(gameSystemID).collection("records").doc(recordID).get()];
                    case 1:
                        result = _a.sent();
                        if (!result.exists)
                            throw new Error("\u6307\u5B9A\u3055\u308C\u305FID" + gameSystemID + "\u306B\u5BFE\u5FDC\u3059\u308B\u30B2\u30FC\u30E0\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
                        return [2 /*return*/, result.data()];
                }
            });
        });
    };
    RecordDataBase.prototype.getRecordsWithCondition = function (gameSystemID, order, abilityIDsCondition, abilityIDs, targetIDs, runnerIDs) {
        if (abilityIDs === void 0) { abilityIDs = []; }
        if (targetIDs === void 0) { targetIDs = []; }
        if (runnerIDs === void 0) { runnerIDs = []; }
        return __awaiter(this, void 0, void 0, function () {
            var recordsQuery, recordsQuerySnapshot, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10)
                            throw Error("\u80FD\u529B(" + abilityIDs.length + "\u3064),\u8A08\u6E2C\u5BFE\u8C61(" + targetIDs.length + "\u3064),\u8D70\u8005(" + runnerIDs.length + "\u3064)\u306E\u3046\u3061\u3044\u305A\u308C\u304B\u306E\u6761\u4EF6\u6307\u5B9A\u304C\u591A\u3059\u304E\u307E\u3059\u3002");
                        recordsQuery = this.gameSystemList.doc(gameSystemID).collection("records");
                        if (abilityIDs.length !== 0)
                            recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery, abilityIDsCondition, abilityIDs);
                        if (targetIDs.length !== 0)
                            recordsQuery = recordsQuery.where("targetIDs", "array-contains-any", targetIDs);
                        if (runnerIDs.length !== 0)
                            recordsQuery = recordsQuery.where("runnerIDs", "array-contains-any", targetIDs);
                        return [4 /*yield*/, this.addQueryAboutOrderBy(recordsQuery, order).get()];
                    case 1:
                        recordsQuerySnapshot = _a.sent();
                        records = recordsQuerySnapshot.docs.map(function (doc) {
                            var data = doc.data();
                            data.id = doc.id;
                            return data;
                        });
                        return [2 /*return*/, records];
                }
            });
        });
    };
    RecordDataBase.prototype.addQueryAboutAbilityIDs = function (recordQuery, abilityIDsCondition, abilityIDs) {
        switch (abilityIDsCondition) {
            case "AND":
                for (var _i = 0, abilityIDs_1 = abilityIDs; _i < abilityIDs_1.length; _i++) {
                    var abilityID = abilityIDs_1[_i];
                    recordQuery = recordQuery.where("abilityIDs", "array-contains", abilityID);
                }
                return recordQuery;
            case "OR":
                return recordQuery.where("abilityIDs", "array-contains-any", abilityIDs);
            case "AllowForOrder":
                return recordQuery.where("abilityIDs", "==", abilityIDs);
        }
    };
    RecordDataBase.prototype.addQueryAboutOrderBy = function (recordQuery, order) {
        switch (order) {
            case "EarlierFirst": return recordQuery.orderBy("timestamp", "asc");
            case "LaterFirst": return recordQuery.orderBy("timestamp", "desc");
            case "LowerFirst": return recordQuery.orderBy("stamp", "asc");
            case "HigherFirst": return recordQuery.orderBy("stamp", "desc");
        }
    };
    return RecordDataBase;
}());
exports.RecordDataBase = RecordDataBase;
