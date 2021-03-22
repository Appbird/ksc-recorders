//[-] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。

import { exampleData } from "./exampledata";
import { RecordDataBase } from "../RecordDataBase";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { IRecord, IRecordInShortWithName } from "../../type/record/IRecord";
import { IRecordGroupWithName } from "../../type/record/IRecordGroup";
import { controllerOfTableForResolvingID, LanguageInApplication } from "../ControllerOfTableForResolvingID";

const requestGroup:IReceivedDataFromClient_AboutRecordExhibition[] = [{
    gameSystemEnv: {
        gameSystemID:0,
        gameModeID:0,
        gameDifficultyID:0
    },
    groupName:"Name",
    groupSubName:"一戦目",
    orderOfRecordArray:"LowerFirst",
    startOfRecordArray:0,
    limitOfRecordArray:10,
    targetIDs:[1],
    abilityIDs:[1,2],
    ANDORConditionAboutAbilityIDs:"AND",
    runnerIDs:[],
    language:"Japanese"
    
}]
const database = new RecordDataBase(exampleData);
let sent:IReceivedDataFromServer;
try {
    requestGroup.map( (request) => {
            const recordIDs = database.getRecordIDsWithCondition(
                                request.gameSystemEnv.gameSystemID,
                                request.orderOfRecordArray,
                                request.ANDORConditionAboutAbilityIDs,
                                request.abilityIDs,
                                request.runnerIDs);
            
        }
    )
} catch(e) {
    
}

function convertRecordsIntoRecordGroup( records:IRecord[],
    info:{ groupName: string; groupSubName: string; numberOfRecords:number; numberOfRunners:number; lang:LanguageInApplication;}):IRecordGroupWithName{

    return {
        groupName : info.groupName,
        groupSubName : info.groupSubName,
        lastPost : records.sort( (a,b) => b.timestamp - a.timestamp )[0].timestamp,
        numberOfRecords : info.numberOfRecords,
        numberOfRunners : info.numberOfRecords,
        records: records.map( (record) => convertIRecordIntoIRecordInShortWithName(record,record.regulation.gameSystemEnvironment.gameSystemID,info.lang) )
    }
}
function convertIRecordIntoIRecordInShortWithName(record:IRecord,gameSystemID:number,lang:LanguageInApplication):IRecordInShortWithName{
    const gr = record.regulation; //#README
    const gse = gr.gameSystemEnvironment; //#README
    const cotfr = controllerOfTableForResolvingID; //#README
    return {
        score : record.score,
        regulation : {
            gameSystemEnvironment : {
                gameSystemID : gse.gameSystemID,
                gameSystemName : cotfr.resolveGameSystemID(gse.gameSystemID,lang),
                gameModeID : gse.gameModeID,
                gameModeName : cotfr.resolveGameModeID(gse.gameSystemID,gse.gameModeID,lang),
                gameDifficultyID : gse.gameDifficultyID,
                gameDifficultyName : cotfr.resolveGameDifficultyID(gse.gameSystemID,gse.gameDifficultyID,lang),
            },
            targetID : 0,
            targetName : cotfr.resolveTargetID(gse.gameSystemID,gr.targetID,lang),
            abilityIDsOfPlayerCharacters : gse.gameSystemID

        }
         : record.regulation.abilityIDsOfPlayerCharacters.map( (id) => controllerOfTableForResolvingID.resolveAbilityID(gameSystemID,id,lang))
    }
}