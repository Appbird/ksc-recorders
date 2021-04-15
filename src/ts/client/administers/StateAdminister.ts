import { PageStates } from "../interface/PageStates";
import { LanguageInApplication } from "../../type/LanguageInApplication";

type GameSystemEnvDisplayed = { gameSystemID: string; gameModeID: string; } | { gameSystemID: null; gameModeID: null; } | { gameSystemID: string; gameModeID: null; };
type GameSystemEnvDisplayedReadOnly = { readonly gameSystemID: string; readonly gameModeID: string; } | { readonly gameSystemID: null; readonly gameModeID: null; } | { readonly gameSystemID: string; readonly gameModeID: null; };

export interface StateAdministerReadOnly {
    readonly state: keyof PageStates;
    readonly requiredObj: PageStates[keyof PageStates];
    readonly gameSystemEnvDisplayed: GameSystemEnvDisplayedReadOnly;
    readonly superiorScore: "LowerFirst" | "HigherFirst";
    readonly language: LanguageInApplication;
}

export class StateAdminister implements StateAdministerReadOnly {
    private _state: keyof PageStates = "none";
    private _requiredObj: PageStates[keyof PageStates] = undefined;
    private _gameSystemEnvDisplayed: GameSystemEnvDisplayed = {
        gameSystemID: null, gameModeID: null
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
    setGameSystemEnv({ gameSystemID, gameModeID }: GameSystemEnvDisplayed) {
        this._gameSystemEnvDisplayed.gameSystemID = gameSystemID;
        this._gameSystemEnvDisplayed.gameModeID = gameModeID;
    }
    setSuperiorScore(superirorScore: "LowerFirst" | "HigherFirst") { this._superiorScore = superirorScore; }
    setLanguage(language: LanguageInApplication) { this._language = language; }
    get state() { return this._state; }
    get requiredObj() { return this._requiredObj; }
    get gameSystemEnvDisplayed(): GameSystemEnvDisplayedReadOnly { return this._gameSystemEnvDisplayed; }
    get superiorScore() { return this._superiorScore; }
    get language() { return this._language; }
}
