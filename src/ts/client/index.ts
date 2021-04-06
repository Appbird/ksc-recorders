import App from "./App";

const app = new App();

app.search([{
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
