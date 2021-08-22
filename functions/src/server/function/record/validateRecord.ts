import { ISentRecordOffer } from "../../../../../src/ts/type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { LanguageList } from "../../../../../src/ts/type/LanguageInApplication";
import { IAbilityAttributeItemWithoutCollections } from "../../../../../src/ts/type/list/IAbilityAttributeItemWithoutCollections";
import { IGameModeItemWithoutCollections } from "../../../../../src/ts/type/list/IGameModeItem";

export function validateRecord(record: ISentRecordOffer, gameMode: IGameModeItemWithoutCollections, attributes: IAbilityAttributeItemWithoutCollections[]) {
    const rr = record.regulation;
    if (record.link[0] === undefined)
        throw new Error("[validateRecord] record.link[0] is undefined");
    if (record.link[0].length === 0)
        throw new Error("[validateRecord] record.link has only a empty string.");
    if (!LanguageList.includes(record.languageOfTagName))
        throw new Error("[validateRecord] languageOfTagName does not represent a valid language name on KSSRs.");
    if (rr.abilityIDs.length < 1 || gameMode.maxNumberOfPlayer < rr.abilityIDs.length)
        throw new Error("[validateRecord] regulation.abilityIDs's length is invalid.");

    if (rr.abilitiesAttributeIDs !== undefined && !rr.abilitiesAttributeIDs.every((player) => 
        player.every((playerAttribute) => {
            const targetAttribute = attributes.find(attribute => attribute.id === playerAttribute.attributeID);
            if (targetAttribute === undefined) return false;
            return targetAttribute.requiredItemCount <= playerAttribute.onFlagIDs.length && playerAttribute.onFlagIDs.length <= targetAttribute.maxItemCount;
        })
    )) throw new Error("[validateRecord] regulatuon.abilitiesAttributeIDs is not valid.");
    return;
}
