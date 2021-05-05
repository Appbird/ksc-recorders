import * as functions from "firebase-functions"
import express from "express"
import { apiList } from "./server/function/apiDefinition";
import { recordDataBase } from "./server/firestore/RecordDataBase";
import { deleteUserEventListener, setUserEventListener } from "./server/function/listener/user";

const app = express();
app.use(express.json())

//#TODO 何故トリガーされないかの原因を探る。
exports.createNewUser = functions.auth.user().onCreate((user) => setUserEventListener(user,recordDataBase));
exports.deleteNewUser = functions.auth.user().onDelete((user) => deleteUserEventListener(user,recordDataBase));

apiList.forEach( (value,key) => {
    app.post(`/api${key}`,async (req,res) => {
        try {
            if (!value.validator(req.body)) throw new Error(value.validator.errors?.map(((error,index) => `\n## Error No.${index+1}: ${error.message} \n\n### スキーマの場所 \n\n ${error.schemaPath} ;\n\n### データの場所\n\n${error.dataPath};`)).join("\n\n"))
        } catch(error){  res.status(400).json(errorCatcher(key,error)); return; }

        try { 
            res.status(200).json(await value.process(recordDataBase,req.body))
        }catch(error){ res.status(500).json(errorCatcher(key,error)); return;}
        console.log(`\u001b[32m[${new Date().toLocaleString()}] Process /api${key} was completed Successfully! \u001b[0m\n`)
        
        return;
    })
})

exports.app = functions.https.onRequest(app);

function errorCatcher(key:string,error:any){
    console.log(`\u001b[31m[${new Date().toLocaleString()}] failed to execute /api${key}\u001b[0m\n`)
    if (!(error instanceof Error)){
        
        console.error(`予期せぬエラーです。`); 
        return {isSuccess:false,message:String(error)};
    }
    const errorInString = error.message;
    console.error(`${errorInString}\n${error.stack}`);
    return {isSuccess:false,message:errorInString};
}