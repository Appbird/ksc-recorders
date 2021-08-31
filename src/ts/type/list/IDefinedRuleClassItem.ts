import { ILabelledDocument } from "./ILabelledDocument";

export interface IDefinedRuleClassItem extends ILabelledDocument {
    id: string;
    typeName: string;
    iconCSS: string[];
}
