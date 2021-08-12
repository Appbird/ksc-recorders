import * as functions from "firebase-functions"
import express from "express"
import { apiList } from "./server/function/apiDefinition";
import { recordDataBase } from "./server/firestore/RecordDataBase";
import { deleteUserEventListener, setUserEventListener } from "./server/function/listener/user";
import { authentication } from "./server/function/foundation/auth";
import { IReceivedDataAtServerNeedAuthentication } from "../../src/ts/type/api/transmissionBase";
import { checkPrivilege } from "./checkPrivilege";
import { errorCatcher } from "./errorCatcher";
import { generateOGP } from "./ogp";

const app = express();
app.use(express.json())

exports.createNewUser = functions.auth.user().onCreate((user) => setUserEventListener(user,recordDataBase));
exports.deleteNewUser = functions.auth.user().onDelete((user) => deleteUserEventListener(user,recordDataBase));

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

exports.ogp = functions.https.onRequest(async (request,response) => {
    response.set("Cache-Control", "public, max-age=600, s-maxage=600");
    const url = new URL(request.url, `http://${request.headers.host}`);
    const gs = url.searchParams.get("gs")
    const gm = url.searchParams.get("gm")
    const id = url.searchParams.get("id")
    if (gs === null||gm=== null||id===null) {
        response.status(404).send(`404 Not Found`)
        return;
    }
    try {
        const result = await generateOGP(recordDataBase,gs,gm,id)
        response.status(200).send(result)
    } catch(err){
        response.status(500).send(`500 ${err.message}`)
    }
})