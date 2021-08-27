import { OnePlayerOfAbilityAttribute, OnePlayerOfAbilityAttributeResolved } from "../../../../src/ts/type/foundation/IRegulation";
import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { IAbilityAttributeItemWithoutCollections, IAbilityAttributeFlagItem } from "../../../../src/ts/type/list/IAbilityAttributeItemWithoutCollections";
import { IAbilityItem } from "../../../../src/ts/type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../../src/ts/type/list/IGameDifficultyItem";
import { IGameModeItemWithoutCollections } from "../../../../src/ts/type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections, IHashTagItem } from "../../../../src/ts/type/list/IGameSystemInfo";
import { ITargetItem } from "../../../../src/ts/type/list/ITargetItem";
import { IRecord, IRecordInShortResolved, IRecordResolved } from "../../../../src/ts/type/record/IRecord";
import { IRecordGroupResolved } from "../../../../src/ts/type/record/IRecordGroupResolved";
import { IRunner } from "../../../../src/ts/type/record/IRunner";
import { AbilityAttributeCollectionController } from "../firestore/AbilityAttributeCollectionController";
import { AbilityAttributeFlagsCollectiCollectionController } from "../firestore/AbilityAttributeFlagCollectionController";
import { AbilityCollectionController } from "../firestore/AbilityCollectionController";
import { DifficultyCollectionController } from "../firestore/DifficultyCollectionController";
import { GameModeItemController } from "../firestore/GameModeItemController";
import { GameSystemItemController } from "../firestore/GameSystemController";
import { HashTagCollectionController } from "../firestore/HashTagCollectionController";
import { RunnerCollectionController } from "../firestore/RunnerCollectionController";
import { TargetCollectionController } from "../firestore/TargetCollectionController";
import { Transaction } from "../function/firebaseAdmin";
import { IDResolver } from "./IDResolver";

