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
exports.S_MainMenu = void 0;
var PageStateClass_1 = require("./PageStateClass");
var S_MainMenu = /** @class */ (function (_super) {
    __extends(S_MainMenu, _super);
    function S_MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    S_MainMenu.prototype.init = function () {
        if (this.requiredObj === null)
            return;
        this.app.changeTargetGameMode(this.requiredObj);
    };
    return S_MainMenu;
}(PageStateClass_1.PageStateBaseClass));
exports.S_MainMenu = S_MainMenu;
