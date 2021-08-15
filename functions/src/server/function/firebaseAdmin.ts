import firebase from "firebase-admin"

firebase.initializeApp()
export const firebaseAdmin = {
    auth:firebase.auth(),
    firestore:firebase.firestore()
}
export const firebaseConfig = 
(() => {
        const result = JSON.parse(process.env.FIREBASE_CONFIG ?? "{}")
        if (Object.entries(result).length === 3) return undefined
        return result as {
            databaseURL:string, storageBucket:string,projectId:string
        }
})()