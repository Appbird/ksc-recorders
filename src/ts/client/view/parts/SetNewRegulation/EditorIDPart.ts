import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { SelectChoicesCapsuled } from "../SelectChoicesCapsuled";


export class EditorIDPart {
    private container: HTMLElement;
    private selectInput: SelectChoicesCapsuled<ITargetItem>;
    private htmlCon: HTMLConverter;
    constructor(container: HTMLElement,
        language: LanguageInApplication,
        title: string|MultiLanguageString
    ) {
        this.container = container;
        this.htmlCon = new HTMLConverter(language);
        this.container.appendChild(this.htmlCon.elementWithoutEscaping`
            <h1>${title}</h1>
        `);
        this.selectInput = new SelectChoicesCapsuled(this.container.appendChild(document.createElement("select")), [], { language: language });
    }
    addChangeEventListener(callback: (changed: string[]) => void) {
        this.selectInput.addEventListener("change", () => callback(this.value));
    }
    get value(): string[] {
        return this.selectInput.getValueAsArray();
    }
    refresh(value: string[], options: IItemOfResolveTableToName[]) {
        this.selectInput.clearStore();
        this.selectInput.setChoices(options);
        this.selectInput.setSelected(value);
    }
    isFill(): boolean {
        return this.selectInput.getValueAsArray().length === 0;
    }

}
