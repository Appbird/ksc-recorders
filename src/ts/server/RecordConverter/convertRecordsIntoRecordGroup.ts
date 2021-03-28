import { IRecord, IRecordInShortResolved } from "../../type/record/IRecord";
import { LanguageInApplication } from "../firestore/ControllerOfTableForResolvingID";
import { IRecordGroup } from "../../type/record/IRecordGroup";
import { controllerOfTableForResolvingID } from "../ServerFunctions/search";

//#NOTE このモジュールはRecordsDataBaseの実装に依存しない。

export async function convertRecordsIntoRecordGroup(records: IRecord[],
    info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroup> {
    const copy = records.concat();
    return {
        groupName: info.groupName,
        lastPost: copy.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp,
        numberOfRecords: info.numberOfRecords,
        numberOfRunners: info.numberOfRunners,
        records: await Promise.all(records.map((record) => convertIRecordIntoIRecordInShortWithName(record, record.regulation.gameSystemEnvironment.gameSystemID, info.lang)))
    };
}
async function convertIRecordIntoIRecordInShortWithName(record: IRecord, gameSystemID: string, lang: LanguageInApplication): Promise<IRecordInShortResolved> {

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
                gameDifficultyName: await cotfr.resolveGameDifficultyID(gse.gameSystemID, gse.gameDifficultyID, lang),
            },
            targetID: gr.targetID,
            targetName: await cotfr.resolveTargetID(gse.gameSystemID, gr.targetID, lang),
            abilityIDsOfPlayerCharacters: gr.abilityIDsOfPlayerCharacters,
            abilityNamesOfPlayerCharacters: await Promise.all(gr.abilityIDsOfPlayerCharacters.map((id) => cotfr.resolveAbilityID(gameSystemID, id, lang))),
        },
        score: record.score,
        runnerID: record.runnerID,
        recordID: record.id,
        runnerName: await cotfr.resolveRunnerID(record.runnerID, lang)
    };
}
