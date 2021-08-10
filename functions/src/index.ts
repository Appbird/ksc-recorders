import * as functions from "firebase-functions"
import express from "express"
import { apiList, PrivilegeType } from "./server/function/apiDefinition";
import { recordDataBase } from "./server/firestore/RecordDataBase";
import { deleteUserEventListener, setUserEventListener } from "./server/function/listener/user";
import { authentication } from "./server/function/foundation/auth";
import { IReceivedDataAtServerNeedAuthentication } from "../../src/ts/type/api/transmissionBase";
import { isCommiteeMember } from "./server/function/privilegeChecker/isCommiteeMember";
import { isRecordOwner } from "./server/function/privilegeChecker/isRecordOwner";

const app = express();
app.use(express.json())

exports.createNewUser = functions.auth.user().onCreate((user) => setUserEventListener(user,recordDataBase));
exports.deleteNewUser = functions.auth.user().onDelete((user) => deleteUserEventListener(user,recordDataBase));

console.log(`[${new Date().toLocaleString()}] Loading API starts.`)
apiList.forEach( (value,key) => {
    app.post(`/api${key}`,async (req,res) => {

        try {
            //#NOTE validator
            if (!value.validator(req.body)) throw new Error(value.validator.errors?.map(((error,index) => `\n## Error No.${index+1}: ${error.message} \n\n### スキーマの場所 \n\n ${error.schemaPath} ;\n\n### データの場所\n\n${error.dataPath};`)).join("\n\n"))
        } catch(error){  res.status(400).json(errorCatcher(key,"failed",error)); return; }

        try {
            //#NOTE privilege checker
            if (value.privilege!=="everyone"){
                if (!( (provided):provided is IReceivedDataAtServerNeedAuthentication => provided.hasOwnProperty("IDToken"))(req.body)) throw new Error("[rejected] トークンを必要とするリクエストにトークンが付与されていませんでした。")
                const uid = await authentication(req.body.IDToken);
                if (!checkPrivilege(value.privilege,req.body,uid)) throw new Error(`[rejected] このユーザー(uid: ${uid} )には操作 /api${key} を行う権限${value.privilege}がありません。`)
            }
        }catch(error){res.status(403).json(errorCatcher(key,"rejected",error)); return;}

        
        try {
            //#NOTE process
            const result = await value.process(recordDataBase,req.body)
            res.status(200).json(result)
        }catch(error){ res.status(500).json(errorCatcher(key,"failed",error)); return;}
        console.log(`\u001b[32m[${new Date().toLocaleString()}] Process /api${key} was completed Successfully! \u001b[0m\n`)
        
        return;
    })

})

exports.app = functions.https.onRequest(app);

console.log(`[${new Date().toLocaleString()}] Loading API ends.`)

function errorCatcher(key:string,type:"failed"|"rejected"|"",error:any){
    console.log(`\u001b[31m[${new Date().toLocaleString()} / ${type}] failed to execute /api${key}\u001b[0m\n`)
    if (!(error instanceof Error)){
        
        console.error(`予期せぬエラーです。`); 
        return {isSuccess:false,message:String(error)};
    }
    const errorInString = error.message;
    console.error(`${errorInString}\n${error.stack}`);
    return {isSuccess:false,message:errorInString};
}

async function checkPrivilege(privilege:PrivilegeType,request:IReceivedDataAtServerNeedAuthentication,uid:string){
    switch (privilege){
        case "comiteeMemberOrOwner": return await isRecordOwner(request,uid) || await isCommiteeMember(uid);
        case "onlyCommiteeMember": return isCommiteeMember(uid)
        case "everyone": return true;
    }
}