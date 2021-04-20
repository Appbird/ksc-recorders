"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.S_SpinnerExhibition = void 0;
var PageStateClass_1 = require("./PageStateClass");
var S_SpinnerExhibition = /** @class */ (function (_super) {
    __extends(S_SpinnerExhibition, _super);
    function S_SpinnerExhibition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    S_SpinnerExhibition.prototype.init = function () {
        this.generateLoadingSpinner("");
        this.generateLoadingSpinner("--shortcake");
    };
    return S_SpinnerExhibition;
}(PageStateClass_1.PageStateBaseClass));
exports.S_SpinnerExhibition = S_SpinnerExhibition;
