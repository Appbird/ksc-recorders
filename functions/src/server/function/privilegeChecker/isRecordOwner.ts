import { IReceivedDataAtServerNeedAuthentication, IReceivedDataAtServerNeedOwner } from "../../../../../src/ts/type/api/transmissionBase";
import { RecordCollectionController } from "../../firestore/RecordCollectionController";

export async function isRecordOwner(request:IReceivedDataAtServerNeedAuthentication,uid:string){
    if (!( (provided):provided is IReceivedDataAtServerNeedOwner&IReceivedDataAtServerNeedAuthentication => provided.hasOwnProperty("recordID"))(request)) throw new Error("サーバーの設定にミスがあります。(needOwner設定が必要ありません)")
    const rg = request.gameSystemEnv
    return uid === (await new RecordCollectionController(rg.gameSystemID,rg.gameModeID).getInfo(request.recordID)).id
}