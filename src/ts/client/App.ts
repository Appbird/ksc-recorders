import { IReceivedDataAtClient_recordSearchSuccessfully, IReceivedDataAtServer_recordSearch } from "../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtClient_recordDetailSuccessfully, IReceivedDataAtServer_recordDetail } from "../type/transmission/record/IReceivedData_recordDetail";
import { elementWithoutEscaping } from "../utility/ViewUtility";
import { PageStates } from "./interface/PageStates";
import { IAppOnlyUsedToTransition, IAppUsedToReadOptionsAndTransition } from "./interface/AppInterfaces";
import { RecordGroupView } from "./view/RecordsGroupView";
import { RecordDetailView } from "./view/RecordDetailView";
import { createElementWithIdAndClass } from "./utility/aboutElement";
import { LanguageInApplication } from "../server/type/LanguageInApplication";
const marked = require("marked");

interface APIFunctions {
    record_search:{required:IReceivedDataAtServer_recordSearch[], returned:IReceivedDataAtClient_recordSearchSuccessfully[]},
    record_detail:{required:IReceivedDataAtServer_recordDetail, returned:IReceivedDataAtClient_recordDetailSuccessfully}
}


export default class App implements IAppOnlyUsedToTransition,IAppUsedToReadOptionsAndTransition{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    private state:keyof PageStates;
    private option:{
        gameSystemEnvDisplayed: {
            gameSystemID: string | null,
            gameModeID: string | null,
            
        },
        superiorScore: "Lower"|"Higher",
        language:LanguageInApplication,
    };

    
    constructor(firstState:keyof PageStates,articleDOM:HTMLElement,language:LanguageInApplication){
        this.option = {
            gameSystemEnvDisplayed:{
                gameSystemID:null,
                gameModeID:null
            },
            superiorScore: "Lower",
            language : language
        }
        this.state = firstState;
        this.articleDOM = articleDOM;
        if (location.href.startsWith(`${this.origin}/page/main.html?record::`)) {
            this.redirectToDetailPage(location.href.replace(`${this.origin}/page/main.html?record::`,"")).catch( (reason) => this.displayError("記録の詳細の表示に失敗しました。",reason))
        }
    }

    get gameSystemID(){
        return this.option.gameSystemEnvDisplayed.gameSystemID;
    }
    get gameModeID(){
        return this.option.gameSystemEnvDisplayed.gameModeID;
    }
    get superiorScore(){
        return this.option.superiorScore;
    }
    get nowState(){
        return this.state;
    }
    set language(value:LanguageInApplication){
        this.option.language = value
    }
    get language(){
        return this.option.language
    }
    transition<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T]){
        this.clearView();
        switch (nextState){
            case "none": break;
            case "errorView": this.errorView(requestObject as PageStates["errorView"]); break;
            case "detailView": this.detail(requestObject as PageStates["detailView"]); break;
            case "searchResultView": this.search(requestObject  as PageStates["searchResultView"]); break;
            default: throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
        }
    }



    private async redirectToDetailPage(selector:string){
        const token = selector.split("::")
        if (token.length !== 4) throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、渡されたURLの形が不正です。")
        if (token[0] !== "Japanese" && token[0] !== "English") throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、指定された言語のデータが存在しません。")
        this.language = token[0]
        this.transition("detailView",{ lang:this.language, gameSystemEnv:{ gameSystemID:token[1],gameModeID:token[2] }, id:token[3] })
    }



    private accessToAPI<T extends keyof APIFunctions>(functionName:T,requiredObj:APIFunctions[T]["required"]):Promise<APIFunctions[T]["returned"]>{
        return fetch(`${this.origin}/api/${functionName.replace(/\_/g,"/")}`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requiredObj)
        }).then(
            (response) => response.json()
        ).catch(
            (reason) => {
                const errorInString = String(reason);
                console.error(errorInString);
                this.displayError("通信においてエラーが発生しました。",errorInString.replace(/[eE]rror\s*:/,""),this.articleDOM);
            }
        )
    }


    //#CTODO ここの型を埋める。
    private async search(requestConditions:PageStates["searchResultView"]){
        const result = await this.accessToAPI("record_search",requestConditions.required)
        result.map(receivedData => this.articleDOM.appendChild(new RecordGroupView(receivedData.result,this).htmlElement))
        this.option.gameSystemEnvDisplayed = requestConditions[0].gameSystemEnv;
        this.state = "searchResultView"
    }


    //#CTODO　detail関数の実装
    private async detail(request:PageStates["detailView"]){
        const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({id:"detail"}))
        const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({id:"related"}))
        
        const record = (await this.accessToAPI("record_detail",request)).result;

        const relatedRecord = (await this.accessToAPI("record_search",[{
            groupName:"同レギュレーションの記録", gameSystemEnv: record.regulation.gameSystemEnvironment, orderOfRecordArray: "LowerFirst", startOfRecordArray:0, limitOfRecordArray:100,
            targetIDs:[record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", runnerIDs: [], language: request.lang
        }]) )[0].result
        
        let rank:number|undefined = relatedRecord.records.findIndex(element => element.id === record.id)
        if (rank === -1) rank = undefined;
        detailDiv.appendChild(new RecordDetailView(record,this,rank).htmlElement) 
        relatedRecordDiv.appendChild(new RecordGroupView(relatedRecord,this).htmlElement)
        
        this.state = "detailView"
    }


    private clearView(){
        this.articleDOM.innerHTML = "";
    }


    private errorView(request:PageStates["errorView"]){
        this.displayError(request.title,request.message)
        this.state = "errorView"
    }
    

    private displayError(title:string,msg:string, articleDOM:HTMLElement = this.articleDOM){
        articleDOM.appendChild(
            elementWithoutEscaping`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
                <div class="c-title__main">${title}</div>
                <div class="c-title__sub">Error: Failed to prepare the page.</div>
            </div>
            <hr noshade class="u-bold">${marked(msg)}</div>`
        )
        return;
    }
    
    
}
    
