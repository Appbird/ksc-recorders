"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputObjectWithErrorPossibility = void 0;
function checkInputObjectWithErrorPossibility(actual, expectedStructure, checkedPlace) {
    var e_1, _a, e_2, _b;
    if (actual === undefined)
        throw new Error("\u4E0E\u3048\u3089\u308C\u305F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8" + checkedPlace + "\u306Fundefined\u3067\u3057\u305F\u3002");
    if (Array.isArray(expectedStructure)) {
        if (!Array.isArray(actual))
            throw Error("\u4E0E\u3048\u3089\u308C\u305F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8" + checkedPlace + "\u306F\u914D\u5217\u3067\u3042\u308B\u3068\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u914D\u5217\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        try {
            for (var actual_1 = __values(actual), actual_1_1 = actual_1.next(); !actual_1_1.done; actual_1_1 = actual_1.next()) {
                var element = actual_1_1.value;
                checkInputObjectWithErrorPossibility(element, expectedStructure[0], "" + checkedPlace);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (actual_1_1 && !actual_1_1.done && (_a = actual_1.return)) _a.call(actual_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    try {
        for (var _c = __values(Object.entries(expectedStructure)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), propertyName = _e[0], expectedSubStructure = _e[1];
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
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
        }
        finally { if (e_2) throw e_2.error; }
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
