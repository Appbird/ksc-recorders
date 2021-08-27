import firebase from "firebase-admin"
import "firebase-admin/lib/auth";
import { RunnerCollectionController } from "../../firestore/RunnerCollectionController";
import { createDefaultUserData } from "../../utility";
//#NOTE 何故か発火しない
export async function setUserEventListener(user:firebase.auth.UserRecord){
    await new RunnerCollectionController().modify(user.uid,createDefaultUserData(user),{privateDocWrite:true});
}
export async function deleteUserEventListener(user:firebase.auth.UserRecord){
    await new RunnerCollectionController().delete(user.uid)
}