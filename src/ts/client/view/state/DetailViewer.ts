import { APIFunctions } from "../../../type/api/relation";
import { IRecord, IRecordResolved } from "../../../type/record/IRecord";
import { SearchCondition } from "../../../type/record/SearchCondition";
import { choiceString } from "../../../utility/aboutLang";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState, IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { RecordDetailView } from "../parts/RecordDetailView/RecordDetailView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { TagsClickedCallbacks } from "../parts/TagsClickedCallbacks";
import { PageStateBaseClass } from "./PageStateClass";
import { RecordOperation } from "../parts/RecordOperation";

const context = {
    operation:{
        modify:{
            Japanese:"記録を編集する",
            English:"Edit this record"
        },
        delete:{
            Japanese:"記録を削除する",
            English:"Delete this record"
        },
        confirm:{
            Japanese:"この記録を削除します。こうかいしませんね？",
            English:"Are you sure you want to delete this record?",
        }
    }
}
export class S_DetailViewer
    extends PageStateBaseClass<APIFunctions["record_detail"]["atServer"]|{recordResolved:IRecordResolved},IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner()
                const operationDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "operation" }));
                const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
                const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "related" }));
                let record:IRecordResolved;
                if (((value:unknown):value is {recordResolved:IRecordResolved} => this.requiredObj.hasOwnProperty("recordResolved"))(this.requiredObj))
                    record = this.requiredObj.recordResolved;
                else record = (await this.app.accessToAPI("record_detail",this.requiredObj)).result;
                
                const rrg = record.regulation.gameSystemEnvironment;
                const rr = record.regulation;
            
            const condition:SearchCondition = {
                groupName: "", gameSystemEnv: { gameSystemID: rrg.gameSystemID, gameModeID: rrg.gameModeID }, 
                orderOfRecordArray:  "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                targetIDs: [rr.targetID], abilityIDs: rr.abilityIDs, abilityIDsCondition: "AllowForOrder", language: this.app.state.language
            }
            
                const relatedRecord = (await this.app.accessToAPI(
                    "record_search", {
                        condition: [{
                            ...condition,
                            groupName:choiceString({
                                Japanese:"同条件の記録", English:"Records which has same conditions." //#CTODO 英訳
                            },this.app.state.language)
                        }]
                })).result[0];
            let rank: number | undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1;
            const detailView = new RecordDetailView(detailDiv.appendChild(document.createElement("div")),record,{
                rankOfTheRecord:rank,
                language:this.app.state.language,
                onClickRunnerName:() => {
                    if (!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) return;
                    this.app.transition("userPageInSpecific",{...this.app.state.gameSystemEnvDisplayed,runnerID:record.runnerID})
                },
                clickedCallBacks:generateClickedTagsCallBacks(this.app,record,condition)
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
            this.deleteLoadingSpinner();
            if (this.app.loginAdministratorReadOnly.isUserLogin) this.prepareOperation(operationDiv,record)
            
           
        }
        private prepareOperation(operationDiv:HTMLElement,record:IRecord){
            const privilege = (() => {
                if (this.app.loginAdministratorReadOnly.loginUserID === record.runnerID) return "Owner"
                if (this.app.loginAdministratorReadOnly.userInformation.isCommitteeMember) return "ComitteeMember"
                return undefined;
            })()
            if (privilege === undefined) return;
            new RecordOperation(operationDiv,this.app.state.language,privilege,(err)=>this.app.errorCatcher(err),[{
                text:context.operation.modify,
                iconClass:"fas fa-star",
                color:"green",
                callback: () =>this.moveToModifyRecord(record)
            },{
                text:context.operation.delete,
                iconClass:"fas fa-trash-alt",
                color:"red",
                //#CTODO notieに確認ウィンドウを付け、その後modify_recordとremove_recordを実装する。
                callback: () => this.confirmWhenDelete(record)

            }])
        }
        private moveToModifyRecord(record:IRecord){
            if(!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) return;
            this.app.transition("modifyRecordForm",{targetGameMode:this.app.state.gameSystemEnvDisplayed,id:record.id})

        }
        
        private confirmWhenDelete(record:IRecord){
            this.app.notie.confirmAlert({
                text:context.operation.confirm, 
                okCallback:()=>this.deleteRecord(record)}
            )
        }
        private async deleteRecord(record:IRecord){
            if(!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) return;
            await this.app.accessToAPI("record_delete",{
                gameSystemEnv: {
                    gameModeID:this.app.state.gameModeIDDisplayed, gameSystemID:this.app.state.gameSystemIDDisplayed
                },
                recordID:record.id,
                IDToken: await this.app.loginAdministratorReadOnly.getIDToken()
            })
            
            this.app.notie.successAlert({
                Japanese:"削除されました",
                English:"the Record is now deleted."
            })
            this.app.transition("mainMenu",null)
        }
        
}



export function generateClickedTagsCallBacks(app:IAppUsedToReadAndChangeOnlyPageState,detail:IRecordResolved,baseCondition:SearchCondition):TagsClickedCallbacks{
    return {
        gameSystem: () => {
            baseCondition.gameSystemEnv.gameDifficultyID = detail.regulation.gameSystemEnvironment.gameDifficultyID
            baseCondition.targetIDs = [], 
            app.transition("searchResultView",{
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
        target: () => app.transition("searchResultView",{
            condition:[{
                ...baseCondition,
                groupName:choiceString({Japanese:"同じ計測対象の記録",English:"Records which have a same target"},app.state.language),
                limitOfRecordArray: 3,
                abilityIDs:[],
            }]
        }),
        ability: () => app.transition("searchResultView",{
            condition:[{
                ...baseCondition,
                groupName:choiceString({Japanese:"同じ能力を使った記録",English:"Records which use same abilities"},app.state.language),
                limitOfRecordArray: 3,
                targetIDs:[]
            }]
        }),
        hashTag: () => app.transition("searchResultView",{
            condition:[{
                ...baseCondition,
                groupName:choiceString({Japanese:"同じハッシュタグをもつ記録",English:"Records which have same hashTag"},app.state.language),
                limitOfRecordArray: 3,
                tagIDs:detail.tagID
            }]
        })
}
}