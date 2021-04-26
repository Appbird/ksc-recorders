import * as fbAdmin from "firebase-admin"
import fs from "fs"
const data = JSON.parse(fs.readFileSync("./secret/serviceAccountKey.json","utf-8"))
fbAdmin.initializeApp({
    //#TODO おそらくここはfirebaseに移行することになると要らないはず
    credential: fbAdmin.credential.cert(data)
});

export const firebase = {
    firestore: fbAdmin.firestore()
}
