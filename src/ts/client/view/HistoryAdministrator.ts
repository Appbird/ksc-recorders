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
        if (0 < this.transitionPile.length) history.pushState(null,`Kirby-Speed/ScoreRecorders:${this.app.nowState}`,`/app?state=${this.app.nowState}`)
    }
    back(){
        const past = this.transitionPile.pop();
        if (past === undefined) return;
        this.app.transition(past.pageState,past.requiredObject,false)
    }

}
type PageState<T> = T extends TransitionItem<infer U> ? U:never 

export interface TransitionItem<T extends keyof PageStates>{
    pageState:T
    requiredObject:PageStates["detailView"]
}