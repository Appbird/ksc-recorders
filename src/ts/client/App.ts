import { IReceivedDataAtClient_recordSearchSuccessfully, IReceivedDataAtServer_recordSearch } from "../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtClient_recordDetailSuccessfully, IReceivedDataAtServer_recordDetail } from "../type/transmission/record/IReceivedData_recordDetail";
import { element, elementWithoutEscaping } from "../utility/ViewUtility";
import { PageStates } from "./interface/PageStates";
import { IAppOnlyUsedToTransition, IAppUsedToReadOptionsAndTransition } from "./interface/AppInterfaces";
import { RecordGroupView } from "./view/RecordsGroupView";
import { RecordDetailView } from "./view/RecordDetailView";
import { createElementWithIdAndClass } from "./utility/aboutElement";
import { LanguageInApplication } from "../server/type/LanguageInApplication";
import { HistoryAdministrator } from "./view/HistoryAdministrator";
const marked = require("marked");

interface APIFunctions {
    record_search:{required:IReceivedDataAtServer_recordSearch, returned:IReceivedDataAtClient_recordSearchSuccessfully},
    record_detail:{required:IReceivedDataAtServer_recordDetail, returned:IReceivedDataAtClient_recordDetailSuccessfully}
}


export default class App implements IAppOnlyUsedToTransition,IAppUsedToReadOptionsAndTransition{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    private state:keyof PageStates;
    private requiredObj:PageStates[keyof PageStates]
    private historyAd: HistoryAdministrator;
    private option:{
        gameSystemEnvDisplayed: {
            gameSystemID: string | null,
            gameModeID: string | null,
            
        },
        superiorScore: "Lower"|"Higher",
        language:LanguageInApplication,
    };

    constructor(firstState:keyof PageStates,articleDOM:HTMLElement,language:LanguageInApplication){
        this.historyAd = new HistoryAdministrator(this)
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
        if (location.href.startsWith(`${this.origin}/app?record::`)) {
            this.redirectToDetailPage(location.href.replace(`${this.origin}/page/main.html?record::`,"")).catch( (reason) => this.displayError("記録の詳細の表示に失敗しました。",reason))
        }
    }
    get nowState(){
        return this.state;
    }
    get nowRequiredObject(){
        return this.requiredObj;
    }

    get gameSystemID(){
        return this.option.gameSystemEnvDisplayed.gameSystemID;
    }
    get gameModeID() {
        return this.option.gameSystemEnvDisplayed.gameModeID;
    }
    get superiorScore(){
        return this.option.superiorScore;
    }

    set language(value:LanguageInApplication){
        this.option.language = value
    }
    get language(){
        return this.option.language
    }
    async transition<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T],ifAppendHistory:boolean = true){
        
        if (ifAppendHistory) this.historyAd.appendHistory();
        try {
            this.clearView();
            switch (nextState) {
                case "none":                break;
                case "errorView":           await this.errorView(requestObject as PageStates["errorView"]);         break;
                case "detailView":          await this.detail(requestObject as PageStates["detailView"]);           break;
                case "searchResultView":    await this.search(requestObject  as PageStates["searchResultView"]);    break;
                default: throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
            }
            
        } catch(error){
            if (!(error instanceof Error)){ console.error(`予期せぬエラーです。 : ${error}`); return; }
            const errorInString = error.message;
            console.error(`${errorInString}\n${error.stack}`);
            this.displayError("エラーが発生しました。",errorInString,this.articleDOM);
        }
        this.state = nextState; this.requiredObj = requestObject;
    }



    private async redirectToDetailPage(selector:string){
        const token = selector.split("::")
        if (token.length !== 4) throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、渡されたURLの形が不正です。")
        if (token[0] !== "Japanese" && token[0] !== "English") throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、指定された言語のデータが存在しません。")
        this.language = token[0]
        this.transition("detailView",{ lang:this.language, gameSystemEnv:{ gameSystemID:token[1],gameModeID:token[2] }, id:token[3] })
    }



    private async accessToAPI<T extends keyof APIFunctions>(functionName:T,requiredObj:APIFunctions[T]["required"]):Promise<APIFunctions[T]["returned"]>{
        const response = await fetch(`${this.origin}/api/${functionName.replace(/\_/g,"/")}`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requiredObj)
        })
        if (response.status !== 200) throw new Error(
            `# APIを利用した通信に失敗しました。\n\n## 使用したAPI\n\n${functionName}\n\n## 原因\n\n${(await response.json()).message}\n\n## 入力オブジェクト\n\n${JSON.stringify(requiredObj)}`
        )
        const result = await response.json()
        console.log(result)
        return result
    }


    //#CTODO ここの型を埋める。
    private async search(this:App,requestConditions:PageStates["searchResultView"]){
        const result = (await this.accessToAPI("record_search",requestConditions.required)).result
        if (requestConditions.title !== undefined) this.articleDOM.appendChild(
            element`<div>
            <div class="c-title">
                <div class="c-title__main">${requestConditions.title}</div>
            </div>
            <hr noshade class="u-bold" /></div>`)
        result.map(receivedData => this.articleDOM.appendChild(new RecordGroupView(receivedData,this).htmlElement))
        this.option.gameSystemEnvDisplayed = requestConditions.required.condition[0].gameSystemEnv;
        this.state = "searchResultView"
    }


    //#CTODO　detail関数の実装
    private async detail(this:App,request:PageStates["detailView"]){
        const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({id:"detail"}))
        const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({id:"related"}))
        
        const record = (await this.accessToAPI("record_detail",request)).result;

        const relatedRecord = (await this.accessToAPI("record_search",{condition:[{
            groupName:"同レギュレーションの記録", gameSystemEnv: { gameSystemID:record.regulation.gameSystemEnvironment.gameSystemID, gameModeID:record.regulation.gameSystemEnvironment.gameModeID}, orderOfRecordArray: "LowerFirst", startOfRecordArray:0, limitOfRecordArray:100,
            targetIDs:[record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", language: request.lang
        }]}
        ) ).result[0]
        
        let rank:number|undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1
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
                <div class="c-title__sub">Failed to prepare the page.</div>
            </div>
            <hr noshade class="u-bold">
            <div class="u-width95per">${marked(msg)}</div>
        </div>`
        )
        return;
    }
    
    
}
    
