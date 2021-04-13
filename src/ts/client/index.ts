import App from "./App";
const articleDOM =  document.getElementById("article")
if (articleDOM === null) throw new Error("idがarticleである要素を見つけられませんでした。")

const app = new App("none",articleDOM,"Japanese");

app.transition("searchResultView",{
    required:{condition:[{
        groupName: "ボス1",
        gameSystemEnv: {gameSystemID: "0",gameModeID: "0"},
        orderOfRecordArray:"LowerFirst",
        targetIDs: ["1"],
        abilityIDsCondition: "AND",
        language: "Japanese"
    }]},
    title:"検索結果"    
    }
    
)

/* app.detail({
    gameSystemEnv:{
        gameSystemID:"0",
        gameModeID:"0"
    },
    id:"0",
    lang:"Japanese"
})
*/
/* app.search([{
    groupName: "ボス1",
    gameSystemEnv: {
        gameSystemID: "0",
        gameModeID: "0"
    },
    orderOfRecordArray:"LowerFirst",
    startOfRecordArray:0,
    limitOfRecordArray:2,
    targetIDs: ["1"],
    abilityIDs: [],
    abilityIDsCondition: "AND",
    runnerIDs: [],
    language: "Japanese"
},{
    groupName: "ボス1",
    gameSystemEnv: {
        gameSystemID: "0",
        gameModeID: "0"
    },
    orderOfRecordArray:"LowerFirst",
    startOfRecordArray:0,
    limitOfRecordArray:2,
    targetIDs: ["1"],
    abilityIDs: [],
    abilityIDsCondition: "AND",
    runnerIDs: [],
    language: "Japanese"
}])
*/