import { RunnerCollectionController } from "../../firestore/RunnerCollectionController";

export async function isCommiteeMember(uid:string){
    return (await new RunnerCollectionController().getInfo(uid)).isCommitteeMember
}