import { IRecordDataBase } from "../type/IRecordDataBase";
import { recordsData } from "./exampleRecords";

export const exampleData:IRecordDataBase = {


    "runners" : [
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


    "titles": [ 
       {
        "id" : "0", "JName" : "星のカービィ スターアライズ", "EName" : "Kirby Star Allies",
        "JDescription" 	: "なかまを とっかえひっかえして だいぼうけん。フレンズ能力で 道をきりひらけ！","EDescription"	: "Description about the game",
        "dateOfLatestPost":744300400000,
        "runnersNumber":2,
        "recordsNumber":4,
        "icooonName":"heart",
        "tags":           [{"id":"0","JName":"だいしゃりん","EName":"tag0"}],
        "releasedDate": 1521298800000,
        "modes"		:  [ {
          "id":"0",
          "JName":"Theアルティメットチョイス",
          "EName":"The Ultimate Choice",
          "icooonName":"difficulty",
          "dateOfLatestPost":744300400000,
          "maxNumberOfPlayer":2,
          "runnersNumber":2,
          "recordsNumber":4,
          "scoreType":"time",
          "targets"        : [ {"id":"0","JName":"対象0","EName":"Target0"},{"id":"1","JName":"対象1","EName":"Target1"},{"id":"2","JName":"対象2","EName":"Target2"} ],
          "abilities"       : [ {"id":"0","JName":"能力0","EName":"Ability0"},{"id":"1","JName":"能力1","EName":"Ability1"},{"id":"2","JName":"能力2","EName":"Ability2"} ],
          "difficulties" 	: [ {"id":"0","JName":"難易度0","EName":"Difficulty0","TargetIDsIncludedInTheDifficulty":["0","1"]},
                              {"id":"1","JName":"難易度1","EName":"Difficulty1","TargetIDsIncludedInTheDifficulty":["0","1","2"]},
                              {"id":"2","JName":"難易度2","EName":"Difficulty2","TargetIDsIncludedInTheDifficulty":["0","1","2"]} 
                            ],
          "offers":[],
          "records"	: recordsData
        },{
          "id":"0",
          "JName":"○○○○でゴー！",
          "EName":"----",
          "dateOfLatestPost":744300400000,
          "maxNumberOfPlayer":2,
          "runnersNumber":2,
          "icooonName":"heart",
          "recordsNumber":4,
          "scoreType":"time",
          "targets"        : [ {"id":"0","JName":"対象0","EName":"Target0"},{"id":"1","JName":"対象1","EName":"Target1"},{"id":"2","JName":"対象2","EName":"Target2"} ],
          "abilities"       : [ {"id":"0","JName":"能力0","EName":"Ability0"},{"id":"1","JName":"能力1","EName":"Ability1"},{"id":"2","JName":"能力2","EName":"Ability2"} ],
          "difficulties" 	: [ {"id":"0","JName":"難易度0","EName":"Difficulty0","TargetIDsIncludedInTheDifficulty":["0","1"]},
                              {"id":"1","JName":"難易度1","EName":"Difficulty1","TargetIDsIncludedInTheDifficulty":["0","1","2"]},
                              {"id":"2","JName":"難易度2","EName":"Difficulty2","TargetIDsIncludedInTheDifficulty":["0","1","2"]} 
                            ],
          "offers":[],
          "records"	: recordsData
        }]
      },
        {
          "id" : "1", "JName" : "星のカービィ ロボボプラネット", "EName" : "Kirby:Robobot Planet",
          "JDescription" 	: "キカイ化された ポップスターを 相棒ロボボとともに つきすすめ！","EDescription"	: "Description about the game",
          "dateOfLatestPost": 744300400000,
          "releasedDate": 1461682800000,
          "runnersNumber":0,
          "icooonName":"gear",
          "recordsNumber":0,"tags":[{"id":"0","JName":"だいしゃりん","EName":"tag0"}],
          "modes"		:  [ {
            "id":"0",
            "JName":"真 かちぬきボスバトル",
            "EName":"The True Arena",
            "dateOfLatestPost":744300400000,
            "maxNumberOfPlayer":2,
            "runnersNumber":2,
            "recordsNumber":4,
            "scoreType":"time",
            "icooonName":"punch",
            "targets"        : [ {"id":"0","JName":"対象0","EName":"Target0"},{"id":"1","JName":"対象1","EName":"Target1"},{"id":"2","JName":"対象2","EName":"Target2"} ],
            "abilities"       : [ {"id":"0","JName":"能力0","EName":"Ability0"},{"id":"1","JName":"能力1","EName":"Ability1"},{"id":"2","JName":"能力2","EName":"Ability2"} ],
            "difficulties" 	: [ {"id":"0","JName":"難易度0","EName":"Difficulty0","TargetIDsIncludedInTheDifficulty":["0","1"]},
                                {"id":"1","JName":"難易度1","EName":"Difficulty1","TargetIDsIncludedInTheDifficulty":["0","1","2"]},
                                {"id":"2","JName":"難易度2","EName":"Difficulty2","TargetIDsIncludedInTheDifficulty":["0","1","2"]} 
                              ],
            "offers":[],
            "records"	: []
          }],
    
        }
  ]
}
