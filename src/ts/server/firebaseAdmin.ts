import * as fbAdmin from "firebase-admin"
const data = require("../../../../secret/surviceKey.json")
fbAdmin.initializeApp();

export const firebase = {
    firestore: fbAdmin.firestore()
}
