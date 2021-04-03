import { IReceivedDataAtServer_recordSearch } from "../type/transmission/recordSearch/IReceivedDataAtServer_recordSearch";
import { generateSearchView } from "./functions/generateSearchView";

export default class App{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    constructor(){
        const result = document.getElementById("article");
        if (result === null) throw new Error("Element whose id is article is not found.")
        this.articleDOM = result;
        
    }
    //#TODO ここの型を埋める。
    async search(requestCondition:IReceivedDataAtServer_recordSearch[]){
        return fetch(`${this.origin}/recordDatabase/search/record`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requestCondition)
        })
        .then( (response) => response.json())
        .then( (result) => generateSearchView(result,this.articleDOM))
        .catch( (reason) => {console.error(reason);})
    }
}