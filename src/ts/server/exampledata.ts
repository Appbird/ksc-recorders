import { IRecordDataBase } from "./RecordDataBase";

export const data:IRecordDataBase = {


    "runnersTable" : [
        {
          "id" : 0,"JName" : "ほげ", "EName" : "Hoge",
          "theDateOfRegistered"	: 0,"theNumberOfPost" : 1,
          "twitterID"	: "----", "youtubeID"	: "----", "idOfGameSystemRunnerHavePlayed" : [0], "theDateOfLastPost" :0
        },
        {
            "id" : 1,"JName" : "ふが", "EName" : "Fuga",
            "theDateOfRegistered"	: 0,"theNumberOfPost" : 3,
            "twitterID"	: "----", "youtubeID"	: "----", "idOfGameSystemRunnerHavePlayed" : [0], "theDateOfLastPost" :0
        },
        {
            "id" : 2,"JName" : "ほげふが", "EName" : "HogeFuga",
            "theDateOfRegistered"	: 0,"theNumberOfPost" : 100,
            "twitterID"	: "----", "youtubeID"	: "----", "idOfGameSystemRunnerHavePlayed" : [0], "theDateOfLastPost" :0
        }
    ],


    "gameSystemInfo": [ 
       {
        "id" : 0, "JName" : "日本語作品名", "EName" : "Title Of a kirby's game",
        "JDescription" 	: "ゲームに関する説明を短く記述","EDescription"	: "Description about the game",
        "list"		: { 	
          "AbilityList"       : [ {"id":0,"JName":"能力0","EName":"Ability0"},{"id":1,"JName":"能力1","EName":"Ability1"},{"id":2,"JName":"能力2","EName":"Ability2"} ],
          "TargetList"        : [ {"id":0,"JName":"対象0","EName":"Target0"},{"id":1,"JName":"対象1","EName":"Target1"},{"id":2,"JName":"対象2","EName":"Target2"} ],
          "GameModeList"  	    : [ {"id":0,"JName":"モード0","EName":"Mode0"},{"id":1,"JName":"モード1","EName":"Mode1"},{"id":2,"JName":"モード2","EName":"Mode2"} ],
          "GameDifficultyList" 	: [{"id":0,"JName":"難易度0","EName":"Difficulty0",},{"id":1,"JName":"難易度1","EName":"Difficulty1"},{"id":2,"JName":"難易度2","EName":"Difficulty2"} ]
      },


        "records"	: [
        {
                "recordID" :0, "score" :128,
                "timestamp": 0,
                "regulation" :{
                  "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
                  "abilityIDsOfPlayerCharacters" :[0], "targetID" :0
              },
              "runnerID":0, "tag": [0,2], "link" : ["---","---"], "note" : "---"
        },

        {
            "recordID" :1, "score" :129,
            "timestamp": 1,
            "regulation" :{
              "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
              "abilityIDsOfPlayerCharacters" :[2], "targetID" :1
          },
          "runnerID":0, "tag": [0,2], "link" : ["---","---"], "note" : "---"
        },
        
        {
            "recordID" :2, "score" :133,
            "timestamp": 3,
            "regulation" :{
              "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
              "abilityIDsOfPlayerCharacters" :[1,2], "targetID" :1
          },
          "runnerID":1, "tag": [0,2], "link" : ["---","---"], "note" : "---"
        },
        
        {
            "recordID" :3, "score" :131,
            "timestamp": 4,
            "regulation" :{
              "gameSystemEnvironment"	:{ "gameDifficultyID" :0, "gameModeID" :0, "gameSystemID" :0},
              "abilityIDsOfPlayerCharacters" :[0,1,1,2], "targetID" :0
          },
          "runnerID":0, "tag": [0,2], "link" : ["---","---"], "note" : "---"
        }
    ]
  }]
}
