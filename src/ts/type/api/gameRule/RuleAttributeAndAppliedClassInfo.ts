import { ResolvedID } from "../../list/ILabelledDocument";
import { IDefinedRuleAttributeWithoutCollection } from "../../list/IDefinedRuleAttributeItem";
import { IDefinedRuleClassItem } from "../../list/IDefinedRuleClassItem";


export type RuleAttributeAndAppliedClassInfo = { 
    rule: AppliedRuleAttributeResolved;
    appliedClass: AppliedRuleClassResolved[];
};

export type AppliedRuleAttributeResolved    = ResolvedID<IDefinedRuleAttributeWithoutCollection>&{note?:string}
export type AppliedRuleClassResolved        = ResolvedID<IDefinedRuleClassItem>&{note?:string,scope?:string}