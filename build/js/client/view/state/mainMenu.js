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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S_MainMenu = void 0;
var ViewUtility_1 = require("../../../utility/ViewUtility");
var PageStateClass_1 = require("./PageStateClass");
var S_MainMenu = /** @class */ (function (_super) {
    __extends(S_MainMenu, _super);
    function S_MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    S_MainMenu.prototype.init = function () {
        //#TODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
        if (this.requiredObj === null)
            return;
        this.app.changeTargetGameMode(this.requiredObj);
        this.articleDOM.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div class=\"u-width90per\"><h1>\u30E1\u30A4\u30F3\u30DA\u30FC\u30B8</h1></div>"], ["<div class=\"u-width90per\"><h1>\u30E1\u30A4\u30F3\u30DA\u30FC\u30B8</h1></div>"]))));
    };
    return S_MainMenu;
}(PageStateClass_1.PageStateBaseClass));
exports.S_MainMenu = S_MainMenu;
var templateObject_1;
