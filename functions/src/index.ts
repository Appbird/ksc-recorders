import express from "express"
import { apiList } from "./server/function/apiDefinition";
import { recordDataBase } from "./server/mockDataBase/RecordDataBase";
const app = express();
//#TODO firebaseに対応したコードに
app.use("/app",express.static('public'));
app.use(express.json())

app.get(`/app`,async (req,res) => {
    try{
        if (typeof req.query.state !== "string" || typeof req.query.required !== "string"){
            res.redirect("/app/index.html")
            return;
        }
        res.redirect(`/app/main.html?state=${req.query.state}&required=${req.query.required}`)
    } catch(error){
        console.error(error);
    }
}
)

apiList.forEach( (value,key) => {
    app.post(`/api${key}`,async (req,res) => {
        console.log(`\u001b[32m[${new Date().toLocaleString()}] start to execute /api${key}\u001b[0m\n`)
        try {
            if (!value.validator(req.body)) throw new Error(value.validator.errors?.map(((error,index) => `\n## Error No.${index+1}: ${error.message} \n\n### スキーマの場所 \n\n ${error.schemaPath} ;\n\n### データの場所\n\n${error.dataPath};`)).join("\n\n"))
        } catch(error){  res.status(400).json(errorCatcher(key,error)); return; }

        try { 
            res.status(200).json(await value.process(recordDataBase,req.body))
        }catch(error){ res.status(500).json(errorCatcher(key,error))}
        return;
    })
})

app.listen(5000,() => console.info("start on http://localhost:5000/app"))

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