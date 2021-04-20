import { PageStates, RequiredObjectType } from "../view/state/PageStates";
import { LanguageInApplication } from "../../type/LanguageInApplication";
import { IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { IGameModeItemWithoutCollections, ScoreType } from "../../type/list/IGameModeItem";

type GameSystemEnvDisplayed = { gameSystem: IGameSystemInfoWithoutCollections; gameMode: IGameModeItemWithoutCollections; } | { gameSystem: null; gameMode: null; } | { gameSystem: IGameSystemInfoWithoutCollections; gameMode: null; };
type GameSystemEnvDisplayedReadOnly = { readonly gameSystem: IGameSystemInfoWithoutCollections; readonly gameMode: IGameModeItemWithoutCollections; } | { readonly gameSystem: null; readonly gameMode: null; } | { readonly gameSystem: IGameSystemInfoWithoutCollections; readonly gameMode: null; };
export type TargetGameMode = { gameSystem: IGameSystemInfoWithoutCollections; gameMode: IGameModeItemWithoutCollections; };
export interface StateAdministerReadOnly {
    readonly state: keyof PageStates;
    readonly requiredObj: RequiredObjectType<PageStates[keyof PageStates]>;
    readonly gameSystemEnvDisplayed: GameSystemEnvDisplayedReadOnly;
    readonly superiorScore: "LowerFirst" | "HigherFirst";
    readonly language: LanguageInApplication;
    readonly gameSystemIDDisplayed:string;
    readonly gameModeIDDisplayed:string;
    readonly scoreType:ScoreType
}

export class StateAdministrator implements StateAdministerReadOnly {
    private _state: keyof PageStates = "none";
    private _requiredObj: RequiredObjectType<PageStates[keyof PageStates]> = null;
    private _gameSystemEnvDisplayed: GameSystemEnvDisplayed = {
        gameSystem: null, gameMode: null
    };
    private _superiorScore: "LowerFirst" | "HigherFirst" = "LowerFirst";
    private _language: LanguageInApplication;
    constructor(language:LanguageInApplication = "Japanese"){
        this._language = language;
    }
    setState<T extends keyof PageStates>(state: T, requiredObj: RequiredObjectType<PageStates[T]>) {
        this._state = state;
        this._requiredObj = requiredObj;
    }
    setGameSystemEnv({ gameSystem, gameMode }: GameSystemEnvDisplayed) {
        this._gameSystemEnvDisplayed.gameSystem = gameSystem;
        this._gameSystemEnvDisplayed.gameMode = gameMode;
    }
    setLanguage(language: LanguageInApplication) { this._language = language; }
    get state() { return this._state; }
    get requiredObj() { return this._requiredObj; }
    get gameSystemEnvDisplayed(): GameSystemEnvDisplayedReadOnly { return this._gameSystemEnvDisplayed; }
    get language() { return this._language; }
    get superiorScore():"LowerFirst" | "HigherFirst" { 
       switch(this.scoreType){
           case "score": return "HigherFirst";
           case "time" : return "LowerFirst";
       }
    }
    static checkGameSystemEnvIsSet(gameSystemEnvDisplayed:GameSystemEnvDisplayedReadOnly):gameSystemEnvDisplayed is { readonly gameSystem: IGameSystemInfoWithoutCollections; readonly gameMode: IGameModeItemWithoutCollections; }{
       return !(gameSystemEnvDisplayed.gameSystem === null || gameSystemEnvDisplayed.gameMode === null);
    }
    /**現在ページ中で閲覧対象としているゲームシステム(ターゲットゲームモード)のIDを返します。  
     * @throws ターゲットゲームシステムが設定されていないとき例外を投げる。*/
    get gameSystemIDDisplayed(){
        if (this._gameSystemEnvDisplayed.gameSystem === null) throw new Error("閲覧ターゲットとなるゲームタイトルが設定されていません。")
        return this._gameSystemEnvDisplayed.gameSystem.id;
    }
    /** 現在ページ中で閲覧対象としているゲームモード(ターゲットゲームモード)のIDを返します。  
     * @throws ターゲットゲームモードが設定されていないとき例外を投げる。*/
    get gameModeIDDisplayed(){
        if (this._gameSystemEnvDisplayed.gameMode === null) throw new Error("閲覧ターゲットとなるゲームモードが設定されていません。")
        return this._gameSystemEnvDisplayed.gameMode.id;
    }
    /** サーバーに保存されている記録の数値がスコアなのか撃破時間かを表す。
     *  @throws ゲームモードが設定されていないとき例外を投げる。*/
    get scoreType(){
        if (this._gameSystemEnvDisplayed.gameMode === null) throw new Error("閲覧ターゲットとなるゲームモードが設定されていません。")
        return this._gameSystemEnvDisplayed.gameMode.scoreType;
    }
}
