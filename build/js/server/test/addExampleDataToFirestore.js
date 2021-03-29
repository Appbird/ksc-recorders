"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebaseAdmin_1 = require("../firebaseAdmin");
var exampledata_1 = require("./exampledata");
//#TODO 想定する通りにコードを作る。
firebaseAdmin_1.firebase.firestore.collection("runners").add(exampledata_1.exampleData.runnersTable);
firebaseAdmin_1.firebase.firestore.collection("works").add({
    "id": 0, "JName": "日本語作品名", "EName": "Title Of a kirby's game",
    "JDescription": "ゲームに関する説明を短く記述", "EDescription": "Description about the game",
});
