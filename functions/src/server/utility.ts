import firebase from "firebase-admin"
import "firebase-admin/lib/auth";
import { IRunner } from "../../../src/ts/type/record/IRunner"
import { firebaseConfig } from "./function/firebaseAdmin";
export function createDefaultUserData(user:firebase.auth.UserRecord):IRunner{
    const username = user.displayName ? user.displayName : "----";
    return {
        id:user.uid,
        Japanese: username,
        English: username,
        theDateOfRegistered: Date.now(),
        theNumberOfPost: 0, theDateOfLastPost:0, twitterLink:"",youtubeLink:"",idOfGameModeRunnerHavePlayed:[],idOfGameSystemRunnerHavePlayed:[],
        isCommitteeMember: false, isMuted:false,
        photoURL:(user.photoURL) ? user.photoURL :"",
        numberOfUnreadNotification:0
    }
}
export function isProducedVersion(){
    if (firebaseConfig === undefined) throw new Error("実行環境がFirebase上のものではありません。")
    return !firebaseConfig.projectId.endsWith("-dev")
}