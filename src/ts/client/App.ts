import { IReceivedDataAtClient_recordSearchSuccessfully, IReceivedDataAtServer_recordSearch } from "../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtClient_recordDetailSuccessfully, IReceivedDataAtServer_recordDetail } from "../type/transmission/record/IReceivedData_recordDetail";
import { generateSearchView } from "./functions/generateSearchView";
import { generateDetailView } from "./functions/generateDetailView";
import { elementWithoutEscaping } from "../utility/ViewUtility";
const marked = require("marked");

interface PageStates{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    none:undefined,
    detailView:IReceivedDataAtServer_recordDetail
    searchResultView:IReceivedDataAtServer_recordSearch[]
}
interface APIFunctions {
    record_search:{required:IReceivedDataAtServer_recordSearch, returned:IReceivedDataAtClient_recordSearchSuccessfully},
    record_detail:{required:IReceivedDataAtServer_recordDetail, returned:IReceivedDataAtClient_recordDetailSuccessfully}
}
export default class App{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    private state:keyof PageStates;

    get nowState(){
        return this.state;
    }

    transition<T extends keyof PageStates>(nextState:T, requestObject:PageStates[T]){
        this.clearView();
        switch (nextState){
            case "none": break;
            case "detailView": this.detail(requestObject as PageStates["detailView"]); break;
            case "searchResultView": this.search(requestObject  as PageStates["searchResultView"]); break;
            default: throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
        }
    }

    constructor(firstState:keyof PageStates,articleDOM:HTMLElement){
        this.state = firstState;
        this.articleDOM = articleDOM;
        if (location.href.startsWith(`${this.origin}/page/main.html?record::`)) {
            this.redirectToDetailPage(location.href.replace(`${this.origin}/page/main.html?record::`,"")).catch( (reason) => this.displayError("記録の詳細の表示に失敗しました。",reason))
        }
    }
    private async redirectToDetailPage(selector:string){
        const token = selector.split("::")
        if (token.length !== 4) throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、渡されたURLの形が不正です。")
        if (token[0] !== "Japanese" && token[0] !== "English") throw new Error("与URLを元に記録の詳細の表示を試みようとしましたが、指定された言語のデータが存在しません。")
        this.transition("detailView",{
            lang:token[0], gameSystemEnv:{ gameSystemID:token[1],gameModeID:token[2] }, id:token[3]
        })
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
    private async search(requestConditions:IReceivedDataAtServer_recordSearch[]){
        const result = await Promise.all(
            requestConditions.map( (requestCondition) => 
                this.accessToAPI("record_search",requestCondition)
            )
        )
        result.map(ele => generateSearchView(ele.result,this.articleDOM))
        this.state = "searchResultView"
    }

    //#CTODO　detail関数の実装
    private async detail(request:IReceivedDataAtServer_recordDetail){
        const detailDiv = document.createElement("div"); detailDiv.id = "detail"; this.articleDOM.appendChild(detailDiv)
        const relatedRecordDiv = document.createElement("div"); relatedRecordDiv.id = "detail"; this.articleDOM.appendChild(relatedRecordDiv)
        
        const responseOfRecordDetail = await this.accessToAPI("record_detail",request);


        const record = responseOfRecordDetail.result

        const responseOfRecordSearch = await this.accessToAPI("record_search",{
            groupName:"同レギュレーションの記録", gameSystemEnv: record.regulation.gameSystemEnvironment, orderOfRecordArray: "LowerFirst", startOfRecordArray:0, limitOfRecordArray:100,
            targetIDs:[record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", runnerIDs: [], language: request.lang
        })

        generateDetailView(record,detailDiv);
        generateSearchView(responseOfRecordSearch.result,relatedRecordDiv)
        
        this.state = "detailView"
    }
    private clearView(){
        this.articleDOM.innerHTML = "";
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
    
