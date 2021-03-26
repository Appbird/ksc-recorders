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
    it("配列型の構造確認", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": ["str1", "str1"], "key2": [0, 1, 2] }, { "key1": "string[]", "key2": "number[]" }, "object");
    });
    it("文字列リテラル型の構造確認", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": [0, 1, 2] }, { "key1": "\"str1\" | \"str2\"", "key2": "number[]" }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(プロパティの不足)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key2": { "key2-1": "str2-1" } }, { "key2": { "key2-1": "string", "key2-2": "boolean" } }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(文字列リテラル型の相異)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str3", "key2": "str" }, { "key1": "\"str1\" | \"str2\"", "key2": "string" }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(配列型の相異)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": [0, 1, 2] }, { "key1": "string[]" }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(配列型の相異)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": [1, "str", 2] }, { "key1": "number[]" }, "object");
    });
    it("オブジェクトの構造が適当でないときエラーを発する。(型の相異)", function () {
        InputCheckerUtility_1.checkInputObjectWithErrorPossibility({ "key1": "str1", "key2": { "key2-1": "str2-1", "key2-2": false } }, { "key1": "string", "key2": { "key2-1": "number", "key2-2": "boolean" } }, "object");
    });
});
