import { IRecord, IRecordInShortResolved } from "../../type/record/IRecord";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";
import { controllerOfTableForResolvingID } from "../firestore/ControllerOfTableForResolvingID";

//#NOTE このモジュールはRecordsDataBaseの実装に依存しない。
export async function convertRecordsIntoRecordGroup(records: IRecord[],
    info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
    const copy = records.concat();
    return {
        groupName: info.groupName,
        lastPost: copy.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp,
        numberOfRecords: info.numberOfRecords,
        numberOfRunners: info.numberOfRunners,
        records: await Promise.all(records.map((record) => convertIRecordIntoIRecordInShortWithName(record, info.lang)))
    };
}
async function convertIRecordIntoIRecordInShortWithName(record: IRecord, lang: LanguageInApplication): Promise<IRecordInShortResolved> {

    const gr = record.regulation; //#README
    const gse = gr.gameSystemEnvironment; //#README
    const cotfr = controllerOfTableForResolvingID; //#README

    return {
        regulation: {
            gameSystemEnvironment: {
                gameSystemID: gse.gameSystemID,
                gameModeID: gse.gameModeID,
                gameDifficultyID: gse.gameDifficultyID,
                gameSystemName: await cotfr.resolveGameSystemID(gse.gameSystemID, lang),
                gameModeName: await cotfr.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang),
                gameDifficultyName: await cotfr.resolveGameDifficultyID(gse.gameSystemID,gse.gameModeID, gse.gameDifficultyID, lang),
            },
            targetID: gr.targetID,
            targetName: await cotfr.resolveTargetID(gse.gameSystemID, gse.gameModeID, gr.targetID, lang),
            abilityIDs: gr.abilityIDs,
            abilityNames: await Promise.all(gr.abilityIDs.map((id) => cotfr.resolveAbilityID(gse.gameSystemID,gse.gameModeID, id, lang))),
        },
        score: record.score,
        runnerID: record.runnerID,
        recordID: record.id,
        runnerName: await cotfr.resolveRunnerID(record.runnerID, lang)
    };
}
