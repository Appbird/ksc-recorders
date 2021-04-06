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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebaseAdmin_1 = require("../firebaseAdmin");
var exampleRecords_1 = require("./exampleRecords");
//#TODO 想定する通りにコードを作る。
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ref, data, mode, _a, _b, ele, _c, _d, ele, _e, _f, ele, recordsData_1, recordsData_1_1, record;
    var e_1, _g, e_2, _h, e_3, _j, e_4, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.firebase.firestore.collection("works").add({
                    "id": 0, "JName": "日本語作品名", "EName": "Title Of a kirby's game",
                    "JDescription": "ゲームに関する説明を短く記述", "EDescription": "Description about the game",
                })];
            case 1:
                ref = _l.sent();
                data = {
                    "ability": [{ "id": "0", "JName": "能力0", "EName": "Ability0" }, { "id": "1", "JName": "能力1", "EName": "Ability1" }, { "id": "2", "JName": "能力2", "EName": "Ability2" }],
                    "target": [{ "id": "0", "JName": "対象0", "EName": "Target0" }, { "id": "1", "JName": "対象1", "EName": "Target1" }, { "id": "2", "JName": "対象2", "EName": "Target2" }],
                    "difficulty": [{ "id": "0", "JName": "難易度0", "EName": "Difficulty0", }, { "id": "1", "JName": "難易度1", "EName": "Difficulty1" }],
                    "modes": [{ "id": "0", "JName": "モード0", "EName": "Mode0" }]
                };
                return [4 /*yield*/, ref.collection("modes").add(data.modes[0])];
            case 2:
                mode = _l.sent();
                try {
                    for (_a = __values(data.ability), _b = _a.next(); !_b.done; _b = _a.next()) {
                        ele = _b.value;
                        mode.collection("abilities").add(ele);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (_c = __values(data.difficulty), _d = _c.next(); !_d.done; _d = _c.next()) {
                        ele = _d.value;
                        mode.collection("difficulties").add(ele);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (_e = __values(data.target), _f = _e.next(); !_f.done; _f = _e.next()) {
                        ele = _f.value;
                        mode.collection("targets").add(ele);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (recordsData_1 = __values(exampleRecords_1.recordsData), recordsData_1_1 = recordsData_1.next(); !recordsData_1_1.done; recordsData_1_1 = recordsData_1.next()) {
                        record = recordsData_1_1.value;
                        mode.collection("records").add(record);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (recordsData_1_1 && !recordsData_1_1.done && (_k = recordsData_1.return)) _k.call(recordsData_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return [2 /*return*/];
        }
    });
}); })();
