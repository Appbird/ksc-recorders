import { choiceString } from "../../../utility/aboutLang";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { AppliedRuleClassResolved, RuleAttributeAndAppliedClassInfo } from "../../../type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
const contents={
    ruleName:{
        Japanese: "ルールの属性",
        English: "rule attribute"
    },
    ruleClass:{
        Japanese: "ルールクラス[その適用範囲]",
        English: "Applied Rule Class[Scope of this rule class]"
    },
    annotated:{
        Japanese:"(注)",
        English: "*"
    },
    indexTitle:{
        Japanese:"このゲームモードでは、以下の${number}個のルールが定まっています。",
        English: "In this game mode, ${number} rules are set. You can check these rules below."
    },
    indexTitleWithoutRules:{
        Japanese:"このゲームモードではまだルールが定められていません…。",
        English: "Any rules have not been set yet in this game mode…"
    },
    noScope:{
        Japanese: "全セグメント",
        English: "All Segments"
    }
}

export class RuleIndexPart {
    constructor(container: HTMLElement, { rules, language }: { rules: RuleAttributeAndAppliedClassInfo[]; language: LanguageInApplication; }) {
        if (rules.length === 0) {
            container.appendChild(elementWithoutEscaping`
                <div class="c-ruleIndex u-width90per">
                    <div class="__indexTitle">${choiceString(contents.indexTitleWithoutRules,language)}</div>
                <div>
            `);
            return
        }
        container.appendChild(elementWithoutEscaping`
            <div class="c-ruleIndex u-width90per">
                <div class="__indexTitle">${choiceString(contents.indexTitle,language).replace(/\$\{number\}/g,rules.length.toString())}</div>
                <div class="__list">
                    <div class="__item --top u-smallerChara">
                        <p class=""><i class=""></i> ${choiceString(contents.ruleName,language)}</p> <p class="">${choiceString(contents.ruleClass,language)}</p>
                    </div>
                    <hr noshade class="u-thin">
                    ${rules.map((ruleObj) => this.generateRuleIndexHTML(ruleObj, language)).join("")}
                </div>
            <div>
        `);
    }
    private generateRuleIndexHTML(ruleObj: RuleAttributeAndAppliedClassInfo, language: LanguageInApplication) {
        return `<div class="__item">
                    <div><i class="${ruleObj.rule.iconCSS}"></i> ${ruleObj.rule.title}${(ruleObj.rule.note || 0) !== 0 ? ` <i class="u-redChara u-bolderChara">${choiceString(contents.annotated, language)}</i>` : ""}</div> <div class="__classItems">${this.generateClassDescriptionInRuleIndex(ruleObj.appliedClass, language)}</div>
                </div>`;
    }
    private generateClassDescriptionInRuleIndex(appliedClass: AppliedRuleClassResolved[], language: LanguageInApplication) {
        return appliedClass.map(ruleClass => `
        <div>
            ${this.generateCSSIcons(ruleClass)} [${ruleClass.scope || choiceString(contents.noScope,language)}]`
                + `${(ruleClass.note?.length || 0) !== 0 ? ` <i class="u-redChara u-bolderChara">${choiceString(contents.annotated, language)}</i>` : ""}
        </div>`
        ).join("");
    }
    private generateCSSIcons({ iconCSS }: { iconCSS: string[]; }) {
        return iconCSS.map(ruleClassIcon => `<i class="${ruleClassIcon}"></i>`).join("");
    }
}
