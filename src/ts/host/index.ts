import { RecordGroupView } from "../view/RecordsCardView";
import { IRecordGroupWithName } from "../type/record/IRecordGroup";
import { IReceivedDataFromServer } from "../type/transmission/IReceivedDataFromServer";

const input = `{
    "isSuccess": true,
    "recordGroups":[{
        "groupName":"ボス1",
        "groupSubName":"1戦目",
        "lastPost":"1992/04/27 06:00",
        "numberOfRecords":2,
        "numberOfRunners":1,
        "records":[{
            "score":0,
            "regulation":{
                "gameSystemEnvironment":{
                    "gameDifficultyID":0,
                    "gameDifficultyName": "難易度名",
                    "gameModeID":0,
                    "gameModeName": "モード名",
                    "gameSystemID":0,
                    "gameSystemName": "作品名"
                },
                "abilityIDsOfPlayerCharacters":[0,1,1,2],
                "abilityNamesOfPlayerCharacters":["能力0","能力1","能力1","能力2"],
                "targetID":0,
                "targetName": "ターゲット0"
            },
            "runnerID":0,
            "runnerName":"user00000",
            "recordID":0
        },
        {
            "score":0,
            "regulation":{
                "gameSystemEnvironment":{
                    "gameDifficultyID":0,
                    "gameDifficultyName": "難易度0",
                    "gameModeID":0,
                    "gameModeName": "モード0",
                    "gameSystemID":0,
                    "gameSystemName": "作品0"
                },
                "abilityIDsOfPlayerCharacters":[0,1,1,2],
                "abilityNamesOfPlayerCharacters":["能力0","能力1","能力1","能力2"],
                "targetID":0,
                "targetName": "ターゲット0"
            },
            "runnerID":0,
            "runnerName":"user00000",
            "recordID":0
        }]
    }]
}`

const inputObject:IReceivedDataFromServer = JSON.parse(input)
const recordsData:IRecordGroupWithName[] = inputObject.recordGroups;
const article = document.getElementById("article");

for (const recordData of recordsData) {
    const element = new RecordGroupView(recordData);
    article?.appendChild(element.htmlElement)
}