import { RecordGroupView } from "../view/RecordsCardView";
import { IRecordGroup } from "../type/record/IRecordGroup";
import { IReceivedDataFromClient_AboutRecordExhibition } from "../type/transmission/IReceivedDataFromClient";
import { IReceivedDataFromServer } from "../type/transmission/IReceivedDataFromServer";
import { element } from "../utility/ViewUtility";
//#NOTE 入力例
const origin = "http://localhost:3000";


const requestConditionInJSON = [{
    groupName: "ボス1",
    gameSystemEnv: {
        gameSystemID: 0,
        gameModeID: 0,
        gameDifficultyID: 0,
    },
    orderOfRecordArray:"LowerFirst",
    startOfRecordArray:0,
    limitOfRecordArray:2,
    targetIDs: [1],
    abilityIDs: [],
    abilityIDsCondition: "AND",
    runnerIDs: [],
    language: "Japanese"
},
{
    groupName: "ボス2",
    gameSystemEnv: {
        gameSystemID: 0,
        gameModeID: 0,
        gameDifficultyID: 0,
    },
    orderOfRecordArray:"LowerFirst",
    startOfRecordArray:0,
    limitOfRecordArray:2,
    targetIDs: [0],
    abilityIDs: [],
    abilityIDsCondition: "AND",
    runnerIDs: [],
    language: "Japanese"
}];


fetch(`${origin}/recordDatabase/search/record`,{
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(requestConditionInJSON)
})
.then( (response) => response.json())
.then( (result) => generateView(result))
.catch( (reason) => console.error(reason))

function generateView(input:IReceivedDataFromServer){
    console.log(input);
    const article = document.getElementById("article");
    if (!assureInputHasRecords(input)) {
        displayError(input)
        return;
    }
    const recordsData:IRecordGroup[] = input.recordGroups;

    for (const recordData of recordsData) {
        const element = new RecordGroupView(recordData);
        article?.appendChild(element.htmlElement)
    }
    return;
}
function displayError(input:IReceivedDataFromServer){
    document.getElementById("article")?.appendChild(
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
function assureInputHasRecords(data:IReceivedDataFromServer):data is {
    isSuccess: boolean;
    recordGroups: IRecordGroup[];
}{
    return data.isSuccess;
}