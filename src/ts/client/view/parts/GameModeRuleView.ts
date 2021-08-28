import marked from "marked";
import { AppliedRuleClassResolved } from "../../../type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { appendElement } from "../../utility/aboutElement";
import { TitleCupsuled } from "./TitleCupsuled";

export class GameModeRuleView {
    private headerSegment: HTMLDivElement;
    private ruleSegment: HTMLDivElement;
    private noteSegment: HTMLDivElement;
    constructor(
        private container: HTMLElement
    ) {
        container.className = "c-ruleDescription";
        this.headerSegment = appendElement(container, "div", "__header");
        this.ruleSegment = appendElement(container, "div", "__rule");
        this.noteSegment = appendElement(container, "div", "__note");
    }

    setHeader({ title, description, iconCSS }: { title: string; description?: string; iconCSS: string; }) {
        this.headerSegment.innerHTML = "";
        const header = new TitleCupsuled(this.headerSegment);
        header.refresh(title, description, { iconCSS });
    }
    setRule({ appliedClass }: { appliedClass: AppliedRuleClassResolved[]; }) {
        this.ruleSegment.innerHTML = "";
        for (const cl of appliedClass) {
            const iconHTML = cl.iconCSS.map(cssClass => `<i class=${cssClass}></i>`).join();
            this.ruleSegment.appendChild(elementWithoutEscaping`
                <div class="__item">
                    <div class="__ruleScope">${iconHTML}${cl.scope}/div>
                    <div class="__ruleClass">${cl.title}</div>
                </div>
            `);
            if (cl.description)
                this.ruleSegment.appendChild(elementWithoutEscaping`
                <div class="__note">${marked(cl.description)}</div>
            `);
            if (cl.note)
                this.ruleSegment.appendChild(elementWithoutEscaping`
                <div class="__note">${marked(cl.note)}</div>
            `);
        }
    }
    setNote({ description, note }: { description?: string; note?: string; }) {
        if (description)
            this.noteSegment.appendChild(elementWithoutEscaping`
                <div class="__note">${marked(description)}</div>
            `);
        if (note)
            this.noteSegment.appendChild(elementWithoutEscaping`
                <div class="__note">${marked(note)}</div>
            `);
    }
    destroy() {
        this.container.innerHTML = "";
    }
}
