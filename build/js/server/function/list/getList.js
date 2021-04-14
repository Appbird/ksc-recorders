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
exports.difficulties = exports.abilities = exports.targets = exports.hashTags = exports.gameModes = exports.runners = exports.gameSystems = void 0;
function searchBasedOnIDList(inputIdList, data) {
    var idList = inputIdList.concat();
    return data.filter(function (item) {
        var search = idList.findIndex(function (id) { return item.id === id; });
        if (search === -1)
            return false;
        idList.splice(search, 1);
        return true;
    });
}
function getList_UseId(input, searchFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var end, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.start === undefined)
                        input.start = 0;
                    end = (input.limit === undefined) ? undefined : input.start + input.limit;
                    return [4 /*yield*/, searchFunc()];
                case 1:
                    result = (_a.sent()).slice(input.start, end);
                    if (input.id === undefined)
                        return [2 /*return*/, { isSucceeded: true, result: result }];
                    return [2 /*return*/, { isSucceeded: true, result: searchBasedOnIDList(input.id, result) }];
            }
        });
    });
}
function getList_UseSIdId(input, searchFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var end, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.start === undefined)
                        input.start = 0;
                    end = (input.limit === undefined) ? undefined : input.start + input.limit;
                    return [4 /*yield*/, searchFunc(input.gameSystemEnv.gameSystemID)];
                case 1:
                    result = (_a.sent()).slice(input.start, end);
                    if (input.id === undefined)
                        return [2 /*return*/, { isSucceeded: true, result: result }];
                    return [2 /*return*/, { isSucceeded: true, result: searchBasedOnIDList(input.id, result) }];
            }
        });
    });
}
function getList_UseSIdMIdId(input, searchFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var end, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.start === undefined)
                        input.start = 0;
                    end = (input.limit === undefined) ? undefined : input.start + input.limit;
                    return [4 /*yield*/, searchFunc(input.gameSystemEnv.gameSystemID, input.gameSystemEnv.gameModeID)];
                case 1:
                    result = (_a.sent()).slice(input.start, end);
                    if (input.id === undefined)
                        return [2 /*return*/, { isSucceeded: true, result: result }];
                    return [2 /*return*/, { isSucceeded: true, result: searchBasedOnIDList(input.id, result) }];
            }
        });
    });
}
exports.gameSystems = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseId(input, function () { return database.getGameSystemCollection(); })];
}); }); };
exports.runners = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseId(input, function () { return database.getRunnerCollection(); })];
}); }); };
exports.gameModes = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseSIdId(input, function (s) { return database.getGameModeCollection(s); })];
}); }); };
exports.hashTags = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseSIdId(input, function (s) { return database.getHashTagCollection(s); })];
}); }); };
exports.targets = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseSIdMIdId(input, function (s, m) { return database.getTargetCollection(s, m); })];
}); }); };
exports.abilities = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseSIdMIdId(input, function (s, m) { return database.getAbilityCollection(s, m); })];
}); }); };
exports.difficulties = function (database, input) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getList_UseSIdMIdId(input, function (s, m) { return database.getGameDifficultyCollection(s, m); })];
}); }); };
