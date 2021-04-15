import { PageStates } from "../interface/PageStates";
import { LanguageInApplication } from "../../type/LanguageInApplication";
import { IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { IGameModeItem, IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";

type GameSystemEnvDisplayed = { gameSystem: IGameSystemInfoWithoutCollections; gameMode: IGameModeItemWithoutCollections; } | { gameSystem: null; gameMode: null; } | { gameSystem: IGameSystemInfoWithoutCollections; gameMode: null; };
type GameSystemEnvDisplayedReadOnly = { readonly gameSystem: IGameSystemInfoWithoutCollections; readonly gameMode: IGameModeItemWithoutCollections; } | { readonly gameSystem: null; readonly gameMode: null; } | { readonly gameSystem: IGameSystemInfoWithoutCollections; readonly gameMode: null; };

export interface StateAdministerReadOnly {
    readonly state: keyof PageStates;
    readonly requiredObj: PageStates[keyof PageStates];
    readonly gameSystemEnvDisplayed: GameSystemEnvDisplayedReadOnly;
    readonly superiorScore: "LowerFirst" | "HigherFirst";
    readonly language: LanguageInApplication;
}

export class StateAdministrator implements StateAdministerReadOnly {
    private _state: keyof PageStates = "none";
    private _requiredObj: PageStates[keyof PageStates] = undefined;
    private _gameSystemEnvDisplayed: GameSystemEnvDisplayed = {
        gameSystem: null, gameMode: null
    };
    private _superiorScore: "LowerFirst" | "HigherFirst" = "LowerFirst";
    private _language: LanguageInApplication;
    constructor(language:LanguageInApplication = "Japanese"){
        this._language = language;
    }
    setState<T extends keyof PageStates>(state: T, requiredObj: PageStates[T]) {
        this._state = state;
        this._requiredObj = requiredObj;
    }
    setGameSystemEnv({ gameSystem, gameMode }: GameSystemEnvDisplayed) {
        this._gameSystemEnvDisplayed.gameSystem = gameSystem;
        this._gameSystemEnvDisplayed.gameMode = gameMode;
    }
    setSuperiorScore(superirorScore: "LowerFirst" | "HigherFirst") { this._superiorScore = superirorScore; }
    setLanguage(language: LanguageInApplication) { this._language = language; }
    get state() { return this._state; }
    get requiredObj() { return this._requiredObj; }
    get gameSystemEnvDisplayed(): GameSystemEnvDisplayedReadOnly { return this._gameSystemEnvDisplayed; }
    get superiorScore() { return this._superiorScore; }
    get language() { return this._language; }
}
