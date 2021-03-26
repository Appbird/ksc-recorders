"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputCheckerUtility_1 = require("./InputCheckerUtility");
describe("要素相等かを型レベルで確認する。", function () {
    it("一層のオブジェクトの構造確認", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": 2, "key3": false }, { "key1": "string", "key2": "number", "key3": "boolean" }, "object");
    });
    it("多層のオブジェクトの構造確認", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": { "key2-1": "str2-1", "key2-2": false } }, { "key1": "string", "key2": { "key2-1": "string", "key2-2": "boolean" } }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(プロパティの不足)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": { "key2-1": "str2-1" } }, { "key1": "string", "key2": { "key2-1": "string", "key2-2": "boolean" } }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(型の相異)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": { "key2-1": "str2-1", "key2-2": false } }, { "key1": "string", "key2": { "key2-1": "number", "key2-2": "boolean" } }, "object");
    });
});
