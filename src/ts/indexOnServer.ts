import express from "express"
import { apiDefinition } from "./server/function/apiDefinition";
const app = express();
app.use("/page",express.static('public'));
app.use(express.json())

apiDefinition.forEach( (value,key) => {
    app.post(`/api${key}`,async (req,res) => {
        try {
            value.structureCheckerFunction(req.body)
        } catch(error){
            
            const errorInString = String(error);
            console.error(errorInString);   res.status(400).json({isSuccess:false,message:errorInString})
            return;
        }
        try { 
            res.status(200).json(await value.process(req.body))
        }catch(error){
            const errorInString = String(error);
            console.error(errorInString);   res.status(500).json({isSuccess:false,message:errorInString})
            return;
        }
        return;
    })
})

app.listen(3000,() => console.info("start on http://localhost:3000/page/html/main.html"))
