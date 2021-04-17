"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieWidgetCreator = void 0;
var ViewUtility_1 = require("../../../utility/ViewUtility");
var MovieWidgetCreator = /** @class */ (function () {
    function MovieWidgetCreator(href) {
        this.url = new URL(href);
        this.param = this.url.searchParams;
        this.kind = this.returnKind(this.url.hostname);
        this.id = this.returnId(this.url.pathname);
    }
    MovieWidgetCreator.prototype.returnKind = function (hostname) {
        switch (hostname) {
            case "youtu.be": return "youtube";
            case "twitter.com": return "twitter";
            default: throw new Error("対応していない記録URLです。(MovieWidgetView)");
        }
    };
    MovieWidgetCreator.prototype.returnId = function (pathname) {
        switch (this.kind) {
            case "youtube": return pathname.split("/")[1];
            case "twitter": return pathname.split("/")[3];
        }
    };
    MovieWidgetCreator.prototype.setWidget = function (insertedHTMLElement) {
        switch (this.kind) {
            case "twitter":
                twttr.widgets.createTweet(this.id, insertedHTMLElement);
                break;
            case "youtube":
                //#NOTE ここをレスポンシブにできないか…？
                insertedHTMLElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                <iframe id=\"ytplayer\" type=\"text/html\" width=\"800px\" height=\"600px\"\n                src=\"https://www.youtube.com/embed/", "?start=", "\"\n                frameborder=\"0\"></iframe>\n                "], ["\n                <iframe id=\"ytplayer\" type=\"text/html\" width=\"800px\" height=\"600px\"\n                src=\"https://www.youtube.com/embed/", "?start=", "\"\n                frameborder=\"0\"></iframe>\n                "])), this.id, this.param.get("t")));
                break;
        }
    };
    return MovieWidgetCreator;
}());
exports.MovieWidgetCreator = MovieWidgetCreator;
var templateObject_1;
