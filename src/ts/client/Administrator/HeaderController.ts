import { MultiLanguageString } from "../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../type/LanguageInApplication";
import { choiceString } from "../../utility/aboutLang";
import {checkIsNull} from "../../utility/undefinedChecker"
export class HeaderController{
    private element:Element;
    private main:Element;
    private sub:Element;
    private icon:HTMLImageElement;
    private logInState:HTMLElement;
    constructor(){
        this.element = checkIsNull(document.getElementById("headerDisplay"),`id="headerDisplay"となる要素がありませんでした。`)
        this.main = checkIsNull(this.element.firstElementChild,`id="headerDisplay"となる要素の子要素がありませんでした。`);
        this.sub = checkIsNull(this.element.lastElementChild,`id="headerDisplay"となる要素の子要素がありませんでした。`);

        const logIn = checkIsNull(document.getElementById("userIcon"),`id=userIconとなる要素がありませんでした。`)
        this.icon = checkIsNull(logIn.lastElementChild,`id=userIconとなる要素の子要素がありませんでした。`) as HTMLImageElement;
        this.logInState = checkIsNull(logIn.firstElementChild,`id=userIconとなる要素の子要素がありませんでした。`) as HTMLImageElement;
    }
    changeUserIcon(userName:string|MultiLanguageString,href:string|null|undefined,lang:LanguageInApplication){
        if (href === null || href===undefined){
            this.icon.src = "./icon/icooonMono/person.svg"; return;
        }
        this.logInState.innerHTML = `Log in<br><strong>${choiceString(userName,lang)}</strong>`
        this.icon.src = href;
    }
    deleteUserIcon(){
        this.logInState.innerText = `Log out`
        this.icon.src = "./icon/IcooonMono/person.svg";
    }
    async changeHeaderRightLeft(str:string,sub:string){
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),500));
        this.element.classList.remove("is-onRight")
        this.element.classList.add("is-onLeft")
        await new Promise((resolve) => setTimeout(()=>resolve(undefined),100));
        this.element.classList.remove("is-onLeft")
        this.main.innerHTML = str; this.sub.innerHTML = sub;
        this.element.classList.add("is-onMiddle");
        
    }
}