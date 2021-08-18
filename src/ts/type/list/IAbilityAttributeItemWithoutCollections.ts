import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";

export interface IAbilityAttributeItemWithoutCollections extends IItemOfResolveTableToName{
    multipleItems:boolean;
    duplicatedItems:boolean;
    targetPlayerFlag:boolean[];
}
export interface IAbilityAttributeFlagItem extends IItemOfResolveTableToName{

}