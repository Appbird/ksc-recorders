import {checkInputObjectWithErrorPossibility, TypeValue} from "./InputCheckerUtility";

describe("要素相等かを型レベルで確認する。", () => {
    it("一層のオブジェクトの構造確認", () => {
        checkFunctionWithTimer(
            {"key1":"str1","key2":2,"key3":false},
            {"key1":"string","key2":"number","key3":"boolean"},`object`
        )
    });
    it("多層のオブジェクトの構造確認", () => {
        checkFunctionWithTimer(
            {"key1":"str1","key2":{ "key2-1" : "str2-1", "key2-2" : false }},
            {"key1":"string","key2":{ "key2-1" : "string", "key2-2" : "boolean"}},`object`
        )
    })
    it("配列型の構造確認　(プリミティブオブジェクトの反復)", () => {
        checkFunctionWithTimer(
            {"key1":["str1","str1"],"key2":[0,1,2]},
            {"key1":"string[]","key2":"number[]"},`object`
        )
    })
    it("配列型の構造確認 (オブジェクトの反復)", () => {
        checkFunctionWithTimer(
            {"key1":[{"key1-1":0},{"key1-1":0}]},
            {"key1":[{"key1-1":"number"}]},`object`
        )
    })
    it("配列型の構造確認 (主要オブジェクトの反復)", () => {
        checkFunctionWithTimer(
            [{"key1":0},{"key1":0}],
            [{"key1":"number"}],`object`
        )
    })
    it("文字列リテラル型の構造確認", () => {
        checkFunctionWithTimer(
            {"key1":"str1","key2":[0,1,2]},
            {"key1":`"str1" | "str2"`,"key2":"number[]"},`object`
        )
    })
    it("オブジェクトの構造が適当でないときエラーを発する。(プロパティの不足)", () => {
        checkFunctionWithTimer(
                {"key2":{ "key2-1" : "str2-1"}},
                {"key2":{ "key2-1" : "string", "key2-2" : "boolean"}},`object`
            )
    })
    it("オブジェクトの構造が適当でないときエラーを発する。(文字列リテラル型の相異)", () => {
        checkFunctionWithTimer(
            {"key1":"str3","key2":"str"},
            {"key1":`"str1" | "str2"`,"key2":"string"},`object`
        )
    })
    it("オブジェクトの構造が適当でないときエラーを発する。(配列型の相異)", () => {
        checkFunctionWithTimer(
            {"key1":[0,1,2]},
            {"key1":`string[]`},`object`
        )
    })
    it("オブジェクトの構造が適当でないときエラーを発する。(配列型において型が統一されていない場合)", () => {
        checkFunctionWithTimer(
            {"key1":[1,"str",2]},
            {"key1":`number[]`},`object`
        )
    })
    it("オブジェクトの構造が適当でないときエラーを発する。(型の相異)", () => {
        checkFunctionWithTimer(
                {"key1":"str1","key2":{ "key2-1" : "str2-1", "key2-2" : false }},
                {"key1":"string","key2":{ "key2-1" : "number", "key2-2" : "boolean"}},`object`
            )
    })
})

function checkFunctionWithTimer(actual:any,expected:TypeValue|TypeValue[],checkedPlace:string){
    const start = Date.now();
    checkInputObjectWithErrorPossibility(
        actual,
        expected,checkedPlace
    )
    console.info(`It takes ${Date.now() - start} ms.`)
}