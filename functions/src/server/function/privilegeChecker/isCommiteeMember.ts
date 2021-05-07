import { recordDataBase } from "../../firestore/RecordDataBase";

export async function isCommiteeMember(uid:string){
    return (await recordDataBase.getRunnerInfo(uid)).isCommitteeMember
}