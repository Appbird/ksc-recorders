import {  IReceivedDataAtServer_recordDetail } from "../../type/transmission/record/IReceivedData_recordDetail";
import { IReceivedDataAtServer_recordSearch } from "../../type/transmission/record/IReceivedData_recordSearch";

export interface PageStates{
    //#NOTE それぞれのステートが初期条件として必要とするオブジェクトの型をここに記述する。
    none:undefined,
    errorView:{title:string,message:string}
    detailView:IReceivedDataAtServer_recordDetail
    searchResultView:{required:IReceivedDataAtServer_recordSearch,title?:string}
}
