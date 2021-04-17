"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageStateBaseClass = void 0;
var PageStateBaseClass = /** @class */ (function () {
    function PageStateBaseClass(app, articleDOM, requiredObj) {
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
        this.init();
    }
    Object.defineProperty(PageStateBaseClass.prototype, "requiredObject", {
        get: function () {
            return this.requiredObj;
        },
        enumerable: false,
        configurable: true
    });
    return PageStateBaseClass;
}());
exports.PageStateBaseClass = PageStateBaseClass;
