"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModeCardsGroup = void 0;
var ViewUtility_1 = require("../../utility/ViewUtility");
var aboutElement_1 = require("../utility/aboutElement");
var timeUtility_1 = require("../../utility/timeUtility");
var aboutLang_1 = require("../../utility/aboutLang");
var GameModeCardsGroup = /** @class */ (function () {
    function GameModeCardsGroup(gameSystemInfo, info, app) {
        var e_1, _a;
        this.element = aboutElement_1.createElementWithIdAndClass({ className: "c-list u-width90per" });
        this.gameSystemInfo = gameSystemInfo;
        this.app = app;
        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                <div id=\"articleTitle\">\n                    <div class=\"c-title\">\n                            <div class=\"c-title__main\"><i class=\"fas fa-star\"></i>", "</div>\n                            <div class=\"c-title__sub\">select the item of game mode where records you're looking for was set.</div>\n                    </div>\n                    <hr noshade class=\"u-bold\">\n                </div>\n        "], ["\n                <div id=\"articleTitle\">\n                    <div class=\"c-title\">\n                            <div class=\"c-title__main\"><i class=\"fas fa-star\"></i>", "</div>\n                            <div class=\"c-title__sub\">select the item of game mode where records you're looking for was set.</div>\n                    </div>\n                    <hr noshade class=\"u-bold\">\n                </div>\n        "])), aboutLang_1.selectAppropriateName(gameSystemInfo, this.app.state.language)));
        try {
            for (var info_1 = __values(info), info_1_1 = info_1.next(); !info_1_1.done; info_1_1 = info_1.next()) {
                var ele = info_1_1.value;
                this.appendCard(ele);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (info_1_1 && !info_1_1.done && (_a = info_1.return)) _a.call(info_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    GameModeCardsGroup.prototype.appendCard = function (info) {
        var _this = this;
        var card = this.element.appendChild(ViewUtility_1.elementWithoutEscaping(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            <div class=\"c-list__item\">\n                <div class = \"c-title\">\n                    <div class = \"c-title__main u-smallerChara\"><i class=\"far fa-star\"></i> ", "</div>\n                </div>\n                ", "\n                \n                <div class=\"c-stateInfo u-left-aligined-forFlex\">\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-list\"></i> ", " Records</div>\n                    </div>\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-running\"></i> ", " Runners</div>\n                    </div>\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-history\"></i> ", " </div>\n                    </div>\n                </div>\n            </div>"], ["\n            <div class=\"c-list__item\">\n                <div class = \"c-title\">\n                    <div class = \"c-title__main u-smallerChara\"><i class=\"far fa-star\"></i> ", "</div>\n                </div>\n                ", "\n                \n                <div class=\"c-stateInfo u-left-aligined-forFlex\">\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-list\"></i> ", " Records</div>\n                    </div>\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-running\"></i> ", " Runners</div>\n                    </div>\n                    <div class = \"c-stateInfo__unit\">\n                        <div class =\"c-iconWithDescription\"> <i class=\"fas fa-history\"></i> ", " </div>\n                    </div>\n                </div>\n            </div>"])), aboutLang_1.selectAppropriateName(info, this.app.state.language), aboutElement_1.writeElement(aboutLang_1.selectAppropriateDescription(info, this.app.state.language), "p"), info.recordsNumber, info.runnersNumber, timeUtility_1.convertNumberIntoDateString(info.dateOfLatestPost)));
        card.addEventListener("click", function () { return _this.app.transition("mainMenu", { gameSystem: _this.gameSystemInfo, gameMode: info }); });
    };
    Object.defineProperty(GameModeCardsGroup.prototype, "htmlElement", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    return GameModeCardsGroup;
}());
exports.GameModeCardsGroup = GameModeCardsGroup;
var templateObject_1, templateObject_2;
