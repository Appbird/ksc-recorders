"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeElement = exports.createElementWithIdAndClass = void 0;
function createElementWithIdAndClass(idAndClass) {
    var element = document.createElement("div");
    if (idAndClass.className !== undefined)
        element.className = idAndClass.className;
    if (idAndClass.id !== undefined)
        element.id = idAndClass.id;
    return element;
}
exports.createElementWithIdAndClass = createElementWithIdAndClass;
/** valueがundefinedであるとき、空文字列を渡す。 */
function writeElement(value, tag) {
    return (value === undefined) ? "" : "<" + tag + ">" + value + "</" + tag + ">";
}
exports.writeElement = writeElement;
