"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordDetailView = void 0;
var timeUtility_1 = require("../../../utility/timeUtility");
var ViewUtility_1 = require("../../../utility/ViewUtility");
var TagsView_1 = require("./TagsView");
var rankUtility_1 = require("../../../utility/rankUtility");
var MovieWidgetCreator_1 = require("./MovieWidgetCreator");
var marked = require("marked");
var RecordDetailView = /** @class */ (function () {
    /**
     * @param rankOfTheRecord 0を指定すると順位表記を消すことが出来る。
     */
    function RecordDetailView(recordDetail, app, rankOfTheRecord) {
        this._htmlElement = document.createElement("div");
        this.app = app;
        this.adjustViewAccordingToRecord(recordDetail, rankOfTheRecord);
    }
    Object.defineProperty(RecordDetailView.prototype, "htmlElement", {
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    RecordDetailView.prototype.adjustViewAccordingToRecord = function (recordDetail, rankOfTheRecord) {
        var recordDetailElement = this._htmlElement.appendChild(ViewUtility_1.elementWithoutEscaping(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <div class=\"recordDetail\">\n\n                    <div class=\"c-title\">\n                        <div class=\"c-title__main\">\u8A18\u9332\u306E\u57FA\u672C\u60C5\u5831</div>\n                    </div>\n\n                <hr noshade class=\"u-bold\">\n\n                <div class=\"u-width95per standardInfo\">\n\n                    <div class = \"c-evidenceMovie evidenceMovie\">\n                    </div>\n                    <div class=\"c-title\">\n                        <div class=\"c-title__sub u-underline\"><i class=\"fas fa-link\"></i> <a href=\"", "\">", "</a> </div>\n                    </div>\n                    \n                    <div class=\"c-title\">\n                        <div class=\"c-title__main u-biggerChara\">", "</div>\n                        <div class=\"c-title__sub u-biggerChara onClickFirer_RunnerName\">", ": <i class=\"fas fa-user\"></i>", "</div>\n                    </div>\n                    <hr noshade class=\"u-thin\">\n                    <div class=\"tagsDetail\"></div>\n\n                </div>\n\n\n                <div class=\"u-space3em\"></div>\n\n\n                <div class=\"c-title\">\n                    <div class=\"c-title__main\">\u8D70\u8005\u30CE\u30FC\u30C8</div>\n                </div>\n\n                <hr noshade class=\"u-bold\">\n\n                <div class=\"u-width95per\">\n                    <div class=\"c-runnerNote\">\n                        ", "\n                    </div>\n                    <div class=\"u-space3em\"></div>\n                </div>\n\n            </div>\n            "], ["\n            <div class=\"recordDetail\">\n\n                    <div class=\"c-title\">\n                        <div class=\"c-title__main\">\u8A18\u9332\u306E\u57FA\u672C\u60C5\u5831</div>\n                    </div>\n\n                <hr noshade class=\"u-bold\">\n\n                <div class=\"u-width95per standardInfo\">\n\n                    <div class = \"c-evidenceMovie evidenceMovie\">\n                    </div>\n                    <div class=\"c-title\">\n                        <div class=\"c-title__sub u-underline\"><i class=\"fas fa-link\"></i> <a href=\"", "\">", "</a> </div>\n                    </div>\n                    \n                    <div class=\"c-title\">\n                        <div class=\"c-title__main u-biggerChara\">", "</div>\n                        <div class=\"c-title__sub u-biggerChara onClickFirer_RunnerName\">", ": <i class=\"fas fa-user\"></i>", "</div>\n                    </div>\n                    <hr noshade class=\"u-thin\">\n                    <div class=\"tagsDetail\"></div>\n\n                </div>\n\n\n                <div class=\"u-space3em\"></div>\n\n\n                <div class=\"c-title\">\n                    <div class=\"c-title__main\">\u8D70\u8005\u30CE\u30FC\u30C8</div>\n                </div>\n\n                <hr noshade class=\"u-bold\">\n\n                <div class=\"u-width95per\">\n                    <div class=\"c-runnerNote\">\n                        ", "\n                    </div>\n                    <div class=\"u-space3em\"></div>\n                </div>\n\n            </div>\n            "])), recordDetail.link[0], recordDetail.link[0], timeUtility_1.converseMiliSecondsIntoTime(recordDetail.score), (rankOfTheRecord === 0) ? "" : rankUtility_1.convertNumberToRank(rankOfTheRecord), recordDetail.runnerName, marked(recordDetail.note)));
        //#TODO クリックすると走者ページに飛ぶようにしたい
        var standardInfoDiv = recordDetailElement.getElementsByClassName("standardInfo")[0];
        if (standardInfoDiv === undefined)
            throw new Error("予期せぬエラーです。");
        var evidenceMovieDiv = recordDetailElement.getElementsByClassName("evidenceMovie")[0];
        if (evidenceMovieDiv === undefined)
            throw new Error("予期せぬエラーです。");
        new MovieWidgetCreator_1.MovieWidgetCreator(recordDetail.link[0]).setWidget(evidenceMovieDiv);
        TagsView_1.TagsView.generateTagViewsForRecord(this.app, standardInfoDiv, recordDetail, { gameSystemTags: true, targetTags: true, abilityTags: true, hashTags: true });
        return this;
    };
    return RecordDetailView;
}());
exports.RecordDetailView = RecordDetailView;
var templateObject_1;
