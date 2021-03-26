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
var http_1 = __importDefault(require("http"));
var promises_1 = __importDefault(require("fs/promises"));
var url_1 = require("url");
var search_1 = require("./ServerFunctions/search");
var hostname = '127.0.0.1';
var port = 3000;
var server = http_1.default.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body_1;
    return __generator(this, function (_a) {
        try {
            req.on("data", function (chunk) {
                if (chunk === undefined)
                    return;
                if (typeof chunk === "string")
                    chunk = Buffer.from(chunk);
                if (chunk.length >= 1000000)
                    throw new Error("データ容量が1MBを超えています。");
                console.info("received Data : " + body_1.join().length + " byte");
                body_1.push(Buffer.from(chunk));
            });
            req.on("end", function () {
                console.info("[" + new Date().toISOString() + "]: All transferred Body-Data has been completely received.");
                for (var _i = 0, body_2 = body_1; _i < body_2.length; _i++) {
                    var aBody = body_2[_i];
                    process(req, res, aBody.toString());
                }
            });
        }
        catch (e) {
            console.error(e);
            endWith500Error(res, e);
        }
        res.end();
        return [2 /*return*/];
    });
}); });
server.listen(port, hostname, function () {
    console.info("Server running at http://" + hostname + ":" + port + "/");
});
function process(req, res, body) {
    return __awaiter(this, void 0, void 0, function () {
        var url, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (req.url === undefined) {
                        throw new Error("URLが指定されていません。");
                    }
                    url = new url_1.URL(req.url, "http://" + req.headers.host);
                    _a = req.method;
                    switch (_a) {
                        case "GET": return [3 /*break*/, 1];
                        case "POST": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, sendDocument(req.url, res)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (url.pathname === "/recordDatabase/give")
                        res.write(search_1.search(body));
                    return [3 /*break*/, 5];
                case 4: return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function sendDocument(url, res) {
    return __awaiter(this, void 0, void 0, function () {
        var contents, ary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../" + url, 'utf-8')];
                case 1:
                    contents = _a.sent();
                    ary = url === null || url === void 0 ? void 0 : url.split(".");
                    if (ary === undefined)
                        throw new Error("拡張子が指定されていません。");
                    res.writeHead(200, { 'Content-Type': "text/" + ary[ary.length - 1] });
                    res.write(contents);
                    return [2 /*return*/];
            }
        });
    });
}
function endWith500Error(res, reason) {
    res.writeHead(500, { 'Content-Type': "text/plain" });
    res.write("internal error : " + reason);
}
