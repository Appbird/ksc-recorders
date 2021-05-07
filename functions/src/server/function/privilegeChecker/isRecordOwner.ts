import { IReceivedDataAtServerNeedAuthentication, IReceivedDataAtServerNeedOwner } from "../../../../../src/ts/type/api/transmissionBase";
import { recordDataBase } from "../../firestore/RecordDataBase";

export async function isRecordOwner(request:IReceivedDataAtServerNeedAuthentication,uid:string){
    if (!( (provided):provided is IReceivedDataAtServerNeedOwner&IReceivedDataAtServerNeedAuthentication => provided.hasOwnProperty("recordID"))(request)) throw new Error("サーバーの設定にミスがあります。(needOwner設定が必要ありません)")
    return uid === (await recordDataBase.getRecord(request.gameSystemEnv.gameSystemID,request.gameSystemEnv.gameModeID,request.recordID)).id
}