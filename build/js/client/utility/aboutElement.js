"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIcooonHTML = exports.findElementByClassNameWithErrorPossibility = exports.writeElement = exports.createElementWithIdTagClass = exports.createElementWithIdAndClass = void 0;
function createElementWithIdAndClass(idAndClass) {
    if (idAndClass === void 0) { idAndClass = {}; }
    var element = document.createElement("div");
    if (idAndClass.className !== undefined)
        element.className = idAndClass.className;
    if (idAndClass.id !== undefined)
        element.id = idAndClass.id;
    return element;
}
exports.createElementWithIdAndClass = createElementWithIdAndClass;
function createElementWithIdTagClass(idAndClass, tag) {
    if (idAndClass === void 0) { idAndClass = {}; }
    var element = document.createElement(tag);
    if (idAndClass.className !== undefined)
        element.className = idAndClass.className;
    if (idAndClass.id !== undefined)
        element.id = idAndClass.id;
    return element;
}
exports.createElementWithIdTagClass = createElementWithIdTagClass;
/** valueがundefinedであるとき、空文字列を渡す。 */
function writeElement(value, tag) {
    return (value === undefined) ? "" : "<" + tag + ">" + value + "</" + tag + ">";
}
exports.writeElement = writeElement;
function findElementByClassNameWithErrorPossibility(findPlace, className) {
    var place = findPlace.getElementsByClassName(className);
    if (place[0] === undefined)
        throw new Error("\u8981\u7D20" + className + "\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
    return place[0];
}
exports.findElementByClassNameWithErrorPossibility = findElementByClassNameWithErrorPossibility;
function generateIcooonHTML(info) {
    return "<i class=\"c-icooon u-background--" + ((info.icooonName === undefined) ? "star" : info.icooonName) + "\"></i>";
}
exports.generateIcooonHTML = generateIcooonHTML;
