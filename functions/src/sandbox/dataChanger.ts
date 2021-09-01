import { GameModeItemController } from "../server/firestore/GameModeItemController";
import { GameSystemItemController } from "../server/firestore/GameSystemController"
import data from "./data.json"
export async function refreshRunnerInfoInGameMode(){
    const gameSystemC = new GameSystemItemController();

        await Promise.all(data.map(async gameSystemUnit => {
            const gameSystemID = gameSystemUnit[0].envID.split("\/")[0]
            const gameModeC = new GameModeItemController(gameSystemID)
            const runnerSetInGameSystem = new Set<string>()
            await Promise.all(gameSystemUnit.map(gameModeUnit => {
                const gameModeID = gameModeUnit.envID.split("\/")[1]
                for (const runnerID of gameModeUnit.runnerIDSet) runnerSetInGameSystem.add(runnerID)
                return gameModeC.update(gameModeID,{
                    runnerIDList: gameModeUnit.runnerIDSet
                })
             }))
            await gameSystemC.update(gameSystemID,{
                runnerIDList: Array.from(runnerSetInGameSystem)
            })
        }))
    
    console.log("complemte!")
    
}