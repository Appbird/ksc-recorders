import { ILabelledDocument } from "./ILabelledDocument";

export interface IRuleClassItem extends ILabelledDocument {
    id: string;
    typeName: string;
    Japanese: string;
    English: string;
}
