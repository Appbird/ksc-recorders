import { PageStates, RequiredObjectType } from "./view/state/PageStates";
import { LanguageInApplication, LanguageList } from "../type/LanguageInApplication";
import { TransitionAdministrator } from "./Administrator/TransitionAdminister";
import { StateAdministrator, StateAdministerReadOnly } from "./Administrator/StateAdminister";
import { APIAdministrator } from "./Administrator/APICaller";
import { HistoryAdministrator } from "./Administrator/HistoryAdministrator";
import { APIFunctions } from "../type/api/relation";
import { HeaderController } from "./Administrator/HeaderController";
import { IGameSystemInfoWithoutCollections } from "../type/list/IGameSystemInfo";
import { IGameModeItemWithoutCollections } from "../type/list/IGameModeItem";
import { LoginAdministrator, LoginAdministratorReadOnly } from "./Administrator/LoginAdministrator";
import { IAppUsedToChangeState } from "./interface/AppInterfaces";
import firebase from "firebase/app";
import {PageNotificationAdministrator} from "./Administrator/PageNotificationAdministrator"
export default class App implements IAppUsedToChangeState{
    private _state:StateAdministrator;
    private loginAd:LoginAdministrator | null = null;
    private transitionAd: TransitionAdministrator;
    private historyAd:HistoryAdministrator;
    private header:HeaderController = new HeaderController();
    private apiCaller:APIAdministrator = new APIAdministrator();
    private _notie:PageNotificationAdministrator;

