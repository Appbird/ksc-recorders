import firebase from "firebase-admin"
import { RecordDataBase } from "../../firestore/RecordDataBase"
export async function setUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    console.log("a");
    const userName = (user.displayName === undefined) ? "" : user.displayName
    await recordDataBase.writeRunnerInfo(user.uid,{
        id:user.uid,
        Japanese: userName,
        English: userName,
        theDateOfRegistered: Date.now(),
        theNumberOfPost: 0, theDateOfLastPost:0, twitterLink:"",youtubeLink:"",idOfGameModeRunnerHavePlayed:[],idOfGameSystemRunnerHavePlayed:[],
        isCommitteeMember: false, isMuted:false,photoURL:"",numberOfUnreadNotification:0
    })
}
export async function deleteUserEventListener(user:firebase.auth.UserRecord,recordDataBase:RecordDataBase){
    await recordDataBase.deleteRunnerInfo(user.uid)
}