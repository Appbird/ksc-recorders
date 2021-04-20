"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var articleDOM = document.getElementById("article");
if (articleDOM === null)
    throw new Error("idがarticleである要素を見つけられませんでした。");
var app = new App_1.default(articleDOM, "Japanese");
/*
(async () => {
    const result1 = (await app.accessToAPI("list_gameSystem",{id:"0"})).result
    const result2 = (await app.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:"0"},id:"0"})).result
    app.transition("offerForm",{targetGameMode:{gameSystem:result1,gameMode:result2},runnerID:"0"})
    app.transition("searchConditionSelectorView",{gameSystem:result1,gameMode:result2})
})();
/* */
app.transition("spinnerExhibition", null);
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
