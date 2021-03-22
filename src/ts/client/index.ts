import { RecordGroupView } from "../view/RecordsCardView";
import { IRecordGroup } from "../type/record/IRecordGroup";
import { IReceivedDataFromServer } from "../type/transmission/IReceivedDataFromServer";
import { element } from "../utility/ViewUtility";
//#NOTE 入力例
let input:IReceivedDataFromServer = {
    "isSuccess": true,
    "message":"メッセージは　でないはずだよ　でたら　おしえてね",
    "recordGroups": [{
        //*> Basic Information of Record-Groups
        "groupName":"ボス1",
        "groupSubName":"1戦目",
        "lastPost":704300400000,
        "numberOfRecords":2,
        "numberOfRunners":1,

        //*> Resolved Record Data
        "records":[
        //*> 1st Record
        {
            "resolved":{
                "regulation":{
                    "gameSystemEnvironment":{
                        "gameDifficultyName":"難易度0",
                        "gameModeName":"モード0",
                        "gameSystemName":"ゲーム0",
                    },
                    "abilityNamesOfPlayerCharacters":["能力0","能力1","能力1","能力2"],
                    "targetName":"計測対象1",
                },
                "runnerName":"@Appbird"
            },
            "notResolved":{
                "score":0,
                "regulation":{
                    "gameSystemEnvironment":{
                        "gameDifficultyID":0,
                        "gameModeID":0,
                        "gameSystemID":0,
                    },
                    "abilityIDsOfPlayerCharacters":[0,1,1,2],
                    "targetID":1,
                },
                "runnerID":0,
                "recordID":0
            }
        },
        //*> 2nd Record
        {
            "resolved": {
                "regulation":{
                    "gameSystemEnvironment":{
                        "gameDifficultyName":"難易度0",
                        "gameModeName":"モード0",
                        "gameSystemName":"ゲーム0",
                    },
                    "abilityNamesOfPlayerCharacters":["能力0","能力1","能力1","能力2"],
                    "targetName":"計測対象1",
                },
                "runnerName":"@Appbird"
            },
            "notResolved":{
                "score":0,
                "regulation":{
                    "gameSystemEnvironment":{
                        "gameDifficultyID":0,
                        "gameModeID":0,
                        "gameSystemID":0,
                    },
                    "abilityIDsOfPlayerCharacters":[0,1,1,2],
                    "targetID":0,
                },
                "runnerID":0,
                "recordID":0
            }
        }],
    }]
    /* */
};
generateView(input);

function generateView(input:IReceivedDataFromServer){
    const article = document.getElementById("article");
    if (input.recordGroups === undefined) {
        article?.appendChild(
            element`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
                <div class="c-title__main">データの取得に失敗しました。</div>
            </div>
            <hr noshade class="u-bold">
            <div class="c-stateInfo">${input.message}</div>
        </div>`
        )
        return;
    }
    const recordsData:IRecordGroup[] = input.recordGroups;


    for (const recordData of recordsData) {
        const element = new RecordGroupView(recordData);
        article?.appendChild(element.htmlElement)
    }
    return;
}