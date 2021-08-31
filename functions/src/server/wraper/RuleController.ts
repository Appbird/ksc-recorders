import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { DefinedRuleAttributeCollectionController } from "../firestore/DefinedRuleAttributeCollectionController";
import { DefinedRuleClassCollectionController } from "../firestore/DefinedRuleClassCollectionController";
import { Transaction } from "../function/firebaseAdmin";
import { chooseMultiLanguageString } from "./IDResolver";
import { RuleAttributeAndAppliedClassInfo } from "../../../../src/ts/type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { choiceString } from "../../../../src/ts/utility/aboutLang";
import { IAppliedGameModeRule } from "../../../../src/ts/type/list/GameModeRule";

export class RuleResolver {
    private ruleAttributeC:DefinedRuleAttributeCollectionController
    constructor(
        private transaction?:Transaction
    ){
        this.ruleAttributeC = new DefinedRuleAttributeCollectionController(transaction)
    }
    async getRuleAttributeInfo(rule:IAppliedGameModeRule,language:LanguageInApplication):Promise<RuleAttributeAndAppliedClassInfo|undefined>{
        if (rule === undefined) return undefined
        const ruleClassC = new DefinedRuleClassCollectionController(rule.id,this.transaction)
        return {
                rule: {
                    ...chooseMultiLanguageString(await this.ruleAttributeC.getInfo(rule.id),language),
                    note: choiceString(rule.note,language)
                },
                appliedClass:   await Promise.all(
                    rule.appliedClassID.map(
                        async appliedClassInfo => {
                            const data = await ruleClassC.getInfo(appliedClassInfo.id)    
                            return {
                                ...chooseMultiLanguageString(data,language),
                                note: choiceString(appliedClassInfo.note,language),
                                scope: choiceString(appliedClassInfo.scope,language)
                            }
                        }
                    )
                )
        }
    }
    
    
}