import { PageStates, RequiredObjectType } from "./view/state/PageStates";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { TransitionAdministrator } from "./Administrator/TransitionAdminister";
import { StateAdministrator, StateAdministerReadOnly } from "./Administrator/StateAdminister";
import { APIAdministrator } from "./Administrator/APICaller";
import { HistoryAdministrator } from "./Administrator/HistoryAdministrator";
import { APIFunctions } from "../type/api/relation";
import { HeaderController } from "./Administrator/HeaderController";
import { IGameSystemInfoWithoutCollections } from "../type/list/IGameSystemInfo";
import { IGameModeItemWithoutCollections } from "../type/list/IGameModeItem";
import { LoginAdministrator } from "./Administrator/LoginAdministrator";


export default class App {
    private _state:StateAdministrator;
    private loginAd:LoginAdministrator;
    private transitionAd: TransitionAdministrator;
    private historyAd:HistoryAdministrator;
    private header:HeaderController = new HeaderController();
    private apiCaller:APIAdministrator = new APIAdministrator();

    constructor(articleDOM:HTMLElement,language:LanguageInApplication,){
        this._state = new StateAdministrator(language);
        this.historyAd = new HistoryAdministrator(this)
        this.transitionAd = new TransitionAdministrator(articleDOM,this,this._state);
        const header = document.getElementById("header");
        if (header === null) return;
        header.addEventListener("click",() => {
            this.transition("mainMenu",null)
        })
    }
    async transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>,{ifAppendHistory=true,title=""}:{ifAppendHistory?:boolean,title?:string} = {}){
        if (ifAppendHistory) this.historyAd.appendHistory()
        try { 
            await this.transitionAd.transition(nextState,requestObject,{title:title})
        } catch(error) {
            this.errorCatcher(error,"ページの遷移に失敗しました。")
        }
    }
    get state():StateAdministerReadOnly{
        return this._state
    }
    setLanguage(lang:LanguageInApplication){
        this._state.setLanguage(lang);
    }
    changeTargetGameMode(gameSystemEnv:{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}){
        if (this.state.gameSystemEnvDisplayed.gameSystem?.id === gameSystemEnv.gameSystem.id && this.state.gameSystemEnvDisplayed.gameMode?.id === gameSystemEnv.gameMode.id) return;
        this._state.setGameSystemEnv(gameSystemEnv)
        return this.header.changeHeaderRightLeft(gameSystemEnv.gameSystem.EName,gameSystemEnv.gameMode.EName);    
    }
    accessToAPI<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]): Promise<APIFunctions[T]["atClient"]>{
        return this.apiCaller.access<T>(functionName,requiredObj)
    }
    errorCatcher(error:any,title:string = "エラーが発生しました。"){
        if (!(error instanceof Error)){ console.error(`予期せぬエラーです。 : ${error}`); return; }
        const errorInString = error.message;
        console.error(`${errorInString}\n${error.stack}`);
        this.transitionAd.transition("errorView",{title:title,message:errorInString});
    }
    
}
