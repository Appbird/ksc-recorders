import { IReceivedDataAtServer_recordSearch } from "../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtServer_recordDetail } from "../type/transmission/record/IReceivedData_recordDetail";
import { generateSearchView } from "./functions/generateSearchView";

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
        .then( (result) => result.map(ele => generateSearchView(ele,this.articleDOM)))
        .catch( (reason) => {console.error(reason);})
        
    }
    //#TODO　detail関数の実装
    detail(request:IReceivedDataAtServer_recordDetail[]){
        Promise.all([
            fetch(`${this.origin}/api/record/detail`,{
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(request)
        }), fetch(`${this.origin}/api/record/detail`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(request)
        )]).then(

        )
    }
    
}