    public readonly version:string = "0.10"
    constructor(articleDOM:HTMLElement,language:LanguageInApplication){
        this._state = new StateAdministrator(language);
        this._notie = new PageNotificationAdministrator(this);
        this.historyAd = new HistoryAdministrator(this);
        this.transitionAd = new TransitionAdministrator(articleDOM,this,this._state);
        this.header.deleteUserIcon();
        document.getElementById("header")?.addEventListener("click",() => {
            this.transition("mainMenu",null)
        })
    }
    async init(){
        try{
            const response = await fetch('/__/firebase/init.json');
            const settingLanguage = this.historyAd.getLanguageSettings()
            if (settingLanguage !== null && LanguageList.includes(settingLanguage)) this._state.setLanguage(settingLanguage as LanguageInApplication)
            if (response.status !== 200) {console.log("Failed"); return;}
            firebase.initializeApp(await response.json());

            this.loginAd = new LoginAdministrator(this);
            this.loginAd.onStateChange(async () => {
                try{
                    if (this.loginAd?.isUserLogin) {
                        await this.loginAd?.subscribe();
                        this.header.changeUserIcon(this.loginAd.loginUserName,this.loginAd.loginUserIconPicture,this.state.language)
                    }
                    else this.header.deleteUserIcon();
                    this.goPrevious();
                }catch(err){this.errorCatcher(err)}
            })
            this.loginAd.setChangedEventListener( () => {
                if (this.loginAd === null) return;
                this.header.changeUserIcon(this.loginAd.loginUserName,this.loginAd.loginUserIconPicture,this.state.language)
            })
        }catch(err){
            this.errorCatcher(err);
        }
        
    }
    private goPrevious(){
        const previousPage = this.historyAd.getPreviousPageData()
        
        const previousTargetGamemode = this.historyAd.getPreviousTargetGamemode();
        if (previousTargetGamemode !== null && previousTargetGamemode.gameSystem !== null && previousTargetGamemode.gameMode !== null){
            this.changeTargetGameMode(previousTargetGamemode);
            (async () => {
                const gameSystem = (await this.accessToAPI("list_gameSystem",{id:previousTargetGamemode.gameSystem.id})).result
                const gameMode = (await this.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:previousTargetGamemode.gameSystem.id },id:previousTargetGamemode.gameMode.id})).result
                console.info(`[KSSRs] KSSRs detected you had set the targetGamemode ${previousTargetGamemode.gameSystem.English} / ${previousTargetGamemode.gameMode.English}, so KSSRs set that again.`)
                this.changeTargetGameMode({gameSystem,gameMode})
            })()
            
        }
        if (previousPage === "redirect") return;
        if (previousPage === null) {this.transition("mainMenu",null); return;}
        console.info(`[KSSRs] KSSRs detected you had visited ${previousPage.pageState} page most recently, so KSSRs takes you to that page.`)
        this.transition(previousPage.pageState,previousPage.requiredObject)

        
    }
    async login(){
        if (this.loginAd === null) throw new Error("firebaseが初期化されていません。")
        try{
            await this.loginAd.login();
        }catch(error){
            this.errorCatcher(error);
        }
    }
    async logout(){
        if (this.loginAd === null) throw new Error("firebaseが初期化されていません。")
        try{
            await this.loginAd.logout();
        }catch(error){
            this.errorCatcher(error);
        }
        this.header.deleteUserIcon();
        this.transition("mainMenu",null);
    }
    get loginAdministratorReadOnly():LoginAdministratorReadOnly{
        if (this.loginAd === null) throw new Error("firebaseが初期化されていません。")
        return this.loginAd;
    }
    async transition<T extends keyof PageStates>(nextState:T, requestObject:RequiredObjectType<PageStates[T]>,{ifAppendHistory=true,title=""}:{ifAppendHistory?:boolean,title?:string} = {}){
        this.goToTop();
        if (ifAppendHistory) this.historyAd.appendHistory()
        
        try { 
            await this.transitionAd.transition(nextState,requestObject,{title:title})
            if (ifAppendHistory) this.historyAd.registerCurrentPage();
        } catch(error) {
            this.errorCatcher(error,"ページの遷移に失敗しました。")
        }
    }
    get state():StateAdministerReadOnly{
        return this._state
    }
    setLanguage(lang:LanguageInApplication){
        this.historyAd.setLanguageSettings(lang)
        this._state.setLanguage(lang);
    }
    changeTargetGameMode(gameSystemEnv:{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}|null){
        
        if (gameSystemEnv === null){
            this._state.setGameSystemEnv({gameMode:null,gameSystem:null})
            document.title = "Kirby-Speed/Score-Recorders"
            this.historyAd.registerCurrentTargetGamemode()
          return this.header.changeHeaderRightLeft("Kirby-Speed/Score-Recorders","KSSRs");
        }
        if (this.state.gameSystemEnvDisplayed.gameSystem?.id === gameSystemEnv.gameSystem.id && this.state.gameSystemEnvDisplayed.gameMode?.id === gameSystemEnv.gameMode.id) return;
        document.title = `KSSRs - ${gameSystemEnv.gameSystem.English}/${gameSystemEnv.gameMode.English}`
        this._state.setGameSystemEnv(gameSystemEnv)
        this.historyAd.registerCurrentTargetGamemode()
        return this.header.changeHeaderRightLeft(gameSystemEnv.gameSystem.English,gameSystemEnv.gameMode.English);    
    }
    accessToAPI<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]): Promise<APIFunctions[T]["atClient"]>{
        return this.apiCaller.access<T>(functionName,requiredObj)
    }
    errorCatcher(error:any,title:string = "エラーが発生しました。"){
        if (!(error instanceof Error)){ console.error(`予期せぬエラーです。 : ${error}`); return; }
        this.historyAd.removePreviousPageData();
        this.historyAd.removeTargetGamemode();
        const errorInString = error.message;
        console.error(`${errorInString}\n${error.stack}`);
        this.transition("errorView",{title:title,message:errorInString},{ifAppendHistory:false});
    }
    get notie(){
        return this._notie;

    }
    checkIfIntroductionIsOver(){
        return this.historyAd.checkIfIntroductionIsOver()
    }
    acceptTheTerms(){
        this.historyAd.clearIntroduction()
    }
    goToTop(){
        var scrolled = ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
        window.scrollTo( 0, Math.floor( scrolled / 1.5 ) );
        if ( scrolled > 2 ) { window.setTimeout( ()=>this.goToTop(), 30 );}
    }
    
}