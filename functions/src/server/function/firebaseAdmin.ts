import firebase from "firebase-admin"
firebase.initializeApp()
export const firebaseAdmin = {
    auth:firebase.auth(),
    firestore:firebase.firestore()
}