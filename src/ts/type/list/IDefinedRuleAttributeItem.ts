import { ILabelledDocument } from "./ILabelledDocument";

export interface IDefinedRuleAttributeWithoutCollection extends ILabelledDocument{
    id:string;
    ruleName:string;
    Japanese:string;
    English:string;
    JDescription:string;
    EDescription:string;
    iconCSS: string;
    hasMultipleRuleClassItem:boolean;
}

