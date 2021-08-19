import { IAbilityAttributeFlagItem, IAbilityAttributeItemWithoutCollections } from "./IAbilityAttributeItemWithoutCollections";

//#CTODO もっといい命名ない？AbilityAttribute(能力属性)一つに対応するものであることを意味させたい
//*> このクラスは、一つの属性が取り得る値全てを集めた物である
export interface SetOfFlagsOfAbilityAttributeItem {
    attributeNameInfo: IAbilityAttributeItemWithoutCollections;
    flagsInAttribute: IAbilityAttributeFlagItem[];
}
