import { RuleDescription } from "../../../../src/ts/type/list/IGameModeItem";
import { IRuleAttributeWithoutCollection } from "../../../../src/ts/type/list/IRuleAttributeItem";
import { IRuleClassItem } from "../../../../src/ts/type/list/IRuleClassItem";
import { RuleAttributeCollectionController } from "../firestore/RuleAttributeCollectionController";
import { RuleClassCollectionController } from "../firestore/RuleClassCollectionController";
import { Transaction } from "../function/firebaseAdmin";

export type RuleAttributeAndAppliedClassInfo = {rule:IRuleAttributeWithoutCollection,appliedClass:IRuleClassItem[]}

export class RuleResolver {
    private ruleAttributeC:RuleAttributeCollectionController
    constructor(
        private transaction?:Transaction
    ){
        this.ruleAttributeC = new RuleAttributeCollectionController(transaction)
    }
    async getRuleAttributeInfo({rules}:{rules?:RuleDescription[]}):Promise<RuleAttributeAndAppliedClassInfo[]|undefined>{
        if (rules === undefined) return undefined
        return await Promise.all(rules.map(async rule => {
            const ruleClassC = new RuleClassCollectionController(rule.id,this.transaction)
            return {
                    rule:           await this.ruleAttributeC.getInfo(rule.id),
                    appliedClass:   await Promise.all(rule.appliedClassIDs.map(classID => ruleClassC.getInfo(classID)))
            }
        }))
    }
    
    
}