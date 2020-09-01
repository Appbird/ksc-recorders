import { AbilityList, TargetList, gameSystemList, gameModeList, gameDifficultyList } from "./list/Lists";
import { RecordCardsView } from "./view/RecordsCardView";
import { IRecordGroup } from "./type/record/IRecordGroup";

const input = `{
    "recordGroup":{
        "groupName":"ウィスピーウッズ",
        "groupSubName":"1戦目",
        "lastPost":"1992/04/27 06:00",
        "numberOfRecords":3,
        "numberOfRunners":2,
        "records":[{
            "timeInMilliseconds":0,
            "regulation":{
                "gameSystemEnvironment":{
                    "gameDifficultyID":0,
                    "gameModeID":0,
                    "gameSystemID":0
                },
                "abilityIDsOfPlayerCharacters":[0,1,1,2],
                "targetID":0
            },
            "runnerID":0,
            "runnerName":"user00000",
            "recordID":0
        },{
            "timeInMilliseconds":0,
            "regulation":{
                "gameSystemEnvironment":{
                    "gameDifficultyID":0,
                    "gameModeID":0,
                    "gameSystemID":0
                },
                "abilityIDsOfPlayerCharacters":[0,1,1,2],
                "targetID":0
            },
            "runnerID":0,
            "runnerName":"user00000",
            "recordID":0
        },{
            "timeInMilliseconds":0,
            "regulation":{
                "gameSystemEnvironment":{
                    "gameDifficultyID":0,
                    "gameModeID":0,
                    "gameSystemID":1
                },
                "abilityIDsOfPlayerCharacters":[0,2,2,2],
                "targetID":0
            },
            "runnerID":0,
            "runnerName":"user00000",
            "recordID":0
        }]
    
    },
    "list":{
        "AbilityList"       : [ {"id":0,"JName":"能力0","EName":"Ability0"},
                            {"id":1,"JName":"能力1","EName":"Ability1"},
                            {"id":2,"JName":"能力2","EName":"Ability1"}],

        "TargetList"        : [ {"id":0,"JName":"対象0","EName":"Target0"},
                            {"id":1,"JName":"対象1","EName":"Target1"},
                            {"id":2,"JName":"対象2","EName":"Target2"}],

        "GameSystemList"    : [ {"id":0,"JName":"ゲーム0","EName":"GameSystem0"},
                            {"id":1,"JName":"ゲーム1","EName":"GameSystem1"},
                            {"id":2,"JName":"ゲーム2","EName":"GameSystem2"}],

        "GameModeList"  : [ {"id":0,"JName":"モード0","EName":"Mode1"},
                            {"id":1,"JName":"モード1","EName":"Mode2"},
                            {"id":2,"JName":"モード2","EName":"Mode3"}],

        "GameDifficultyList" : [{"id":0,"JName":"難易度0","EName":"Difficulty0"},
                                {"id":1,"JName":"難易度1","EName":"Difficulty1"},
                                {"id":2,"JName":"難易度2","EName":"Difficulty2"}]
    }
}`;

const inputObject = JSON.parse(input)
const recordsData:IRecordGroup = inputObject.recordGroup;

AbilityList.list        = inputObject.list.AbilityList;
TargetList.list         = inputObject.list.TargetList;
gameSystemList.list     = inputObject.list.GameSystemList;
gameModeList.list       = inputObject.list.GameModeList;
gameDifficultyList.list = inputObject.list.GameDifficultyList;
const element = new RecordCardsView(recordsData);
document.getElementById("article")?.appendChild(element.htmlElement);