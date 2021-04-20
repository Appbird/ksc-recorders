"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextChoicesCapsuled = void 0;
var choices_js_1 = __importDefault(require("choices.js"));
var TextChoicesCapsuled = /** @class */ (function () {
    function TextChoicesCapsuled(insertedElement) {
        this.html = insertedElement;
        this.choices = new choices_js_1.default(insertedElement, {
            maxItemCount: 10,
            removeItemButton: true,
            duplicateItemsAllowed: false
        });
    }
    Object.defineProperty(TextChoicesCapsuled.prototype, "valueAsArray", {
        get: function () {
            var value = this.choices.getValue(true);
            if (!Array.isArray(value))
                return [value];
            return value;
        },
        enumerable: false,
        configurable: true
    });
    return TextChoicesCapsuled;
}());
exports.TextChoicesCapsuled = TextChoicesCapsuled;
