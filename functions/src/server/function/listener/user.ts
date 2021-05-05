import firebase from "firebase-admin"
import "firebase-admin/lib/auth";
import { RecordDataBase } from "../../firestore/RecordDataBase"
import { createDefaultUserData } from "../../utility";
//#NOTE 何故か発火しない
export async function setUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    await recordDataBase.writeRunnerInfo(user.uid,createDefaultUserData(user));
}
export async function deleteUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    await recordDataBase.deleteRunnerInfo(user.uid)
}