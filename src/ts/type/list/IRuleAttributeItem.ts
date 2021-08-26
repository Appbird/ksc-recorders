import { ILabelledDocument } from "./ILabelledDocument";

export interface IRuleAttributeWithoutCollection extends ILabelledDocument{
    id:string;
    ruleName:string;
    Japanese:string;
    English:string;
    JDescription:string;
    EDescription:string;
    hasMultipleRuleClassItem:boolean;
}

