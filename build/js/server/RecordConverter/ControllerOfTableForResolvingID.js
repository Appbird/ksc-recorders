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
exports.ControllerOfTableForResolvingID = void 0;
var aboutLang_1 = require("../../utility/aboutLang");
var ControllerOfTableForResolvingID = /** @class */ (function () {
    //#NOTE コンストラクター・インジェクションの形を取ったので、モック化に対応できる。
    function ControllerOfTableForResolvingID(database) {
        var _this = this;
        //#NOTE キャッシュ。既に得たID-名前対応表を保存しておくことでFirestoreへの読み出しリクエスト回数を制限する。
        this.gameSystem = new Map();
        this.runner = new Map();
        this.hashTag = new Map();
        this.gameMode = new Map();
        this.difficulty = new Map();
        this.ability = new Map();
        this.target = new Map();
        //#NOTE 応用メソッド
        this.resolveGameSystemID = function (id, lang) { return _this.getName(id, lang, _this.gameSystem, function (id) { return _this.database.getGameSystemInfo(id); }); };
        this.resolveRunnerID = function (id, lang) { return _this.getName(id, lang, _this.runner, function (id) { return _this.database.getRunnerInfo(id); }); };
        this.resolveGameModeID = function (gameSystemID, id, lang) { return _this.getNameBySID(gameSystemID, id, lang, _this.gameMode, function (s, id) { return _this.database.getGameModeInfo(s, id); }); };
        this.resolveTagID = function (gameSystemID, id, lang) { return _this.getNameBySID(gameSystemID, id, lang, _this.hashTag, function (s, id) { return _this.database.getHashTagInfo(s, id); }); };
        this.resolveAbilityID = function (gameSystemID, gameModeID, id, lang) { return _this.getNameBySIDMID(gameSystemID, gameModeID, id, lang, _this.ability, function (s, m, id) { return _this.database.getAbilityInfo(s, m, id); }); };
        this.resolveTargetID = function (gameSystemID, gameModeID, id, lang) { return _this.getNameBySIDMID(gameSystemID, gameModeID, id, lang, _this.target, function (s, m, id) { return _this.database.getTargetInfo(s, m, id); }); };
        this.resolveGameDifficultyID = function (gameSystemID, gameModeID, id, lang) { return _this.getNameBySIDMID(gameSystemID, gameModeID, id, lang, _this.difficulty, function (s, m, id) { return _this.database.getGameDifficultyInfo(s, m, id); }); };
        this.database = database;
    }
    // #NOTE 基礎メソッド
    ControllerOfTableForResolvingID.prototype.getName = function (id, lang, cacheList, getDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(this.hashTag.has(id))) return [3 /*break*/, 2];
                        return [4 /*yield*/, cacheList.get(id)];
                    case 1:
                        _a = _e.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _c = (_b = cacheList).set;
                        _d = [id];
                        return [4 /*yield*/, getDoc(id)];
                    case 3:
                        _a = _c.apply(_b, _d.concat([_e.sent()])).get(id);
                        _e.label = 4;
                    case 4:
                        result = _a;
                        if (result === undefined)
                            throw new Error("予期しないエラーです。");
                        return [2 /*return*/, aboutLang_1.selectAppropriateName(result, lang)];
                }
            });
        });
    };
    ControllerOfTableForResolvingID.prototype.getNameBySID = function (gameSystemID, id, lang, cacheList, getDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var accessKey, result, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        accessKey = gameSystemID + "/" + id;
                        if (!(this.hashTag.has(accessKey))) return [3 /*break*/, 2];
                        return [4 /*yield*/, cacheList.get(accessKey)];
                    case 1:
                        _a = _e.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _c = (_b = cacheList).set;
                        _d = [accessKey];
                        return [4 /*yield*/, getDoc(gameSystemID, id)];
                    case 3:
                        _a = _c.apply(_b, _d.concat([_e.sent()])).get(accessKey);
                        _e.label = 4;
                    case 4:
                        result = _a;
                        if (result === undefined)
                            throw new Error("予期しないエラーです。");
                        return [2 /*return*/, aboutLang_1.selectAppropriateName(result, lang)];
                }
            });
        });
    };
    ControllerOfTableForResolvingID.prototype.getNameBySIDMID = function (gameSystemID, gameModeID, id, lang, cacheList, getDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var accessKey, result, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        accessKey = gameSystemID + "/" + gameModeID + "/" + id;
                        if (!(this.hashTag.has(accessKey))) return [3 /*break*/, 2];
                        return [4 /*yield*/, cacheList.get(accessKey)];
                    case 1:
                        _a = _e.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _c = (_b = cacheList).set;
                        _d = [accessKey];
                        return [4 /*yield*/, getDoc(gameSystemID, gameModeID, id)];
                    case 3:
                        _a = _c.apply(_b, _d.concat([_e.sent()])).get(accessKey);
                        _e.label = 4;
                    case 4:
                        result = _a;
                        if (result === undefined)
                            throw new Error("予期しないエラーです。");
                        return [2 /*return*/, aboutLang_1.selectAppropriateName(result, lang)];
                }
            });
        });
    };
    ControllerOfTableForResolvingID.prototype.convertRecordsIntoRecordGroupResolved = function (records, info) {
        return __awaiter(this, void 0, void 0, function () {
            var copy, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (records.length === 0)
                            return [2 /*return*/, {
                                    groupName: info.groupName,
                                    lastPost: 0, numberOfRecords: 0, numberOfRunners: 0,
                                    records: []
                                }];
                        copy = records.concat();
                        _a = {
                            groupName: info.groupName,
                            lastPost: copy.sort(function (a, b) { return b.timestamp - a.timestamp; })[0].timestamp,
                            numberOfRecords: info.numberOfRecords,
                            numberOfRunners: info.numberOfRunners
                        };
                        return [4 /*yield*/, Promise.all(records.map(function (record) { return _this.convertIRecordIntoIRecordInShortWithName(record, info.lang); }))];
                    case 1: return [2 /*return*/, (_a.records = _b.sent(),
                            _a)];
                }
            });
        });
    };
    ControllerOfTableForResolvingID.prototype.convertIRecordIntoIRecordInShortWithName = function (record, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var gr, gse, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        gr = record.regulation;
                        gse = gr.gameSystemEnvironment;
                        _a = {};
                        _b = {};
                        _c = {
                            gameSystemID: gse.gameSystemID,
                            gameModeID: gse.gameModeID,
                            gameDifficultyID: gse.gameDifficultyID
                        };
                        return [4 /*yield*/, this.resolveGameSystemID(gse.gameSystemID, lang)];
                    case 1:
                        _c.gameSystemName = _d.sent();
                        return [4 /*yield*/, this.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang)];
                    case 2:
                        _c.gameModeName = _d.sent();
                        return [4 /*yield*/, this.resolveGameDifficultyID(gse.gameSystemID, gse.gameModeID, gse.gameDifficultyID, lang)];
                    case 3:
                        _b.gameSystemEnvironment = (_c.gameDifficultyName = _d.sent(),
                            _c),
                            _b.targetID = gr.targetID;
                        return [4 /*yield*/, this.resolveTargetID(gse.gameSystemID, gse.gameModeID, gr.targetID, lang)];
                    case 4:
                        _b.targetName = _d.sent(),
                            _b.abilityIDs = gr.abilityIDs;
                        return [4 /*yield*/, Promise.all(gr.abilityIDs.map(function (id) { return _this.resolveAbilityID(gse.gameSystemID, gse.gameModeID, id, lang); }))];
                    case 5:
                        _a.regulation = (_b.abilityNames = _d.sent(),
                            _b),
                            _a.score = record.score,
                            _a.runnerID = record.runnerID,
                            _a.id = record.id;
                        return [4 /*yield*/, this.resolveRunnerID(record.runnerID, lang)];
                    case 6: //#README
                    return [2 /*return*/, (_a.runnerName = _d.sent(),
                            _a)];
                }
            });
        });
    };
    ControllerOfTableForResolvingID.prototype.convertRecordIntoRecordResolved = function (record, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var rr, rrg, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        rr = record.regulation;
                        rrg = record.regulation.gameSystemEnvironment;
                        _a = {
                            id: record.id,
                            score: record.score,
                            timestamp: record.timestamp
                        };
                        _b = {
                            abilityIDs: rr.abilityIDs
                        };
                        return [4 /*yield*/, Promise.all(rr.abilityIDs.map(function (abilityID) { return _this.resolveAbilityID(rrg.gameSystemID, rrg.gameModeID, abilityID, lang); }))];
                    case 1:
                        _b.abilityNames = _d.sent(),
                            _b.targetID = rr.targetID;
                        return [4 /*yield*/, this.resolveTargetID(rrg.gameSystemID, rrg.gameModeID, rr.targetID, lang)];
                    case 2:
                        _b.targetName = _d.sent();
                        _c = {
                            gameSystemID: rrg.gameSystemID
                        };
                        return [4 /*yield*/, this.resolveGameSystemID(rrg.gameSystemID, lang)];
                    case 3:
                        _c.gameSystemName = _d.sent(),
                            _c.gameDifficultyID = rrg.gameDifficultyID;
                        return [4 /*yield*/, this.resolveGameDifficultyID(rrg.gameSystemID, rrg.gameModeID, rrg.gameDifficultyID, lang)];
                    case 4:
                        _c.gameDifficultyName = _d.sent(),
                            _c.gameModeID = rrg.gameModeID;
                        return [4 /*yield*/, this.resolveGameModeID(rrg.gameSystemID, rrg.gameModeID, lang)];
                    case 5:
                        _a.regulation = (_b.gameSystemEnvironment = (_c.gameModeName = _d.sent(),
                            _c),
                            _b),
                            _a.runnerID = record.runnerID;
                        return [4 /*yield*/, this.resolveRunnerID(record.runnerID, lang)];
                    case 6:
                        _a.runnerName = _d.sent(),
                            _a.tagID = record.tagID;
                        return [4 /*yield*/, Promise.all(record.tagID.map(function (element) { return _this.resolveTagID(rrg.gameSystemID, element, lang); }))];
                    case 7: return [2 /*return*/, (_a.tagName = _d.sent(),
                            _a.note = record.note,
                            _a.link = record.link,
                            _a)];
                }
            });
        });
    };
    return ControllerOfTableForResolvingID;
}());
exports.ControllerOfTableForResolvingID = ControllerOfTableForResolvingID;
