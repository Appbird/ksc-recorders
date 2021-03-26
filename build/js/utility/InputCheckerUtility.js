"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputObjectWithErrorPossibility = void 0;
function checkInputObjectWithErrorPossibility(actual, expectedStructure, checkedPlace) {
    for (var _i = 0, _a = Object.entries(expectedStructure); _i < _a.length; _i++) {
        var _b = _a[_i], propertyName = _b[0], expectedTypeName = _b[1];
        if (!actual.hasOwnProperty(propertyName))
            throw new Error("\u30AD\u30FC" + propertyName + "\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u5834\u6240 : " + checkedPlace);
        if (typeof actual[propertyName] === "object" && typeof expectedTypeName !== "string") {
            checkInputObjectWithErrorPossibility(actual[propertyName], expectedTypeName, checkedPlace + " / " + propertyName);
            continue;
        }
        if (typeof expectedTypeName === "string" && !checkType(actual[propertyName], expectedTypeName)) {
            throw new Error("\u30AD\u30FC" + propertyName + "\u306B\u5BFE\u5FDC\u3059\u308B\u5024\u306E\u578B\u306F" + expectedTypeName + "\u3067\u3042\u308B\u3068\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u5B9F\u969B\u306B\u306F" + actual[propertyName] + "(" + (Array.isArray(actual[propertyName]) ? "Array" : (typeof actual[propertyName])) + "\u578B)\u3067\u3057\u305F\u3002\u5834\u6240 : " + checkedPlace);
        }
    }
    return true;
}
exports.checkInputObjectWithErrorPossibility = checkInputObjectWithErrorPossibility;
function checkType(actualValue, expectedTypeName) {
    expectedTypeName = expectedTypeName.replace(/\s/g, "");
    if (expectedTypeName.endsWith("[]")) {
        if (!Array.isArray(actualValue))
            return false;
        expectedTypeName = expectedTypeName.replace("[]", "");
        return actualValue.every(function (element) { return typeof element === expectedTypeName; });
    }
    else if ((/^(\"[^\"\|]+\"(\|\"[^\|\"]+\")*)$/).test(expectedTypeName)) {
        //#NOTE "abc"|"def"|"ghi"|...|"zh"みたいな感じの文字列であればここの処理を通る。
        if (typeof actualValue !== "string")
            return false;
        var expectedStrings = expectedTypeName.replace(/\"/g, "").split("|");
        return checkString(actualValue, expectedStrings);
    }
    else if (typeof actualValue === expectedTypeName) {
        return true;
    }
    else {
        return false;
    }
}
function checkString(actual, expectedStrings) {
    return expectedStrings.some(function (expectedString) { return expectedString === actual; });
}
