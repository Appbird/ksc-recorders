import { firebase } from "../firebaseAdmin";
import { recordsData } from "../mockDataBase/exampleRecords";

 (async () => {
    const ref = await firebase.firestore.collection("works").add({
        "id" : 0, "JName" : "日本語作品名", "EName" : "Title Of a kirby's game",
            "JDescription" 	: "ゲームに関する説明を短く記述","EDescription"	: "Description about the game",
    })
    const data = { 	
        "ability"       : [ {"id":"0","JName":"能力0","EName":"Ability0"},{"id":"1","JName":"能力1","EName":"Ability1"},{"id":"2","JName":"能力2","EName":"Ability2"} ],
        "target"        : [ {"id":"0","JName":"対象0","EName":"Target0"},{"id":"1","JName":"対象1","EName":"Target1"},{"id":"2","JName":"対象2","EName":"Target2"} ],
        "difficulty" : [{"id":"0","JName":"難易度0","EName":"Difficulty0",},{"id":"1","JName":"難易度1","EName":"Difficulty1"} ],
        "modes"  	    : [ {"id":"0","JName":"モード0","EName":"Mode0"}]
    }
    const mode = await ref.collection("modes").add(data.modes[0])
    for (const ele of data.ability) mode.collection("abilities").add(ele)
    for (const ele of data.difficulty) mode.collection("difficulties").add(ele);
    for (const ele of data.target) mode.collection("targets").add(ele);
    for (const record of recordsData) mode.collection("records").add(record);
    
})(); 