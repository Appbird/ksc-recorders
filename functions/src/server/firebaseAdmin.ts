import * as fbAdmin from "firebase-admin"
fbAdmin.initializeApp();

export const firebase = {
    firestore: fbAdmin.firestore()
}
