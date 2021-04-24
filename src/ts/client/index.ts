import App from "./App";
const articleDOM =  document.getElementById("article")
if (articleDOM === null) throw new Error("idがarticleである要素を見つけられませんでした。")

const app = new App(articleDOM,"Japanese");

(async () => {
    const result1 = (await app.accessToAPI("list_gameSystem",{id:"0"})).result
    const result2 = (await app.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:"0"},id:"0"})).result
    await app.transition("offerForm",{targetGameMode:{gameSystem:result1,gameMode:result2},runnerID:"0"})
})();
/* */
//app.transition("gameSystemSelector",null);


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