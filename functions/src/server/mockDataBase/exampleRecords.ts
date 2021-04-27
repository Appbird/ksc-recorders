import { IRecord } from "../../../../src/ts/type/record/IRecord";

//#CTODO id群をしっかりnumberからstringに変えておく
export const recordsData:IRecord[] = [
    {
            "id" :"0", "score" :128,
            "timestamp_post": 724300400000,
            "timestamp_approval":724300400000,
            "regulation" :{
              "gameSystemEnvironment"	:{ "gameDifficultyID" :"0", "gameModeID" :"0", "gameSystemID" :"0"},
              "abilityIDs" :["0"], "targetID" :"0"
          },
          "runnerID":"0", "tagID": ["0","0"], "link" : ["https://twitter.com/projectappbird/status/1381908217932902407?s=20"], "note" : "# ノート\n\nあいうえお"
    },

    {
        "id" :"1", "score" :129,
        "timestamp_post": 734300400000,
        "timestamp_approval":724300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :"0", "gameModeID" :"0", "gameSystemID" :"0"},
          "abilityIDs" :["2"], "targetID" :"1"
      },
      "runnerID":"0", "tagID": [], "link" : ["https://twitter.com/projectappbird/status/1381908217932902407?s=20"], "note" : "---"
    },
    
    {
        "id" :"2", "score" :133,
        "timestamp_post": 744300400000,
        "timestamp_approval":724300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :"0", "gameModeID" :"0", "gameSystemID" :"0"},
          "abilityIDs" :["1","2"], "targetID" :"1"
      },
      "runnerID":"1", "tagID": [], "link" : ["https://twitter.com/projectappbird/status/1381908217932902407?s=20"], "note" : "---"
    },
    
    {
        "id" :"3", "score" :131,
        "timestamp_post": 704300400000,
        "timestamp_approval":724300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :"0", "gameModeID" :"0", "gameSystemID" :"0"},
          "abilityIDs" :["0","1","1","2"], "targetID" :"0"
      },
      "runnerID":"1", "tagID": [], "link" : ["https://twitter.com/projectappbird/status/1381617843133771776?s=20"], "note" : "---"
    }
]