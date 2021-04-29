import firebase from "firebase-admin"
import { RecordDataBase } from "../../firestore/RecordDataBase"
export function setUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    const userName = (user.displayName === undefined) ? "" : user.displayName
    recordDataBase.writeRunnerInfo(user.uid,{
        id:user.uid,
        Japanese: userName,
        English: userName,
        theDateOfRegistered: Date.now(),
        theNumberOfPost: 0, theDateOfLastPost:0, twitterID:"",youtubeID:"",idOfGameModeRunnerHavePlayed:[],idOfGameSystemRunnerHavePlayed:[],
        isCommitteeMember: false, isMuted:false
    })
}
export function deleteUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    recordDataBase.deleteRunnerInfo(user.uid)
}