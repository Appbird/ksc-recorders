import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";

export interface IAbilityAttributeItemWithoutCollections extends IItemOfResolveTableToName{
    multipleItems:boolean;
    requiredItemCount:number;
    maxItemCount:number;
    duplicatedItems:boolean;
    targetPlayerFlag:boolean[];
    icooonName?:string;

}
export interface IAbilityAttributeFlagItem extends IItemOfResolveTableToName{

}