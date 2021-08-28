import { APIFunctions } from "../../../type/api/relation";
import { IRecord, IRecordResolved } from "../../../type/record/IRecord";
import { SearchCondition } from "../../../type/record/SearchCondition";
import { choiceString } from "../../../utility/aboutLang";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { IAppUsedToChangeState, IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement, createElementWithIdAndClass } from "../../utility/aboutElement";
import { RecordDetailView } from "../parts/RecordDetailView/RecordDetailView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { TagsClickedCallbacks } from "../parts/Interface/TagsClickedCallbacks";
import { PageStateBaseClass } from "./Base/PageStateClass";
import { RecordOperation } from "../parts/RecordOperation";
import { PageTitleView } from "../parts/PageTitleView";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { NoticeView } from "../parts/notice";

const context = {
    header:{
        Japanese:"記録の基本情報",
        English:"Basic Information of the Record"
    },
    notice:{
        Japanese:"URLをコピーすれば、他の人とこの記録を共有できます！",
        English:"You can share this record by copying the URL!"
    },
    operation:{
        modify:{
            Japanese:"記録を編集する",
            English:"Edit this record"
        },
        delete:{
            Japanese:"記録を削除する",
            English:"Delete this record"
        },
        verify:{
            Japanese:"記録を承認する",
            English:"Verify this record"
        },
        confirm_delete:{
            Japanese:"この記録を削除します。こうかいしませんね？",
            English:"Are you sure you want to delete this record?",
        },
        confirm_verify:{
            Japanese:"この記録を承認しますか？",
            English:"Are you sure you want to verify this record?",
        }
    }
}
export class S_DetailViewer
    extends PageStateBaseClass<APIFunctions["record_detail"]["atServer"]&{needRedirectToUnverifiedRecordList?:boolean},IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner()
            const notice = new NoticeView(appendElement(this.articleDOM,"div"),"detailView","portableURL",context.notice,this.app.state.language) 
            const operationDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "operation" }));
            const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
            const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "related" }));
            const record:IRecordResolved = (await this.app.accessToAPI("record_detail",this.requiredObj)).result;
            
            const rrg = record.regulation.gameSystemEnvironment;
            const rr = record.regulation;
            const title = new PageTitleView(
                appendElement(detailDiv,"div"),
                choiceString(context.header,this.app.state.language),
                "",
                "fas fa-info-circle"
            );
            const condition:SearchCondition = {
                groupName: "", gameSystemEnv: { gameSystemID: rrg.gameSystemID, gameModeID: rrg.gameModeID }, 
                orderOfRecordArray:  "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                targetIDs: [rr.targetID], abilityIDs: rr.abilityIDs, abilityIDsCondition: "AllowForOrder", language: this.app.state.language
            }

            const detailView = new RecordDetailView(
                detailDiv.appendChild(document.createElement("div")),record,{
                language:this.app.state.language,
                onClickRunnerName:(runnerID) => this.app.transition("userPageInSpecific",{gameSystem,gameMode,runnerID}),
                clickedCallBacks:generateClickedTagsCallBacks(this.app,record,condition),
                verifiedTime: this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember ? "time" : "date"
            });

            const gameSystem = (await this.app.accessToAPI("list_gameSystem",{id:rrg.gameSystemID})).result
            const gameMode = (await this.app.accessToAPI("list_gameMode",{gameSystemEnv:{gameSystemID:rrg.gameSystemID},id:rrg.gameModeID})).result

            if (this.app.loginAdministratorReadOnly.isUserLogin) this.prepareOperation(operationDiv,record,gameSystem,gameMode)

            const relatedRecord = (await this.app.accessToAPI(
                "record_search", {
                    condition: [{
                        ...condition,
                        groupName:choiceString({
                            Japanese:"同条件の記録", English:"Records in the same conditions"
                        },this.app.state.language)
                    }]
            })).result[0];
        
            let rank: number | undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1;
           
            new RecordGroupView(relatedRecordDiv.appendChild(document.createElement("div")),relatedRecord,gameMode.scoreType,{
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
            detailView.setRank(rank)
            this.deleteLoadingSpinner();
            
           
        }
        private prepareOperation(operationDiv:HTMLElement,record:IRecord,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            
            const privilege:Privilege[] = []
            if (this.app.loginAdministratorReadOnly.loginUserID === record.runnerID) privilege.push("Owner")
            if (this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember) privilege.push("ComitteeMember")
            if (privilege === undefined) return;
            new RecordOperation(operationDiv,this.app.state.language,privilege,(err)=>this.app.errorCatcher(err),[
            {
                text: context.operation.verify,
                iconClass: "fas fa-check",
                color: "blue",
                callback: () => this.confirmWhenVerify(record,operationDiv,gameSystem,gameMode),
                enable: privilege.includes("ComitteeMember") && ( record.moderatorIDs === undefined || record.moderatorIDs.length === 0)
            },{
                text:context.operation.modify,
                iconClass:"fas fa-star",
                color:"green",
                callback: () => this.moveToModifyRecord(record,gameSystem,gameMode),
                enable: privilege.includes("Owner") || privilege.includes("ComitteeMember")
            },{
                text:context.operation.delete,
                iconClass:"fas fa-trash-alt",
                color:"red",
                //#CTODO notieに確認ウィンドウを付け、その後modify_recordとremove_recordを実装する。
                callback: () => this.confirmWhenDelete(record,operationDiv,gameSystem,gameMode),
                enable: privilege.includes("Owner") || privilege.includes("ComitteeMember")
            }])
        }
        private moveToModifyRecord(record:IRecord,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            this.app.changeTargetGameMode({gameMode,gameSystem})
            this.app.transition("modifyRecordForm",{targetGameMode:{gameMode,gameSystem},id:record.id})

        }
        
        private confirmWhenDelete(record:IRecord,operationDiv:HTMLElement,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            this.app.notie.reasonInputerAleart({
                text:context.operation.confirm_delete, 
                okCallback:async (reason:string)=>{
                    this.generateLoadingSpinner()
                    operationDiv.classList.add("u-unused")
                    await this.deleteRecord(record,reason,gameSystem,gameMode)
                    this.deleteLoadingSpinner()
                },
                placeholder:{
                    Japanese: "ここに削除する理由を簡単に記入して下さい。",
                    English: "Enter the reason why you delete this record in short."
                }
            }
            )
        }
        private confirmWhenVerify(record:IRecord,operationDiv:HTMLElement,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            this.app.notie.confirmAlert({
                text:context.operation.confirm_verify, 
                okCallback:async ()=>{
                    this.generateLoadingSpinner()
                    operationDiv.classList.add("u-unused")
                    await this.verifyRecord(record,gameSystem,gameMode).catch((err) => this.app.errorCatcher(err))
                    this.deleteLoadingSpinner()
                }
            })
        }
        private async deleteRecord(record:IRecord,reason:string,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            if(!StateAdministrator.checkGameSystemEnvIsSet({gameMode,gameSystem})) return;
            try {
                await this.app.accessToAPI("record_delete",{
                    gameSystemEnv: {
                        gameModeID:gameMode.id, gameSystemID:gameSystem.id
                    },
                    recordID:record.id,
                    IDToken: await this.app.loginAdministratorReadOnly.getIDToken(),
                    reason
                })
            
                this.app.notie.successAlert({
                    Japanese:"削除されました",
                    English:"the Record is now deleted."
                })
                this.app.transition("mainMenu",null)
            } catch(err) {
                this.app.errorCatcher(err)
            }
        }
        private async verifyRecord(record:IRecord,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections){
            try {
                await this.app.accessToAPI("record_moderate",{
                    gameSystemEnv: {
                        gameModeID:gameMode.id, gameSystemID:gameSystem.id
                    },
                    recordId:record.id,
                    IDToken: await this.app.loginAdministratorReadOnly.getIDToken()
                })
                this.app.notie.successAlert({
                    Japanese:"この記録は承認されました！",
                    English:"The record is now verified!"
                })
                const rrg = record.regulation.gameSystemEnvironment
                if (this.requiredObj.needRedirectToUnverifiedRecordList){
                    this.app.transition("unverifiedRecord",{gameSystem, gameMode})
                    return
                }
                this.app.transition("detailView",{id:record.id,gameSystemEnv:{gameSystemID:rrg.gameSystemID, gameModeID:rrg.gameModeID},lang:this.app.state.language})
            }catch(err){
                this.app.errorCatcher(err)
            }
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
                groupName:choiceString({Japanese:"同セグメントの記録",English:"Records in the same segment."},app.state.language),
                limitOfRecordArray: 3,
                abilityIDs:[],
            }]
        }),
        ability: () => app.transition("searchResultView",{
            condition:[{
                ...baseCondition,
                groupName:choiceString({Japanese:"同じ能力を使った記録",English:"Records which use the same abilities"},app.state.language),
                limitOfRecordArray: 3,
                targetIDs:[]
            }]
        }),
        hashTag: (tagIndex) => (() => app.transition("searchResultView",{
            condition:[{
                ...baseCondition,
                groupName:choiceString({Japanese:`タグ「${detail.tagName[tagIndex]}」をもつ記録`,English:`Records which have the hashTag "${detail.tagName[tagIndex]}"`},app.state.language),
                limitOfRecordArray: 3,
                tagIDs:[detail.tagID[tagIndex]]
            }]
        }))
}
}

export type Privilege = "Owner" | "ComitteeMember"