import { IReceivedDataAtServer_recordSearch } from "../type/transmission/IReceivedDataAtServer_recordSearch";
import { generateSearchView } from "./functions/generateSearchView";

export default class App{
    private articleDOM:HTMLElement;
    private origin:string = "http://localhost:3000";
    constructor(){
        this.articleDOM = document.getElementById("article")
    }
    //#TODO ここの型を埋める。
    async search(requestCondition:IReceivedDataAtServer_recordSearch){
        return fetch(`${this.origin}/recordDatabase/search/record`,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(requestCondition)
        })
        .then( (response) => response.json())
        .then( (result) => generateSearchView(result,this.articleDOM))
        .catch( (reason) => console.error(reason))
    }
}