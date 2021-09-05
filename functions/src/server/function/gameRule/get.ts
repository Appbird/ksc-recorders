import { RuleAttributeAndAppliedClassInfo } from "../../../../../src/ts/type/api/gameRule/RuleAttributeAndAppliedClassInfo";
import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { AppliedRuleAttributeCollectionController } from "../../firestore/AppliedRuleAttributeCollectionController";
import { RuleResolver } from "../../wraper/RuleController";

export async function gameMode_get(input:APIFunctions["gameRule_get"]["atServer"]):Promise<APIFunctions["gameRule_get"]["atClient"]>{
    const ig = input.gameSystemEnv
    const gameRuleC =   new RuleResolver()
    const gameRuleAttribute = await new AppliedRuleAttributeCollectionController(ig.gameSystemID,ig.gameModeID).getCollection()
    const gameRuleAttributeWillBeResolved = (input.targetRuleID !== undefined) ? gameRuleAttribute.filter(attr => input.targetRuleID?.includes(attr.id)) : gameRuleAttribute 

    const ruleInfo    = await Promise.all(gameRuleAttributeWillBeResolved.map(ruleAttr => gameRuleC.getRuleAttributeInfo(ruleAttr,input.language)))
    if (ruleInfo.some(ruleAttr => ruleAttr === undefined)) throw new Error("getRuleAttributeInfo found rule attribute ID which does not be assigned.")
    const modifiedAt = ruleInfo.map(unit => unit?.rule.latestModifiedAt ? unit?.rule.latestModifiedAt : 1630756800 ).sort((a,b) => b-a)[0]
    return {
        isSucceeded:    true,
        result:         Object.assign(ruleInfo as RuleAttributeAndAppliedClassInfo[]),
        modifiedAt
    }
}