"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateAdministrator = void 0;
var StateAdministrator = /** @class */ (function () {
    function StateAdministrator(language) {
        if (language === void 0) { language = "Japanese"; }
        this._state = "none";
        this._requiredObj = null;
        this._gameSystemEnvDisplayed = {
            gameSystem: null, gameMode: null
        };
        this._superiorScore = "LowerFirst";
        this._language = language;
    }
    StateAdministrator.prototype.setState = function (state, requiredObj) {
        this._state = state;
        this._requiredObj = requiredObj;
    };
    StateAdministrator.prototype.setGameSystemEnv = function (_a) {
        var gameSystem = _a.gameSystem, gameMode = _a.gameMode;
        this._gameSystemEnvDisplayed.gameSystem = gameSystem;
        this._gameSystemEnvDisplayed.gameMode = gameMode;
    };
    StateAdministrator.prototype.setLanguage = function (language) { this._language = language; };
    Object.defineProperty(StateAdministrator.prototype, "state", {
        get: function () { return this._state; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "requiredObj", {
        get: function () { return this._requiredObj; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "gameSystemEnvDisplayed", {
        get: function () { return this._gameSystemEnvDisplayed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "language", {
        get: function () { return this._language; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "superiorScore", {
        get: function () {
            switch (this.scoreType) {
                case "score": return "HigherFirst";
                case "time": return "LowerFirst";
            }
        },
        enumerable: false,
        configurable: true
    });
    StateAdministrator.checkGameSystemEnvIsSet = function (gameSystemEnvDisplayed) {
        return !(gameSystemEnvDisplayed.gameSystem === null || gameSystemEnvDisplayed.gameMode === null);
    };
    Object.defineProperty(StateAdministrator.prototype, "gameSystemIDDisplayed", {
        /**現在ページ中で閲覧対象としているゲームシステム(ターゲットゲームモード)のIDを返します。
         * @throws ターゲットゲームシステムが設定されていないとき例外を投げる。*/
        get: function () {
            if (this._gameSystemEnvDisplayed.gameSystem === null)
                throw new Error("閲覧ターゲットとなるゲームタイトルが設定されていません。");
            return this._gameSystemEnvDisplayed.gameSystem.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "gameModeIDDisplayed", {
        /** 現在ページ中で閲覧対象としているゲームモード(ターゲットゲームモード)のIDを返します。
         * @throws ターゲットゲームモードが設定されていないとき例外を投げる。*/
        get: function () {
            if (this._gameSystemEnvDisplayed.gameMode === null)
                throw new Error("閲覧ターゲットとなるゲームモードが設定されていません。");
            return this._gameSystemEnvDisplayed.gameMode.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateAdministrator.prototype, "scoreType", {
        /** サーバーに保存されている記録の数値がスコアなのか撃破時間かを表す。
         *  @throws ゲームモードが設定されていないとき例外を投げる。*/
        get: function () {
            if (this._gameSystemEnvDisplayed.gameMode === null)
                throw new Error("閲覧ターゲットとなるゲームモードが設定されていません。");
            return this._gameSystemEnvDisplayed.gameMode.scoreType;
        },
        enumerable: false,
        configurable: true
    });
    return StateAdministrator;
}());
exports.StateAdministrator = StateAdministrator;
