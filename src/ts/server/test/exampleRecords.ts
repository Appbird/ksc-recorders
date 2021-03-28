import { IRecord } from "../../type/record/IRecord";

//#TODO id群をしっかりnumberからstringに変えておく
export const recordsData:IRecord[] = [
    {
            "id" :0, "score" :128,
            "timestamp": 724300400000,
            "regulation" :{
              "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
              "abilityIDsOfPlayerCharacters" :[0], "targetID" :0
          },
          "runnerID":0, "tagID": [], "link" : ["---","---"], "note" : "---"
    },

    {
        "id" :1, "score" :129,
        "timestamp": 734300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
          "abilityIDsOfPlayerCharacters" :[2], "targetID" :1
      },
      "runnerID":0, "tagID": [], "link" : ["---","---"], "note" : "---"
    },
    
    {
        "id" :2, "score" :133,
        "timestamp": 744300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
          "abilityIDsOfPlayerCharacters" :[1,2], "targetID" :1
      },
      "runnerID":1, "tagID": [], "link" : ["---","---"], "note" : "---"
    },
    
    {
        "id" :3, "score" :131,
        "timestamp": 704300400000,
        "regulation" :{
          "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
          "abilityIDsOfPlayerCharacters" :[0,1,1,2], "targetID" :0
      },
      "runnerID":0, "tagID": [], "link" : ["---","---"], "note" : "---"
    }
]