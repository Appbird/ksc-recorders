"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputObjectWithErrorPossibility = void 0;
function checkInputObjectWithErrorPossibility(actual, expectedStructure, checkedPlace) {
    for (var _i = 0, _a = Object.entries(expectedStructure); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (!actual.hasOwnProperty(key))
            throw new Error("\u30AD\u30FC" + key + "\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u5834\u6240 : " + checkedPlace);
        if (typeof actual[key] === "object" && typeof value !== "string")
            checkInputObjectWithErrorPossibility(actual[key], value, checkedPlace + " / " + key);
        else if (typeof actual[key] !== value)
            throw new Error("\u30AD\u30FC" + key + "\u306B\u5BFE\u5FDC\u3059\u308B\u5024\u306E\u578B\u306F" + value + "\u3067\u3042\u308B\u3068\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u5B9F\u969B\u306B\u306F" + typeof actual[key] + "\u3067\u3057\u305F\u3002\u5834\u6240 : " + checkedPlace);
    }
}
exports.checkInputObjectWithErrorPossibility = checkInputObjectWithErrorPossibility;
