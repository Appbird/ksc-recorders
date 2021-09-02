import marked from "marked";
import { AppliedRuleClassResolved } from "../../../type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { choiceString } from "../../../utility/aboutLang";
import { elementWithoutEscaping, setSpanForCorrectLineBreak } from "../../../utility/ViewUtility";
import { appendElement } from "../../utility/aboutElement";
import { TitleCupsuled } from "./TitleCupsuled";

const contents = {
    scope:{
        Japanese: "適用範囲",
        English: "Scope"
    }
    ,noScope:{
        Japanese: "全セグメント",
        English: "All Segments"
    },
    Annotation:{
        Japanese: "注: ",
        English: "* "
    }
}

export class GameModeRuleView {
    private headerSegment: HTMLDivElement;
    private ruleSegment: HTMLDivElement;
    private noteSegment: HTMLDivElement;
    constructor(
        private container: HTMLElement,
        private language:LanguageInApplication
    ) {
        container.className = "c-ruleDescription";
        this.headerSegment = appendElement(container, "div", "__header");
        this.ruleSegment = appendElement(container, "div", "__rule u-width90per");
        this.noteSegment = appendElement(container, "div", "__note u-width90per");
    }

    setHeader({ title, description,ruleName, iconCSS }: { title: string; ruleName:string; description?: string; iconCSS: string; }) {
        this.headerSegment.innerHTML = "";
        const header = new TitleCupsuled(appendElement(this.headerSegment, "div"));
        header.refresh(title, ruleName, { iconCSS,chara:"u-smallerChara" });
        appendElement(this.headerSegment, "p", "u-smallerChara u-width90per").innerHTML = description || ""
    }
    setRule({ appliedClass }: { appliedClass: AppliedRuleClassResolved[]; }) {
        this.ruleSegment.innerHTML = "";
        for (const cl of appliedClass) {
            const iconHTML = cl.iconCSS.map(cssClass => `<i class="${cssClass}"></i>`).join("");
            this.ruleSegment.appendChild(elementWithoutEscaping`
                <div class="c-HeaderInRuleDescription u-marginLeftRight05emToChildren">
                    <div class="__icon">${iconHTML}</div>
                    <div class="__ruleName">
                        <div class="__title">${cl.title}</div>
                        <div class="__typeName u-bolderChara">[${choiceString(contents.scope,this.language)}] ${cl.scope || choiceString(contents.noScope,this.language)}</div>
                    </div>
                </div>
            `)
            if (cl.description)
                this.ruleSegment.appendChild(elementWithoutEscaping`
                    <div class="__note u-smallerChara u-width90per">${marked(cl.description)}</div>
                `);
            if (cl.note)
                this.ruleSegment.appendChild(elementWithoutEscaping`
                    <div class="__note u-smallerChara u-width90per">${generateAnnotationPrefixHTML(this.language)}${marked(cl.note)}</div>
                `);
        }
    }
    setNote({ note }: { note?: string; }) {
        if (note)
            this.noteSegment.appendChild(elementWithoutEscaping`
                <div class="__note">${generateAnnotationPrefixHTML(this.language)}${setSpanForCorrectLineBreak(marked(note))}</div>
            `);
    }
    destroy() {
        this.container.innerHTML = "";
    }
}

function generateAnnotationPrefixHTML(language:LanguageInApplication){
    return `<i class="u-redChara u-bolderChara u-inline">${choiceString(contents.Annotation,language)}</i>`
}