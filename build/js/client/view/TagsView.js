"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsView = void 0;
var ViewUtility_1 = require("../../utility/ViewUtility");
var aboutElement_1 = require("../utility/aboutElement");
var TagsView = /** @class */ (function () {
    function TagsView(app, _a) {
        var _b = (_a === void 0 ? {} : _a).setClickEnventListener, setClickEnventListener = _b === void 0 ? true : _b;
        this.element = aboutElement_1.createElementWithIdAndClass({ className: "c-tags" });
        this.app = app;
        this.setClickEnventListener = setClickEnventListener;
    }
    TagsView.prototype.appendTag = function (tagName, kind, transitionInfo) {
        var _this = this;
        var ele = this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <div class = \"c-tag --", "\">\n                <div class=\"c-iconWithDescription\">\n                <i class=\"", "\"></i> ", "\n                </div>\n            </div>"], ["\n            <div class = \"c-tag --", "\">\n                <div class=\"c-iconWithDescription\">\n                <i class=\"", "\"></i> ", "\n                </div>\n            </div>"])), kind, this.convert(kind), tagName));
        if (this.setClickEnventListener)
            ele.addEventListener("click", function () {
                _this.app.transition(transitionInfo.to, transitionInfo.requiredObject);
            });
        return this;
    };
    TagsView.prototype.convert = function (kind) {
        switch (kind) {
            case "ability": return "far fa-star";
            case "target": return "far fa-flag";
            case "gameSystem": return "fas fa-star";
            case "hashTag": return "fas fa-hashtag";
        }
    };
    Object.defineProperty(TagsView.prototype, "htmlElement", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    TagsView.generateTagViewsForRecord = function (app, inserted, record, _a) {
        var _b = _a.gameSystemTags, gameSystemTags = _b === void 0 ? false : _b, _c = _a.targetTags, targetTags = _c === void 0 ? false : _c, _d = _a.abilityTags, abilityTags = _d === void 0 ? false : _d, _e = _a.hashTags, hashTags = _e === void 0 ? false : _e, _f = _a.setClickListener, setClickListener = _f === void 0 ? true : _f;
        var opt = { setClickEnventListener: setClickListener };
        var tagsViews = [new TagsView(app, opt), new TagsView(app, opt), new TagsView(app, opt)];
        var gameEnv = record.regulation.gameSystemEnvironment;
        var order = app.state.superiorScore;
        if (gameSystemTags)
            tagsViews[0].appendTag(gameEnv.gameSystemName + "/" + gameEnv.gameModeName + "/" + gameEnv.gameDifficultyName, "gameSystem", {
                to: "searchResultView",
                requiredObject: {
                    title: "\u96E3\u6613\u5EA6" + gameEnv.gameDifficultyName + "\u306E\u8A18\u9332",
                    required: { condition: [{
                                groupName: "", gameSystemEnv: { gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID: gameEnv.gameDifficultyID },
                                orderOfRecordArray: order, limitOfRecordArray: 3, language: app.state.language
                            }] }
                }
            });
        if (targetTags)
            tagsViews[0].appendTag(record.regulation.targetName, "target", {
                to: "searchResultView",
                requiredObject: {
                    title: "\u8A08\u6E2C\u5BFE\u8C61" + record.regulation.targetName + "\u306E\u8A18\u9332\u3002",
                    required: { condition: [{
                                groupName: "", gameSystemEnv: { gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID }, targetIDs: [record.regulation.targetName],
                                orderOfRecordArray: order, language: app.state.language
                            }] }
                }
            });
        if (abilityTags)
            record.regulation.abilityNames.forEach(function (ability, index) { return tagsViews[1].appendTag((ability === undefined ? "Not Found" : ability), "ability", {
                to: "searchResultView",
                requiredObject: {
                    title: "\u80FD\u529B" + record.regulation.targetName + "(\u30BD\u30ED)\u306B\u304A\u3051\u308B\u3001\u96E3\u6613\u5EA6" + gameEnv.gameDifficultyName + "\u306E\u8A18\u9332\u3002",
                    required: { condition: [{
                                groupName: "", gameSystemEnv: { gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID: gameEnv.gameDifficultyID }, abilityIDs: [record.regulation.abilityIDs[index]],
                                orderOfRecordArray: order, language: app.state.language
                            }] }
                }
            }); });
        if (hashTags && assureRecordIsFull(record))
            record.tagName.forEach(function (tag, index) { return tagsViews[1].appendTag((tag === undefined ? "Not Found" : tag), "hashTag", {
                to: "searchResultView",
                requiredObject: {
                    title: "\u30BF\u30B0" + tagsViews + "\u306B\u304A\u3051\u308B\u5168\u4F53\u306E\u8A18\u9332\u3002",
                    required: { condition: [{
                                groupName: "", gameSystemEnv: { gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID: "whole" }, tagIDs: [record.tagID[index]],
                                orderOfRecordArray: order, language: app.state.language
                            }] }
                }
            }); });
        if (gameSystemTags || targetTags)
            inserted.appendChild(tagsViews[0].htmlElement);
        if (abilityTags)
            inserted.appendChild(tagsViews[1].htmlElement);
        if (hashTags)
            inserted.appendChild(tagsViews[2].htmlElement);
    };
    return TagsView;
}());
exports.TagsView = TagsView;
function assureRecordIsFull(record) {
    return "tagID" in record;
}
var templateObject_1;