export class RecordResolver{
    private abilityID:IDResolver<IAbilityItem>
    private targetID:IDResolver<ITargetItem>
    private difficultyID:IDResolver<IGameDifficultyItem>
    private gameSystemID:IDResolver<IGameSystemInfoWithoutCollections>
    private gameModeID:IDResolver<IGameModeItemWithoutCollections>
    private runnerID: IDResolver<IRunner>;
    private abilityAttributeID: IDResolver<IAbilityAttributeItemWithoutCollections>;
    private attributeFlagID: IDResolver<IAbilityAttributeFlagItem>;
    private attributeFlagC: AbilityAttributeFlagsCollectiCollectionController;
    private hashTagID: IDResolver<IHashTagItem>;
    constructor(gameSystemID:string,gameModeID:string,
        transaction?:Transaction){
        this.attributeFlagC     = new AbilityAttributeFlagsCollectiCollectionController(gameSystemID,gameModeID,"undefined")
        this.runnerID           = new IDResolver(new RunnerCollectionController(transaction))
        this.gameSystemID       = new IDResolver(new GameSystemItemController(transaction))
        this.gameModeID         = new IDResolver(new GameModeItemController(gameSystemID,transaction))
        this.difficultyID       = new IDResolver(new DifficultyCollectionController(gameSystemID,gameModeID,transaction))
        this.targetID           = new IDResolver(new TargetCollectionController(gameSystemID,gameModeID,transaction))
        this.abilityID          = new IDResolver(new AbilityCollectionController(gameSystemID,gameModeID,transaction))
        this.abilityAttributeID = new IDResolver(new AbilityAttributeCollectionController(gameSystemID,gameModeID,transaction))
        this.attributeFlagID    = new IDResolver(this.attributeFlagC)
        this.hashTagID          = new IDResolver(new HashTagCollectionController(gameSystemID))
    }
    async convertRecordsIntoRecordGroupResolved(records: IRecord[],
        info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
        if (records.length === 0) return {
            groupName: info.groupName,
            lastPost: undefined, numberOfRecords: 0, numberOfRunners: 0,
            records: []
        };
        const copy = records.concat();
        return {
            groupName: info.groupName,
            lastPost: copy.sort((a, b) => b.timestamp_post - a.timestamp_post)[0].timestamp_post,
            numberOfRecords: info.numberOfRecords,
            numberOfRunners: info.numberOfRunners,
            records: await Promise.all(records.map((record) => this.convertRecordIntoRecordInShortResolved(record, info.lang)))
        };
    }
    async convertRecordIntoRecordInShortResolved(record:IRecord,lang:LanguageInApplication):Promise<IRecordInShortResolved>{
        const rr = record.regulation;
        const rrg = record.regulation.gameSystemEnvironment;
        return {
            ...record,
            regulation: {
                ...rr,
                abilityNames: await Promise.all(rr.abilityIDs.map((abilityID) => this.abilityID.resolveForTitle(abilityID, lang))),
                abilitiesAttributeNames: (rr.abilitiesAttributeIDs === undefined) ? undefined :
                    await this.resolveAbilityAttributeIDs(rr.abilitiesAttributeIDs, lang),
                targetName: await this.targetID.resolveForTitle(rr.targetID, lang),
                gameSystemEnvironment: {
                    ...rrg,
                    gameSystemName: await this.gameSystemID.resolveForTitle(rrg.gameSystemID, lang),
                    gameDifficultyName: await this.difficultyID.resolveForTitle(rrg.gameDifficultyID, lang),
                    gameModeName: await this.gameModeID.resolveForTitle(rrg.gameModeID, lang)
                }
            },
            isVerified: record.moderatorIDs.length !== 0,
            runnerName: await this.runnerID.resolveForTitle(record.runnerID, lang)
        }
    }
    async convertRecordIntoRecordResolved(record:IRecord,lang:LanguageInApplication):Promise<IRecordResolved>{
        const rr = record.regulation;
        const rrg = record.regulation.gameSystemEnvironment;
        return {
            ...record,
            regulation: {
                ...rr,
                abilityNames: await Promise.all(rr.abilityIDs.map((abilityID) => this.abilityID.resolveForTitle(abilityID, lang))),
                abilitiesAttributeNames: (rr.abilitiesAttributeIDs === undefined) ? undefined :
                    await this.resolveAbilityAttributeIDs(rr.abilitiesAttributeIDs, lang),
                targetName: await this.targetID.resolveForTitle(rr.targetID, lang),
                gameSystemEnvironment: {
                    ...rrg,
                    gameSystemName: await this.gameSystemID.resolveForTitle(rrg.gameSystemID, lang),
                    gameDifficultyName: await this.difficultyID.resolveForTitle(rrg.gameDifficultyID, lang),
                    gameModeName: await this.gameModeID.resolveForTitle(rrg.gameModeID, lang)
                }
            },
            moderatorIDsResolved: (record.moderatorIDs === undefined) ? [] : await Promise.all(record.moderatorIDs.map(moderatorID => this.runnerID.resolveForTitle(moderatorID.id, lang))),
            runnerName: await this.runnerID.resolveForTitle(record.runnerID, lang),
            tagName: await Promise.all(record.tagID.map((element) => this.hashTagID.resolveForTitle(element, lang)))
        }
    }
    private resolveAbilityAttributeIDs(abilitiesAttributeIDs: OnePlayerOfAbilityAttribute[], lang: LanguageInApplication): Promise<OnePlayerOfAbilityAttributeResolved[]> {
        return Promise.all(
            abilitiesAttributeIDs.map(abilityAttributes => this.resolveAbilityAttributeIDForEachPlayer(abilityAttributes, lang))
        )
    }
    private resolveAbilityAttributeIDForEachPlayer(playerOfAbilityAttributes: OnePlayerOfAbilityAttribute, lang: LanguageInApplication): Promise<OnePlayerOfAbilityAttributeResolved> {
        return Promise.all(
            playerOfAbilityAttributes.map(async unit => {
                this.attributeFlagC.changeRef(unit.attributeID)
                return {
                    attributeName: await this.abilityAttributeID.resolveForTitle(unit.attributeID, lang),
                    onFlagNames: await Promise.all(unit.onFlagIDs.map(onFlagID => this.attributeFlagID.resolveForTitle(onFlagID, lang)))
                }
            })
        )
    }

}