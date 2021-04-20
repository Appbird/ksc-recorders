"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordCardView = void 0;
var timeUtility_1 = require("../../../utility/timeUtility");
var ViewUtility_1 = require("../../../utility/ViewUtility");
var TagsView_1 = require("./TagsView");
var RecordCardView = /** @class */ (function () {
    function RecordCardView(app, record, option) {
        var _this = this;
        this.app = app;
        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい
        this.ele = ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                <div class = \"c-recordCard u-width95per\">\n                    <div class = \"c-title --withUnderline\">\n                        <div class = \"c-title__main\">", "</div>\n                        <div class=\"c-iconWithDescription\">\n                            <i class=\"fas fa-user\"></i>", "\n                        </div>\n                    </div>\n                ", "\n                </div>"], ["\n                <div class = \"c-recordCard u-width95per\">\n                    <div class = \"c-title --withUnderline\">\n                        <div class = \"c-title__main\">",
            "</div>\n                        <div class=\"c-iconWithDescription\">\n                            <i class=\"fas fa-user\"></i>", "\n                        </div>\n                    </div>\n                ", "\n                </div>"
            //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        ])), (function () {
            switch (_this.app.state.scoreType) {
                case "time": return timeUtility_1.converseMiliSecondsIntoTime(record.score);
                case "score": return record.score;
            }
        })(), record.runnerName, (!option.displayTags.gameSystemTags && !option.displayTags.targetTags && option.displayTags.abilityTags) ? "" : "<hr noshade class=\"u-thin\">");
        //#CTODO カード要素をクリックすると記録詳細画面へ移る。
        if (!option.setClickListener)
            return;
        this.ele.addEventListener("click", function () {
            var rrg = record.regulation.gameSystemEnvironment;
            _this.app.transition("detailView", { gameSystemEnv: { gameSystemID: rrg.gameSystemID, gameModeID: rrg.gameModeID }, id: record.id, lang: _this.app.state.language });
        });
        TagsView_1.TagsView.generateTagViewsForRecord(this.app, this.ele, record, {
            abilityTags: option.displayTags.abilityTags,
            gameSystemTags: option.displayTags.gameSystemTags,
            targetTags: option.displayTags.targetTags,
            setClickListener: false
        });
    }
    Object.defineProperty(RecordCardView.prototype, "htmlElement", {
        get: function () {
            return this.ele;
        },
        enumerable: false,
        configurable: true
    });
    return RecordCardView;
}());
exports.RecordCardView = RecordCardView;
var templateObject_1;
