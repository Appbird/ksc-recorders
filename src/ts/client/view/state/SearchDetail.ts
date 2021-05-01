import { APIFunctions } from "../../../type/api/relation";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { IRecordResolved } from "../../../type/record/IRecord";
import { SearchCondition } from "../../../type/record/SearchCondition";
import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { RecordDetailView } from "../parts/RecordDetailView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { TagsClickedCallbacks } from "../parts/TagsClickedCallbacks";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SearchDetail
    extends PageStateBaseClass<APIFunctions["record_detail"]["atServer"],IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
            const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "related" }));
            const record = (await this.app.accessToAPI("record_detail",this.requiredObj)).result;
            
            const rrg = record.regulation.gameSystemEnvironment;
            const rr = record.regulation;

            const condition:SearchCondition = {
                groupName: "", gameSystemEnv: { gameSystemID: rrg.gameSystemID, gameModeID: rrg.gameModeID }, 
                orderOfRecordArray:  "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                targetIDs: [rr.targetID], abilityIDs: rr.abilityIDs, abilityIDsCondition: "AllowForOrder", language: this.requiredObj.lang
            }

            const relatedRecord = (await this.app.accessToAPI(
                    "record_search", {
                        condition: [{
                            ...condition,
                            groupName:choiceString({
                                Japanese:"同レギュレーションの記録", English:"" //#TODO 英訳
                            },this.app.state.language)
                        }]
                })).result[0];
    
            let rank: number | undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1;
            const detailView = new RecordDetailView(detailDiv.appendChild(document.createElement("div")),record,{
                rankOfTheRecord:rank,
                language: this.app.state.language,
                clickedCallBacks:this.generateClickedCallBacks(record,condition)
            });
            new RecordGroupView(relatedRecordDiv.appendChild(document.createElement("div")),relatedRecord,this.app.state.scoreType,{
                clickOnCardEventListener: (recordClicked) => {
                    this.app.transition("detailView",{
                        gameSystemEnv:{
                            gameModeID: recordClicked.regulation.gameSystemEnvironment.gameModeID,
                            gameSystemID: recordClicked.regulation.gameSystemEnvironment.gameSystemID
                        },
                        lang:this.app.state.language,
                        id:recordClicked.id
                    })
                } 
            });
        
        }
        private generateClickedCallBacks(detail:IRecordResolved,baseCondition:SearchCondition):TagsClickedCallbacks{
            return {
                gameSystem: () => {
                    baseCondition.gameSystemEnv.gameDifficultyID = detail.regulation.gameSystemEnvironment.gameDifficultyID
                    baseCondition.targetIDs = [], 
                    this.app.transition("searchResultView",{
                        condition:[{
                            ...baseCondition,
                            gameSystemEnv:{
                                ...baseCondition.gameSystemEnv,
                                gameDifficultyID:detail.regulation.gameSystemEnvironment.gameDifficultyID
                            },
                            limitOfRecordArray: 3,
                            targetIDs:[],abilityIDs:[]
                    }]})
                },
                target: () => this.app.transition("searchResultView",{
                    condition:[{
                        ...baseCondition,
                        limitOfRecordArray: 3,
                        abilityIDs:[],
                    }]
                }),
                ability: () => this.app.transition("searchResultView",{
                    condition:[{
                        ...baseCondition,
                        limitOfRecordArray: 3,
                        targetIDs:[]
                    }]
                }),
                hashTag: () => this.app.transition("searchResultView",{
                    condition:[{
                        ...baseCondition,
                        limitOfRecordArray: 3,
                        tagIDs:detail.tagID
                    }]
                })
        }
    }
}