import { pageStates, PageStates, RequiredObjectType } from "../view/state/PageStates";
import App from "../App";
import { StateAdministrator } from "./StateAdminister";
import { elementWithoutEscaping } from "../../utility/ViewUtility";


export class TransitionAdministrator {
    private app:App;
    private articleDOM: HTMLElement;
    private state:StateAdministrator;
    constructor(articleDOM: HTMLElement, app:App,state:StateAdministrator) {
        this.state = state;
        this.app = app;
        this.articleDOM = articleDOM;
        
    }
    private clearView() {
        this.articleDOM.innerHTML = "";
    }
    async transition<T extends keyof PageStates>(nextState: T, requestObject:RequiredObjectType<PageStates[T]>,{title=""}:{title?:string}={}) {
        
        if (title !== "")this.articleDOM.appendChild(elementWithoutEscaping`
        <div class="c-title">
            <div class="c-title__main">${title}</div>
        </div>`)
        this.articleDOM.classList.add("is-seqStart")
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),400));

        this.clearView();
        if (pageStates[nextState] === undefined) throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
        const pageState = new pageStates[nextState](this.app,this.articleDOM,requestObject);
        await pageState.init();
        this.state.setState(nextState,pageState.requiredObject)

        this.articleDOM.classList.add("is-seqEnd")
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),300));
        this.articleDOM.classList.remove("is-seqStart","is-seqEnd")

    }
}
