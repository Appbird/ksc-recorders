import express from "express"
import { apiList } from "./server/function/apiDefinition";
import { recordDataBase } from "./server/mockDataBase/RecordDataBase";
const app = express();
app.use("/app",express.static('public'));
app.use(express.json())

app.get(`/app`,async (req,res) => {
    try{
        if (typeof req.query.state !== "string" || typeof req.query.required !== "string"){
            res.redirect("/app/main.html")
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
        try {
            if (!value.validator(req.body)) throw new Error(value.validator.errors?.map(((error,index) => `\n# Error No.${index+1}: ${error.message} \n\n## スキーマの場所 \n\n ${error.schemaPath} ;\n\n## データの場所\n\n${error.dataPath};`)).join("\n\n"))
        } catch(error){
            if (!(error instanceof Error)){console.error(`予期せぬエラーです。`); return;}
            const errorInString = error.message;
            console.error(`${errorInString}\n${error.stack}`);   res.status(500).json({isSuccess:false,message:errorInString})
            return;
        }
        try { 
            res.status(200).json(await value.process(recordDataBase,req.body))
        }catch(error){
            if (!(error instanceof Error)){console.error(`予期せぬエラーです。`); return;}
            const errorInString = error.message;
            console.error(`${errorInString}\n${error.stack}`);   res.status(500).json({isSuccess:false,message:errorInString})
            return;
        }
        return;
    })
})

app.listen(3000,() => console.info("start on http://localhost:3000/app"))
