import { IRecord, IRecordInShortResolved } from "../../type/record/IRecord";
import { LanguageInApplication } from "../ControllerOfTableForResolvingID";
import { IRecordGroup } from "../../type/record/IRecordGroup";
import { controllerOfTableForResolvingID } from "../test/OutputDataToClient.test";

export function convertRecordsIntoRecordGroup(records: IRecord[],
    info: { groupName: string; groupSubName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): IRecordGroup {

    return {
        groupName: info.groupName,
        groupSubName: info.groupSubName,
        lastPost: records.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp,
        numberOfRecords: info.numberOfRecords,
        numberOfRunners: info.numberOfRecords,
        records: records.map((record) => convertIRecordIntoIRecordInShortWithName(record, record.regulation.gameSystemEnvironment.gameSystemID, info.lang))
    };
}
function convertIRecordIntoIRecordInShortWithName(record: IRecord, gameSystemID: number, lang: LanguageInApplication): IRecordInShortResolved {

    const gr = record.regulation; //#README
    const gse = gr.gameSystemEnvironment; //#README
    const cotfr = controllerOfTableForResolvingID; //#README

    return {
        regulation: {
            gameSystemEnvironment: {
                gameSystemID: gse.gameSystemID,
                gameModeID: gse.gameModeID,
                gameDifficultyID: gse.gameDifficultyID,
                gameSystemName: cotfr.resolveGameSystemID(gse.gameSystemID, lang),
                gameModeName: cotfr.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang),
                gameDifficultyName: cotfr.resolveGameDifficultyID(gse.gameSystemID, gse.gameDifficultyID, lang),
            },
            targetID: gr.targetID,
            targetName: cotfr.resolveTargetID(gse.gameSystemID, gr.targetID, lang),
            abilityIDsOfPlayerCharacters: gr.abilityIDsOfPlayerCharacters,
            abilityNamesOfPlayerCharacters: gr.abilityIDsOfPlayerCharacters.map((id) => cotfr.resolveAbilityID(gameSystemID, id, lang)),
        },
        score: record.score,
        runnerID: record.runnerID,
        recordID: record.recordID,
        runnerName: cotfr.resolveRunnerID(record.runnerID, lang)
    };
}
