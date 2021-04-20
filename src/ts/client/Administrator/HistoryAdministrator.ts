import { PageStates, RequiredObjectType } from "../view/state/PageStates";
import {  IAppUsedToReadAndChangeOnlyPageState } from "../interface/AppInterfaces";
export class HistoryAdministrator{
    private app:IAppUsedToReadAndChangeOnlyPageState;
    private transitionPile:TransitionItem<keyof PageStates>[] = [];
    constructor(app:IAppUsedToReadAndChangeOnlyPageState){
        this.app = app;
        window.addEventListener('popstate', (e) => {
            this.back();
        });
    }
    async appendHistory(){
        console.log("a");
        history.pushState(null,`Kirby-Speed/ScoreRecorders:${this.app.state.state}`,`/app?state=${this.app.state.state}`)
        this.transitionPile.push({
            pageState:this.app.state.state,
            requiredObject:this.app.state.requiredObj
        })
    }
    back(){
        const past = this.transitionPile.pop();
        if (past === undefined) return;
        this.app.transition(past.pageState,past.requiredObject,{ifAppendHistory:false})
    }

}
export interface TransitionItem<T extends keyof PageStates>{
    pageState:T
    requiredObject:RequiredObjectType<PageStates[T]>
}