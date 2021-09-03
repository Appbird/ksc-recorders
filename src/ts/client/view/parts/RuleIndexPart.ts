import { choiceString } from "../../../utility/aboutLang";
import { elementWithoutEscaping } from "../../../utility/ViewUtility";
import { AppliedRuleClassResolved, RuleAttributeAndAppliedClassInfo } from "../../../type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { findElementByClassNameWithErrorPossibility } from "../../utility/aboutElement";
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
    },
    specify_priority_in_ruleClasses:{
        Japanese:   "もっとも上にあるアイテムが基本的にルールとして優先されます。",
        English:    "If the scope of rule classes is duplicated and contradicts each other, the item at the top has priority."
    }
}
type HandledType = {ruleInfo:RuleAttributeAndAppliedClassInfo, onClick:()=>void}
export class RuleIndexPart {
    private rules:HandledType[] = []
    constructor(
        private container: HTMLElement,
        private language: LanguageInApplication
    ){
    }
    /**
     * ルールの目次のアイテムを追加します
     * これで追加し終えた後に、refrectViewメソッドを実行する必要があります。
     */
    appendNewRule(ruleInfo:RuleAttributeAndAppliedClassInfo, onClick:()=>void){
        this.rules.push({ruleInfo,onClick})
    }
    refrectView(){
        if (this.rules.length === 0) {
            this.container.appendChild(elementWithoutEscaping`
                <div class="c-ruleIndex u-width90per">
                    <div class="__indexTitle">${choiceString(contents.indexTitleWithoutRules,this.language)}</div>
                <div>
            `);
            return
        }
        const ruleIndexSegment = this.container.appendChild(elementWithoutEscaping`
            <div class="c-ruleIndex u-width90per">
                <div class="__indexTitle">${choiceString(contents.indexTitle,this.language).replace(/\$\{number\}/g,this.rules.length.toString())}</div>
                <div class="__indexTitle u-bolderChara">${choiceString(contents.specify_priority_in_ruleClasses,this.language)}</div>
                <div class="__list">
                    <div class="__item --top u-smallerChara">
                        <p class=""><i class=""></i> ${choiceString(contents.ruleName,this.language)}</p> <p class="">${choiceString(contents.ruleClass,this.language)}</p>
                    </div>
                    <hr noshade class="u-thin">
                </div>
            <div>
        `);
        const ruleIndexItemsSegment = findElementByClassNameWithErrorPossibility(ruleIndexSegment,"__list")
        for (const {ruleInfo,onClick} of this.rules){
            ruleIndexItemsSegment.appendChild(elementWithoutEscaping`
                <div class="__item">
                    <div><i class="${ruleInfo.rule.iconCSS}"></i> ${ruleInfo.rule.title}
                    ${(ruleInfo.rule.note || 0) !== 0 ? ` <i class="u-redChara u-bolderChara">${choiceString(contents.annotated, this.language)}</i>` : ""}</div> <div class="__classItems">${this.generateClassDescriptionInRuleIndex(ruleInfo.appliedClass, this.language)}</div>
                </div>
            `).addEventListener(`click`, onClick)
        }
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
