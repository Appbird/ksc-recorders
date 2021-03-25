"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerOfTableForResolvingID = void 0;
/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
var ControllerOfTableForResolvingID = /** @class */ (function () {
    function ControllerOfTableForResolvingID(database) {
        this.dataBase = database;
    }
    ControllerOfTableForResolvingID.prototype.resolveID = function (id, table, lang, descriptionOfPlace) {
        if (descriptionOfPlace === void 0) { descriptionOfPlace = ""; }
        var item = table.find(function (element) { return element.id === id; });
        if (item === undefined)
            throw new Error(descriptionOfPlace + "\u30C6\u30FC\u30D6\u30EB\u306B\u304A\u3044\u3066\u3001id" + id + "\u306B\u5BFE\u5FDC\u3059\u308B\u30C7\u30FC\u30BF\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
        switch (lang) {
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    };
    ControllerOfTableForResolvingID.prototype.resolveGameSystemID = function (id, lang) {
        return this.resolveID(id, this.dataBase.runnersList, lang, "GameSystem");
    };
    ControllerOfTableForResolvingID.prototype.findProperGameSystemInfo = function (gameSystemID) {
        var result = this.dataBase.getGameSystemInfo(gameSystemID);
        return result;
    };
    ControllerOfTableForResolvingID.prototype.resolveAbilityID = function (gameSystemID, id, lang) {
        return this.resolveID(id, this.findProperGameSystemInfo(gameSystemID).list.AbilityList, lang, "Ability");
    };
    ControllerOfTableForResolvingID.prototype.resolveTargetID = function (gameSystemID, id, lang) {
        return this.resolveID(id, this.findProperGameSystemInfo(gameSystemID).list.TargetList, lang, "Target");
    };
    ControllerOfTableForResolvingID.prototype.resolveGameDifficultyID = function (gameSystemID, id, lang) {
        return this.resolveID(id, this.findProperGameSystemInfo(gameSystemID).list.GameDifficultyList, lang, "GameDifficulty");
    };
    ControllerOfTableForResolvingID.prototype.resolveGameModeID = function (gameSystemID, id, lang) {
        return this.resolveID(id, this.findProperGameSystemInfo(gameSystemID).list.GameModeList, lang, "GameMode");
    };
    ControllerOfTableForResolvingID.prototype.resolveRunnerID = function (id, lang) {
        return this.resolveID(id, this.dataBase.runnersList, lang, "runnersTable");
    };
    return ControllerOfTableForResolvingID;
}());
exports.ControllerOfTableForResolvingID = ControllerOfTableForResolvingID;
