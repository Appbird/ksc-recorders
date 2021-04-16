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
exports.RecordGroupView = void 0;
var ViewUtility_1 = require("../../utility/ViewUtility");
var TagsView_1 = require("./TagsView");
var timeUtility_1 = require("../../utility/timeUtility");
var aboutElement_1 = require("../utility/aboutElement");
var StateInfoView_1 = require("./StateInfoView");
var RecordGroupView = /** @class */ (function () {
    function RecordGroupView(recordGroup, app, _a) {
        var e_1, _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.displayTags, displayTags = _d === void 0 ? { gameSystemTags: false, targetTags: false, abilityTags: true } : _d, _e = _c.setClickListener, setClickListener = _e === void 0 ? false : _e;
        this._htmlElement = aboutElement_1.createElementWithIdAndClass({ className: "c-recordCardsGroup" });
        this.summaryElement = aboutElement_1.createElementWithIdAndClass({ className: "__summary" });
        this.recordCardsElement = aboutElement_1.createElementWithIdAndClass({ className: "__recordCards" });
        this.app = app;
        this.option = { displayTags: displayTags, setClickListener: setClickListener };
        this._htmlElement.appendChild(this.summaryElement);
        this._htmlElement.appendChild(this.recordCardsElement);
        this.setRecordGroupSummary(recordGroup);
        if (recordGroup.records.length === 0)
            this.recordCardsElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div class=\"u-width95per\"><h2>\u8A18\u9332\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3067\u3057\u305F</h2></div>"], ["<div class=\"u-width95per\"><h2>\u8A18\u9332\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3067\u3057\u305F</h2></div>"]))));
        try {
            for (var _f = __values(recordGroup.records), _g = _f.next(); !_g.done; _g = _f.next()) {
                var record = _g.value;
                this.appendRecordCard(record);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Object.defineProperty(RecordGroupView.prototype, "htmlElement", {
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    RecordGroupView.prototype.setRecordGroupSummary = function (recordGroup) {
        this.summaryElement.innerHTML = "";
        var stateInfoDiv = this.summaryElement.appendChild(ViewUtility_1.elementWithoutEscaping(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        <div>\n            <div class = \"c-recordGroupHeader\">\n                <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n                ", "\n            </div>\n            <div class=\"stateInfo\"></div>\n            <hr noshade class=\"u-bold\">\n        </div>\n        "], ["\n        <div>\n            <div class = \"c-recordGroupHeader\">\n                <div class=\"c-title\">\n                <div class=\"c-title__main\">", "</div>\n                ", "\n            </div>\n            <div class=\"stateInfo\"></div>\n            <hr noshade class=\"u-bold\">\n        </div>\n        "])), recordGroup.groupName, (recordGroup.groupSubName === undefined) ? "" : "<div class=\"c-title__sub\">" + recordGroup.groupSubName + "</div>")).getElementsByClassName("stateInfo")[0];
        if (stateInfoDiv === undefined)
            throw new Error("予期しないエラーです。");
        stateInfoDiv.appendChild(new StateInfoView_1.StateInfoView()
            .appendInfo(recordGroup.numberOfRecords + " records", "list")
            .appendInfo(recordGroup.numberOfRunners + " runners", "running")
            .appendInfo(timeUtility_1.convertNumberIntoDateString(recordGroup.lastPost), "history")
            .htmlElement);
    };
    RecordGroupView.prototype.clearRecordCards = function () {
        this.recordCardsElement.innerHTML = "";
    };
    RecordGroupView.prototype.appendRecordCard = function (record) {
        var _this = this;
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        var ele = ViewUtility_1.element(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            <div class = \"c-recordCard u-width95per\">\n                <div class = \"c-title --withUnderline\">\n                    <div class = \"c-title__main\">", "</div>\n                    <div class=\"c-iconWithDescription\">\n                        <i class=\"fas fa-user\"></i>", "\n                    </div>\n                </div>\n            ", "\n            </div>"], ["\n            <div class = \"c-recordCard u-width95per\">\n                <div class = \"c-title --withUnderline\">\n                    <div class = \"c-title__main\">", "</div>\n                    <div class=\"c-iconWithDescription\">\n                        <i class=\"fas fa-user\"></i>", "\n                    </div>\n                </div>\n            ", "\n            </div>"
            //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        ])), timeUtility_1.converseMiliSecondsIntoTime(record.score), record.runnerName, (!this.option.displayTags.gameSystemTags && !this.option.displayTags.targetTags && this.option.displayTags.abilityTags) ? "" : "<hr noshade class=\"u-thin\">");
        //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        ele.addEventListener("click", function () {
            var rrg = record.regulation.gameSystemEnvironment;
            _this.app.transition("detailView", { gameSystemEnv: { gameSystemID: rrg.gameSystemID, gameModeID: rrg.gameModeID }, id: record.id, lang: _this.app.state.language });
        });
        TagsView_1.TagsView.generateTagViewsForRecord(this.app, ele, record, { abilityTags: true, setClickListener: false });
        this.recordCardsElement.appendChild(ele);
    };
    return RecordGroupView;
}());
exports.RecordGroupView = RecordGroupView;
var templateObject_1, templateObject_2, templateObject_3;
