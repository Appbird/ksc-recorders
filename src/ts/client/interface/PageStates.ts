import {APIFunctions} from "../../type/api/relation"

export interface PageStates{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    none:undefined,
    errorView:{title:string,message:string}
    detailView:APIFunctions["record_detail"]["atServer"]
    searchResultView:{required:APIFunctions["record_search"]["atServer"],title?:string}
    gameSystemSelector:undefined
}
export const stateView = ["none","errorView","detailView","searchResultView","gameSystemSelector"];
