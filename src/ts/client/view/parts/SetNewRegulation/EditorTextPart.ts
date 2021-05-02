import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { TextInputCapsuled } from "../TextInputCapsuled";

export class EditorTextPart {
    private container: HTMLElement;
    private textInput: TextInputCapsuled;
    private htmlCon: HTMLConverter;
    constructor(container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString,
        defaultValue?:string
    ) {
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h2>${title}</h2>
        `);
        this.textInput = new TextInputCapsuled(this.container.appendChild(document.createElement("div")), { defaultValue: (defaultValue === undefined) ? "":defaultValue ,chara:"u-biggerChara"});
    }
    addChangeEventListener(callback: (changed: string) => void) {
        this.textInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string {
        return this.textInput.value;
    }
    refresh(value: string) {
        this.textInput.value = value;
    }
    isFill(): boolean {
        return this.textInput.value.length === 0;
    }
}
