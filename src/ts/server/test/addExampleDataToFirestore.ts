import { firebase } from "../firebaseAdmin";
import { exampleData } from "./exampledata";

//#TODO 想定する通りにコードを作る。
firebase.firestore.collection("runners").add(exampleData.runnersTable)
firebase.firestore.collection("works").add({
    "id" : 0, "JName" : "日本語作品名", "EName" : "Title Of a kirby's game",
        "JDescription" 	: "ゲームに関する説明を短く記述","EDescription"	: "Description about the game",
})