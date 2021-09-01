import fetch from "node-fetch";
import { writeFile } from "fs/promises";
import { APIFunctions } from "../../../src/ts/type/api/relation";


class APIAdministrator {
    private origin: string;
    constructor(origin: string = `${location.protocol}//${location.host}`) {
        this.origin = origin;
    }
    async access<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]): Promise<APIFunctions[T]["atClient"]> {
        const convertedName = functionName.replace(/\_/g, "/");
        
        const response = await fetch(`${this.origin}/api/${convertedName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requiredObj)
        });
        const responseText = await response.text()
        if (response.status !== 200){
            let responseMessage:string;
            try{
                responseMessage = JSON.parse(responseText).message
            } catch(error) {
                responseMessage = `メッセージがありませんでした : ${responseText}`
            }
            throw new Error(`# API: ${convertedName}へのリクエストの結果\n\n### ${response.status} : ${response.statusText} \n\n${responseMessage}\n\n# 入力\n\n${JSON.stringify(requiredObj)}`);
        
        }
        const result = await JSON.parse(responseText);
        return result;
    }
}


const api = new APIAdministrator("https://kss-recorders.web.app");

(async () => {
    const gameSystemIDs = (await api.access("list_gameSystems", {})).result.map(gameSystem => gameSystem.id)
    
    console.info("gameSystemIDs is loaded.")
    const gameModeIDsInGameSystemIDs = await Promise.all(
        gameSystemIDs.map(gameSystemID => api.access("list_gameModes",{gameSystemEnv:{gameSystemID:gameSystemID}}).then((response) => response.result.map(gameMode => gameMode.id) ))
    )
    console.info("gameModeIDsInGameSystemIDs is loaded.")
    const result = await Promise.all(gameModeIDsInGameSystemIDs.map((gameModeIDs,index) => 
        Promise.all(gameModeIDs.map(async gameModeID => {
            const records = (await api.access("list_records",{
                gameSystemEnv:{
                    gameSystemID: gameSystemIDs[index],
                    gameModeID
                }
            })).result
            
            return {
                envID: `${gameSystemIDs[index]}/${gameModeID}`,
                runnerIDSet: Array.from(new Set(records.map(record => record.runnerID)))
            }
        }))
    ))
    await writeFile("./data.json",JSON.stringify(result),{encoding:"utf-8"})
    console.info("finished!")
})()

