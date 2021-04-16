import { PageStates } from "../interface/PageStates";
import {  IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
export class HistoryAdministrator{
    private app:IAppUsedToReadOptionsAndTransition;
    private transitionPile:TransitionItem<keyof PageStates>[] = [];
    constructor(app:IAppUsedToReadOptionsAndTransition){
        this.app = app;
        window.addEventListener('popstate', (e) => {
            this.back();
        });
    }
    async appendHistory(){
        history.pushState(null,`Kirby-Speed/ScoreRecorders:${this.app.state.state}`,`/app?state=${this.app.state.state}`)
        this.transitionPile.push({
            pageState:this.app.state.state,
            requiredObject:this.app.state.requiredObj
        })
    }
    back(){
        const past = this.transitionPile.pop();
        if (past === undefined) return;
        this.app.transition(past.pageState,past.requiredObject,false)
    }

}
export interface TransitionItem<T extends keyof PageStates>{
    pageState:T
    requiredObject:PageStates[T]
}