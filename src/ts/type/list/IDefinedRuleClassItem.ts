import { ILabelledDocument } from "./ILabelledDocument";

export interface IDefinedRuleClassItem extends ILabelledDocument {
    id: string;
    typeName: string;
    Japanese: string;
    English: string;
    iconCSS: string[];
}
