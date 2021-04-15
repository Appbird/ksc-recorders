import { PageStates } from "./interface/PageStates";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { TransitionAdministrator } from "./administers/TransitionAdminister";
import { StateAdministrator, StateAdministerReadOnly } from "./administers/StateAdminister";
import { APIAdministrator } from "./administers/APICaller";
import { IAppOnlyUsedToTransition, IAppUsedToReadOptionsAndTransition } from "./interface/AppInterfaces";
import { HistoryAdministrator } from "./administers/HistoryAdministrator";
import { APIFunctions } from "../type/api/relation";
import { HeaderController } from "./administers/HeaderController";


export default class App implements IAppOnlyUsedToTransition,IAppUsedToReadOptionsAndTransition{
    private _state:StateAdministrator;
    private transitionAd: TransitionAdministrator;
    private historyAd:HistoryAdministrator;
    private header:HeaderController = new HeaderController();
    private apiCaller:APIAdministrator = new APIAdministrator();

    constructor(articleDOM:HTMLElement,language:LanguageInApplication){
        this._state = new StateAdministrator(language);
        this.historyAd = new HistoryAdministrator(this)
        this.transitionAd = new TransitionAdministrator(articleDOM,this,this._state);
    }
    async transition<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory:boolean = true){
        if (ifAppendHistory) this.historyAd.appendHistory()
        try { this.transitionAd.transition(nextState,requestObject) }
        catch(error) { this.errorCatcher(error,"ページの遷移に失敗しました。") }
        this._state.setState(nextState,requestObject);
    }
    get state():StateAdministerReadOnly{
        return this._state
    }
    changeHeader(str:string,sub:string){
        return this.header.changeHeaderRightLeft(str,sub);    
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
