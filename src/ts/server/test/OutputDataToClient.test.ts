//[x] RecordDataBase,ControllerOfTableForResolvingIDクラスを用いて、必要となる記録データを取り出し、ここでデータの加工を行う。
//[-] クライアントに与えるべきデータをJSONで出力する。

import { exampleData } from "./exampledata";
import { RecordDataBase } from "../RecordDataBase";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../../type/transmission/IReceivedDataFromServer";
import { IRecord, IRecordInShort, IRecordInShortResolved } from "../../type/record/IRecord";
import { controllerOfTableForResolvingID, LanguageInApplication } from "../ControllerOfTableForResolvingID";
import { IRecordGroup } from "../../type/record/IRecordGroup";

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
    const recordGroups = requestGroup.map( (request) => {
            const recordIDs = database.getRecordIDsWithCondition(
                                request.gameSystemEnv.gameSystemID,
                                request.orderOfRecordArray,
                                request.ANDORConditionAboutAbilityIDs,
                                request.abilityIDs,
                                request.runnerIDs);
            const records = database.getRecords(request.gameSystemEnv.gameSystemID,recordIDs.slice(request.startOfRecordArray,request.startOfRecordArray + request.limitOfRecordArray))
        
            return convertRecordsIntoRecordGroup(
            records , { groupName:request.groupName,
                groupSubName:request.groupSubName,
                numberOfRecords:recordIDs.length ,
                numberOfRunners:NaN,
                lang:request.language
        }); 
        }
    )
    
    sent = {
        isSuccess:true,
        recordGroups:recordGroups
    }

} catch(e) {
    sent = {
        isSuccess :false,
        recordGroups:undefined,
        message: e
    }
}

function convertRecordsIntoRecordGroup( records:IRecord[],
    info:{ groupName: string; groupSubName: string; numberOfRecords:number; numberOfRunners:number; lang:LanguageInApplication;}):IRecordGroup{

    return {
        groupName: info.groupName,
        groupSubName : info.groupSubName,
        lastPost : records.sort( (a,b) => b.timestamp - a.timestamp )[0].timestamp,
        numberOfRecords : info.numberOfRecords,
        numberOfRunners : info.numberOfRecords,
        records: records.map( (record) => convertIRecordIntoIRecordInShortWithName(record,record.regulation.gameSystemEnvironment.gameSystemID,info.lang) )
    }
}
function convertIRecordIntoIRecordInShortWithName(record:IRecord,gameSystemID:number,lang:LanguageInApplication):{resolved:IRecordInShortResolved,notResolved:IRecordInShort}{

    const gr = record.regulation; //#README
    const gse = gr.gameSystemEnvironment; //#README
    const cotfr = controllerOfTableForResolvingID; //#README

    const a:IRecordInShort = {
        score:record.score,
        regulation:record.regulation,
        runnerID:record.runnerID,
        recordID:record.recordID
    }
    const b:IRecordInShortResolved = {
        regulation : {
            gameSystemEnvironment : {
                gameSystemName : cotfr.resolveGameSystemID(gse.gameSystemID,lang),
                gameModeName : cotfr.resolveGameModeID(gse.gameSystemID,gse.gameModeID,lang),
                gameDifficultyName : cotfr.resolveGameDifficultyID(gse.gameSystemID,gse.gameDifficultyID,lang),
            },
            targetName : cotfr.resolveTargetID(gse.gameSystemID,gr.targetID,lang),
            abilityNamesOfPlayerCharacters : gr.abilityIDsOfPlayerCharacters.map( (id) => cotfr.resolveAbilityID(gameSystemID,id,lang)),
            
        },
        runnerName: cotfr.resolveRunnerID(record.runnerID,lang)
        }
    
    return {resolved:b,notResolved:a};
}

describe("正しいオブジェクトが返されるかのテスト",
    () => {
        //[-] テストを行う。
    }
)