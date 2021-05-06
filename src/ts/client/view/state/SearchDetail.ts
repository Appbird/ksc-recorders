import { APIFunctions } from "../../../type/api/relation";
import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { IRecord, IRecordResolved } from "../../../type/record/IRecord";
import { SearchCondition } from "../../../type/record/SearchCondition";
import { choiceString } from "../../../utility/aboutLang";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { StateAdministrator } from "../../Administrator/StateAdminister";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement, createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { RecordDetailView } from "../parts/RecordDetailView";
import { RecordGroupView } from "../parts/RecordsGroupView";
import { TagsClickedCallbacks } from "../parts/TagsClickedCallbacks";
import { PageStateBaseClass } from "./PageStateClass";

export class S_DetailViewer
    extends PageStateBaseClass<APIFunctions["record_detail"]["atServer"]|{recordResolved:IRecordResolved},IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            this.generateLoadingSpinner()
                const operationDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
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
                language: this.app.state.language,
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


            new RecordOperation(operationDiv,this.app.state.language,[{
                text:{
                    Japanese:"記録を編集する",
                    English:"Edit this record"
                },
                iconClass:"fas fa-star",
                color:"green",
                callback: () =>{ 
                    if(!StateAdministrator.checkGameSystemEnvIsSet(this.app.state.gameSystemEnvDisplayed)) return;
                    this.app.transition("modifyRecordForm",{targetGameMode:this.app.state.gameSystemEnvDisplayed,id:record.id})
                }
            },{
                text:{
                    Japanese:"記録を削除する",
                    English:"Delete this record"
                },
                iconClass:"fas fa-star",
                color:"red",
                //#TODO notieに確認ウィンドウを付け、その後modify_recordとremove_recordを実装する。
                callback: () => this.app.notie

            }])
        }
        
}

class RecordOperation implements IView{
    private container:HTMLElement;
    private buttonsSegment:HTMLElement;
    private htmlC:HTMLConverter
    constructor(container:HTMLElement,language:LanguageInApplication,
        buttonInfo:{text:MultiLanguageString,iconClass:string,color:string,callback:()=>void}[]
    ){
        this.container = container;
        this.container.classList.add("c-operationSegment");
        const header = this.container.appendChild(createElementWithIdAndClass({className:"__title"}))
        header.textContent = choiceString({
            Japanese:"特殊操作",
            English:"Special Operation"
        },language)
        this.buttonsSegment= this.container.appendChild(createElementWithIdAndClass({className:"c-operationButtons u-marginUpDown2emToChildren"}))

        this.htmlC = new HTMLConverter(language);
        
        for (const operation of this.operations()) this.append(operation)
    }
    private append({text,iconClass,color,callback}:{text:MultiLanguageString,iconClass:string,color:string,callback:()=>void}){
        this.buttonsSegment.appendChild(this.htmlC.elementWithoutEscaping`
            <div class="__button --${color}">
                <div class="__icon"><i class="${iconClass}"></i></div>
                <div class="__text"><p>${text}<p></div>
            </div>
        ` as HTMLElement).addEventListener("click",() => callback())
    }
    destroy(){
        this.container.innerHTML = "";
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