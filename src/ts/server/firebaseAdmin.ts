import * as fbAdmin from "firebase-admin"
import fs from "fs"
const data = JSON.parse(fs.readFileSync("./secret/serviceAccountKey.json","utf-8"))
fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(data)
});

export const firebase = {
    firestore: fbAdmin.firestore()
}
