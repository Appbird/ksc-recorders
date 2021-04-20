"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputCapsuled = void 0;
var TextInputCapsuled = /** @class */ (function () {
    function TextInputCapsuled(insertedElement, placeHolder, errorViewer, chara) {
        this.errorElement = errorViewer;
        this.errorElement.classList.add("u-unused");
        this.element = document.createElement("input");
        this.element.setAttribute("type", "text");
        this.element.classList.add("c-textInput", "u-underline");
        this.element.placeholder = placeHolder;
        if (chara !== undefined)
            this.element.classList.add(chara);
        insertedElement.appendChild(this.element);
    }
    TextInputCapsuled.prototype.addEventListener = function (eventType, callback) {
        this.element.addEventListener(eventType, callback);
    };
    TextInputCapsuled.prototype.setError = function (error) {
        if (error === "")
            this.errorElement.classList.add("u-unused");
        else
            this.errorElement.classList.remove("u-unused");
        this.errorElement.innerHTML = error;
    };
    Object.defineProperty(TextInputCapsuled.prototype, "value", {
        get: function () {
            return this.element.value;
        },
        set: function (value) {
            this.element.value = value;
        },
        enumerable: false,
        configurable: true
    });
    return TextInputCapsuled;
}());
exports.TextInputCapsuled = TextInputCapsuled;
