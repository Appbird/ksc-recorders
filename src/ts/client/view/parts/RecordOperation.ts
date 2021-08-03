import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { createElementWithIdAndClass, createElementWithIdTagClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { Privilege } from "../state/DetailViewer";
const context = {
    header:{
        Japanese: "特殊操作 [権限:", English: "Special Operation [Privilege:"
    },
}
export class RecordOperation implements IView {
    private container: HTMLElement;
    private buttonsSegment: HTMLElement;
    private htmlC: HTMLConverter;
    private arrow:HTMLElement
    private errorCatcher: (err: any) => void;
    constructor(container: HTMLElement, language: LanguageInApplication,privilegeName:Privilege[], errorCatcher: (err: any) => void,
        buttonInfo: { text: MultiLanguageString; iconClass: string; color: string; callback: () => void; enable:boolean }[]
    ) {
        this.container = container;
        this.errorCatcher = errorCatcher;
        this.container.classList.add("c-operationSegment");
        this.htmlC = new HTMLConverter(language);
        
        const header = this.container.appendChild(createElementWithIdAndClass({ className: "__title" }));
        this.arrow = header.appendChild(createElementWithIdTagClass({className:"fas fa-angle-right"},"i"))
        header.appendChild(this.htmlC.elementWithoutEscaping`<p>${context.header} ${privilegeName.join(", ")} ]</p>`)
        header.addEventListener("click",()=>this.toggle())
        this.buttonsSegment = this.container.appendChild(createElementWithIdAndClass({ className: "c-operationButtons u-unused" }));


        for (const operation of buttonInfo) if(operation.enable) this.append(operation);
    }
    private toggle(){
        this.arrow.classList.toggle("fa-angle-right")
        this.arrow.classList.toggle("fa-angle-down")
        this.buttonsSegment.classList.toggle("u-unused")
        this.buttonsSegment.classList.toggle("--enabled")
    }
    private append({ text, iconClass, color, callback }: { text: MultiLanguageString; iconClass: string; color: string; callback: () => void; }) {
        const element = this.buttonsSegment.appendChild(this.htmlC.elementWithoutEscaping`
            <div class="__button --${color}">
                <div class="__icon"><i class="${iconClass}"></i></div>
                <div class="__text"><p>${text}<p></div>
            </div>
        ` as HTMLElement);
        element.addEventListener("click", async () => {
            try {
                await callback();
            } catch (err) {
                this.errorCatcher(err);
            }
        });
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
