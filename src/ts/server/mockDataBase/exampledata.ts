import { IRecordDataBase } from "../type/IRecordDataBase";
import { recordsData } from "./exampleRecords";

export const exampleData:IRecordDataBase = {


    "runnersTable" : [
        {
          "id" : "0","JName" : "ほげ", "EName" : "Hoge",
          "theDateOfRegistered"	: 0,"theNumberOfPost" : 1,
          "twitterID"	: "----", "youtubeID"	: "----", "idOfGameSystemRunnerHavePlayed":["0"],"idOfGameModeRunnerHavePlayed" : ["0/0"], "theDateOfLastPost" :0,
          "isCommitteeMember":false, "isMuted":false
        },
        {
            "id" : "1","JName" : "ふが", "EName" : "Fuga",
            "theDateOfRegistered"	: 0,"theNumberOfPost" : 3,
            "twitterID"	: "----", "youtubeID"	: "----","idOfGameSystemRunnerHavePlayed":["0"], "idOfGameModeRunnerHavePlayed" : ["0/0"], "theDateOfLastPost" :0,
            "isCommitteeMember":false, "isMuted":false
        },
        {
            "id" : "2","JName" : "ほげふが", "EName" : "HogeFuga",
            "theDateOfRegistered"	: 0,"theNumberOfPost" : 100,
            "twitterID"	: "----", "youtubeID"	: "----","idOfGameSystemRunnerHavePlayed":["0"], "idOfGameModeRunnerHavePlayed" : ["0/0"], "theDateOfLastPost" :0,
            "isCommitteeMember":false, "isMuted":false
        }
    ],


    "gameSystemInfo": [ 
       {
        "id" : "0", "JName" : "日本語作品名", "EName" : "Title Of a kirby's game",
        "JDescription" 	: "ゲームに関する説明を短く記述","EDescription"	: "Description about the game",
        "dateOfLatestPost":744300400000,
        "runnersNumber":2,
        "recordsNumber":4,

        "tags":           [{"id":"0","JName":"だいしゃりん","EName":"tag0"}],
        "modes"		:  [ {
          "id":"0",
          "JName":"モード0",
          "EName":"Mode0",
          "targets"        : [ {"id":"0","JName":"対象0","EName":"Target0"},{"id":"1","JName":"対象1","EName":"Target1"},{"id":"2","JName":"対象2","EName":"Target2"} ],
          "abilities"       : [ {"id":"0","JName":"能力0","EName":"Ability0"},{"id":"1","JName":"能力1","EName":"Ability1"},{"id":"2","JName":"能力2","EName":"Ability2"} ],
          "difficulties" 	: [ {"id":"0","JName":"難易度0","EName":"Difficulty0","TargetIDsIncludedInTheDifficulty":["0","1"]},
                              {"id":"1","JName":"難易度1","EName":"Difficulty1","TargetIDsIncludedInTheDifficulty":[]},
                              {"id":"2","JName":"難易度2","EName":"Difficulty2","TargetIDsIncludedInTheDifficulty":[]} 
                            ],
          "records"	: recordsData
        }],
        
  }]
}
