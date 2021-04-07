import { IReceivedDataAtClient_recordSearch, IReceivedDataAtServer_recordSearch } from "../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtClient_recordDetail, IReceivedDataAtServer_recordDetail } from "../type/transmission/record/IReceivedData_recordDetail";
import { generateSearchView } from "./functions/generateSearchView";
import { displayError } from "./functions/displayError";
import { generateDetailView } from "./functions/generateDetailView";

export default class App{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    constructor(){
        const result = document.getElementById("article");
        if (result === null) throw new Error("Element whose id is `article` is not found.")
        this.articleDOM = result;
        
    }
    //#CTODO ここの型を埋める。
    search(requestConditions:IReceivedDataAtServer_recordSearch[]){
        return Promise.all(
            requestConditions.map( (requestCondition) => 
                fetch(`${this.origin}/api/record/search`,{
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(requestCondition)
            }))
        )
        .then( (response) => Promise.all(response.map(ele => ele.json())))
        .then( (result) => result.map(ele => generateSearchView(ele.result,this.articleDOM)))
        .catch( (reason) => displayError("データの取得に失敗しました。",String(reason).replace(/[e|E]rror\s*:/,""),this.articleDOM))
        
    }

    //#TODO　detail関数の実装
    async detail(request:IReceivedDataAtServer_recordDetail){
        const detailDiv = document.createElement("div"); detailDiv.id = "detail"; this.articleDOM.appendChild(detailDiv)
        const relatedRecordDiv = document.createElement("div"); relatedRecordDiv.id = "detail"; this.articleDOM.appendChild(relatedRecordDiv)
        
        const responseOfRecordDetail = (await fetch(`${this.origin}/api/record/detail`,
        {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(request)
        })
        .then( result => result.json())) as IReceivedDataAtClient_recordDetail;

        if (responseOfRecordDetail.result === undefined) {
            displayError("記録の詳細な情報の取得に失敗しました",String(responseOfRecordDetail.message),detailDiv)
            return;
        }

        const record = responseOfRecordDetail.result
        const requestObj:IReceivedDataAtServer_recordSearch = {
            groupName:"同レギュレーションの記録", gameSystemEnv: record.regulation.gameSystemEnvironment,
            orderOfRecordArray: "LowerFirst", startOfRecordArray:0, limitOfRecordArray:100,
            targetIDs:[record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder",
            runnerIDs: [], language: request.lang
        };

        const responseOfRecordSearch = (await fetch(`${this.origin}/api/record/search`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requestObj)
        }).then( result => result.json() ))
        if (responseOfRecordSearch.result === undefined){
            displayError("記録の詳細な情報の取得に失敗しました",String(responseOfRecordDetail.message),relatedRecordDiv)
            return;
        }

        generateDetailView(record,detailDiv);
        generateSearchView(responseOfRecordSearch.result,relatedRecordDiv)
        

    }
}
    
