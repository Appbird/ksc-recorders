import { ILabelledDocument } from "./ILabelledDocument";

export interface IAbilityAttributeItemWithoutCollections extends ILabelledDocument{
    multipleItems:boolean;
    requiredItemCount:number;
    maxItemCount:number;
    duplicatedItems:boolean;
    targetPlayerFlag:boolean[];
    icooonName?:string;

}
export interface IAbilityAttributeFlagItem extends ILabelledDocument{

}