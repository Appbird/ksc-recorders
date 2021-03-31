"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputObjectWithErrorPossibility = void 0;
function checkInputObjectWithErrorPossibility(actual, expectedStructure, checkedPlace) {
    if (actual === undefined)
        throw new Error("\u4E0E\u3048\u3089\u308C\u305F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8" + checkedPlace + "\u306Fundefined\u3067\u3057\u305F\u3002");
    if (Array.isArray(expectedStructure)) {
        if (!Array.isArray(actual))
            throw Error("\u4E0E\u3048\u3089\u308C\u305F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8" + checkedPlace + "\u306F\u914D\u5217\u3067\u3042\u308B\u3068\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u914D\u5217\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        for (var _i = 0, actual_1 = actual; _i < actual_1.length; _i++) {
            var element = actual_1[_i];
            checkInputObjectWithErrorPossibility(element, expectedStructure[0], "" + checkedPlace);
        }
    }
    for (var _a = 0, _b = Object.entries(expectedStructure); _a < _b.length; _a++) {
        var _c = _b[_a], propertyName = _c[0], expectedSubStructure = _c[1];
        if (!actual.hasOwnProperty(propertyName))
            throw new Error("\u30AD\u30FC" + propertyName + "\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u5834\u6240 : " + checkedPlace);
        if (typeof actual[propertyName] === "object" && typeof expectedSubStructure !== "string") {
            checkInputObjectWithErrorPossibility(actual[propertyName], expectedSubStructure, checkedPlace + " / " + propertyName);
            continue;
        }
        if (typeof expectedSubStructure === "string" && !checkType(actual[propertyName], expectedSubStructure)) {
            throw new Error("\u30AD\u30FC" + propertyName + "\u306B\u5BFE\u5FDC\u3059\u308B\u5024\u306E\u578B\u306F" + expectedSubStructure + "\u3067\u3042\u308B\u3068\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u5B9F\u969B\u306B\u306F" + actual[propertyName] + "(" + (Array.isArray(actual[propertyName]) ? "Array" : (typeof actual[propertyName])) + "\u578B)\u3067\u3057\u305F\u3002\u5834\u6240 : " + checkedPlace);
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
