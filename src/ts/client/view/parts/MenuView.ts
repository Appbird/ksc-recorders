import { HTMLConverter } from "../../../utility/ViewUtility";
import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { choiceString } from "../../../utility/aboutLang";
import { IView } from "../IView";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { MultiLanguageStringWithICon } from "../../../type/foundation/MultiLanguageStringWithICon";

export type RequiredObjectToGenerateItem = {
    title:MultiLanguageStringWithICon,
    remarks?:MultiLanguageStringWithICon,
    description:MultiLanguageString,
    isDisabled:boolean,
    biggerTitle:boolean,
    to?:()=>void
}
export class MenuView implements IView {
    private container: HTMLElement;
    private htmlConverter: HTMLConverter;
    private mainMenu: HTMLElement;
    private language:LanguageInApplication
    constructor(container: HTMLElement, language: LanguageInApplication, title: MultiLanguageString) {
        this.htmlConverter = new HTMLConverter(language);
        this.mainMenu = container.appendChild(this.htmlConverter.elementWithoutEscaping`
                <div class="c-list u-width90per">
                    <div class="c-title">
                        <div class="c-title__main">${title}</div>
                        <div class="c-title__sub">menu</div>
                    </div>
                    <hr noshade class="u-thin">
                    
                </div>
            ` as HTMLElement);
        this.container = container;
        this.language = language;
    }
    destroy(): void {
        this.container.innerHTML = "";
    }
    generateMenuItem({ title, remarks, description, to, isDisabled, biggerTitle }: RequiredObjectToGenerateItem) {
        const item = this.htmlConverter.elementWithoutEscaping`
            <div class="c-recordCard ${(isDisabled) ? "is-disable" : ""}">
                    <div class = "c-title">
                        <div class = "c-title__main ${biggerTitle ? "" : "u-smallerChara"}"><i class="c-icooon u-background--${title.icon}"></i>${title}</div>
                        ${(remarks === undefined) ? `` : `<div class = "c-title__sub"><i class="c-icooon u-background--${remarks.icon}"></i> ${choiceString(remarks, this.language)}</div>`}
                    </div>
                    <hr noshade class="u-thin">
                    <div class = "u-width95per">${description}</div>
            </div>` as HTMLElement;
            
        this.mainMenu.appendChild(item);
        if (isDisabled || to === undefined)
            return item;
        item.addEventListener("click", () => to());
    }
}
