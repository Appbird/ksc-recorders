import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { IRunner } from "../../../type/record/IRunner";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { StateInfoView } from "./StateInfoView";

export class UserInformationBoard implements IView {
    private runnerInfo: IRunner;
    private htmlC: HTMLConverter;
    private container: HTMLElement;
    constructor(container: HTMLElement, language: LanguageInApplication, runnerInfo: IRunner) {
        this.htmlC = new HTMLConverter(language);
        this.runnerInfo = runnerInfo;
        this.container = container;
        this.container.appendChild(this.htmlC.elementWithoutEscaping`
        <div class="u-width90per">
            <div class="c-title">
                <div class="c-title__main">${this.runnerInfo}</div>
                <div class="c-title__main"><img class="c-userIcon " src="${this.runnerInfo.photoURL}"></img></div>
            </div>
        </div>
    `) as HTMLElement;
    const stateInfo = new StateInfoView(this.container.appendChild(createElementWithIdAndClass({ className: "u-left-aligined-forFlex u-marginLeftRight05emToChildren" })))
        .appendInfo(`${this.runnerInfo.theNumberOfPost} Records`, "list")
        .appendInfo(`Latest Post : ${this.runnerInfo.theDateOfLastPost === 0 ? "----" : (new Date(this.runnerInfo.theDateOfLastPost).toLocaleString())}`, "history");
    
    const linkInfo = new StateInfoView(this.container.appendChild(createElementWithIdAndClass({ className: "u-left-aligined-forFlex u-marginLeftRight05emToChildren" })))
    
    if (/https\:\/\/twitter\.com\/[a-zA-Z\-]+/.test(this.runnerInfo.twitterLink))
        linkInfo.appendInfo(this.runnerInfo.twitterLink, "twitter");
    if (/https\:\/\/www\.youtube\.com\/channel\/[a-zA-Z\-]+/.test(this.runnerInfo.youtubeLink))
        linkInfo.appendInfo(this.runnerInfo.youtubeLink, "youtube");
    this.container.appendChild(this.htmlC.elementWithoutEscaping`<hr noshade class="u-bold">`);

    this.container.appendChild(this.htmlC.elementWithoutEscaping`<p class="u-width90per">${{ Japanese: this.runnerInfo.JDescription, English: this.runnerInfo.EDescription }}</p>`);

    }
    destroy() {
        this.container.parentElement?.removeChild(this.container);
    }
}
