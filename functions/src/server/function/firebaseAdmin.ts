import firebase from "firebase-admin"
import { checkInputObjectWithErrorPossibility } from "../../../../src/ts/utility/InputCheckerUtility"

firebase.initializeApp()
export const firebaseAdmin = {
    auth:firebase.auth(),
    firestore:firebase.firestore()
}
firebaseAdmin.firestore.settings({ignoreUndefinedProperties:true})
export const firebaseConfig = 
(() => {
        if (process.env.FIREBASE_CONFIG === undefined) throw new Error("実行環境がFirebase上のものではありません。")
        const result = JSON.parse(process.env.FIREBASE_CONFIG)
        if (!checkInputObjectWithErrorPossibility<{storageBucket:string, projectId:string}>(result,{storageBucket:"string", projectId:"string"},"object")) throw new Error()
        return result
})()