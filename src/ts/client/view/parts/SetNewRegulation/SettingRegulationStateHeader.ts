import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { choiceString } from "../../../../utility/aboutLang";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { appendElement, createElementWithIdAndClass } from "../../../utility/aboutElement";
import { IView } from "../../IView";
import { TitleCupsuled } from "../TitleCupsuled";

export class SettingRegulationStateHeader implements IView {
    private container: HTMLElement;
    private title:TitleCupsuled;
    private items: Map<string, HTMLElement> = new Map<string, HTMLDivElement>();
    private language:LanguageInApplication
    constructor(container: HTMLElement, language: LanguageInApplication, {mainTitle,subTitle}:{mainTitle: string | MultiLanguageString,subTitle: string | MultiLanguageString},
        items: {
            id: string;
            title: string | MultiLanguageString;
            unused: boolean
            description: string | MultiLanguageString;
            onClickCallBack: () => void;
        }[]) {
        this.container = container;
        this.language = language
        const htmlConverter = new HTMLConverter(language);
        this.title = new TitleCupsuled(appendElement(this.container,"div"));
        this.title.refresh(choiceString(mainTitle,language),choiceString(subTitle,language));
        const menu = this.container.appendChild(appendElement(this.container,"div"));
        const list = menu.appendChild(createElementWithIdAndClass({ className: "c-list" }));
        for (const item of items) {
            const element = list.appendChild(htmlConverter.elementWithoutEscaping`
                                <div class="c-list__item ${item.unused ? "u-unused":""}">
                                    <div class="u-width90per">
                                        <h2>${item.title}</h2>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                            ` as HTMLElement);
            element.addEventListener("click", () => item.onClickCallBack());
            this.items.set(item.id, element);
        }

    }
    changeTitle({mainTitle,subTitle}:{mainTitle: string | MultiLanguageString,subTitle: string | MultiLanguageString}){
        this.title.refresh(choiceString(mainTitle,this.language),choiceString(subTitle,this.language));
    }
    destroy(): void {
        this.container.innerHTML = "";
    }
    get(id: string) {
        const element = this.items.get(id);
        if (element === undefined)
            throw new Error(`[SettingRegulationStateHeader] IDが ${id} である要素が登録されていません。`);
        return element;
    }
}
