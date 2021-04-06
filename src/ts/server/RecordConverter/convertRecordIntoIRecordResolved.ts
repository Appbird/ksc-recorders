import { IRecord, IRecordResolved } from "../../type/record/IRecord";
import { controllerOfTableForResolvingID } from "../tmpDataBase/ControllerOfTableForResolvingID";
import { LanguageInApplication } from "../type/LanguageInApplication";

export async function convertRecordIntoRecordResolved(record:IRecord,lang:LanguageInApplication):Promise<IRecordResolved>{
    const rr = record.regulation;
    const rrg = record.regulation.gameSystemEnvironment;
    return {
        id: record.id,
        score:record.score,
        timestamp:record.timestamp,
        regulation:{
            abilityIDs : rr.abilityIDs,
            abilityNames : await Promise.all(rr.abilityIDs.map( (abilityID) => controllerOfTableForResolvingID.resolveAbilityID(rrg.gameSystemID,rrg.gameModeID,abilityID,lang))),
            targetID: rr.targetID,
            targetName: await controllerOfTableForResolvingID.resolveTargetID(rrg.gameSystemID,rrg.gameModeID,rr.targetID,lang),
            gameSystemEnvironment:{
                gameSystemID:rrg.gameSystemID,
                gameSystemName:await controllerOfTableForResolvingID.resolveGameSystemID(rrg.gameSystemID,lang),
                gameDifficultyID:rrg.gameDifficultyID,
                gameDifficultyName: await controllerOfTableForResolvingID.resolveGameDifficultyID(rrg.gameSystemID,rrg.gameModeID,rrg.gameDifficultyID,lang),
                gameModeID:rrg.gameModeID,
                gameModeName:await controllerOfTableForResolvingID.resolveGameModeID(rrg.gameSystemID,rrg.gameModeID,lang)
            }
        },
        runnerID: record.runnerID,
        runnerName: await controllerOfTableForResolvingID.resolveRunnerID(record.runnerID,lang),
        tagID: record.tagID,
        tagName: await Promise.all(record.tagID.map((element) => controllerOfTableForResolvingID.resolveTagID(rrg.gameSystemID,rrg.gameModeID,element,lang))),
        note: record.note,
        link: record.link
    }
}