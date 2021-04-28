import * as functions from "firebase-functions";
import { RecordDataBase } from "../../firestore/RecordDataBase";

export function setUserEventListener(recordDataBase:RecordDataBase){
    functions.auth.user().onCreate((user) => {
        const userName = (user.displayName === undefined) ? "" : user.displayName
        recordDataBase.writeRunnerInfo(user.uid,{
            id:user.uid,
            JName: userName,
            EName: userName,
            theDateOfRegistered: Date.now(),
            theNumberOfPost: 0, theDateOfLastPost:0, twitterID:"",youtubeID:"",idOfGameModeRunnerHavePlayed:[],idOfGameSystemRunnerHavePlayed:[],
            isCommitteeMember: false, isMuted:false
        })
    });
    functions.auth.user().onDelete((user) => {
        recordDataBase.deleteRunnerInfo(user.uid)
    });
}