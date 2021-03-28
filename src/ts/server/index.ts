import http from "http";
import fs from "fs/promises";
import {URL} from "url";
import {search} from "./ServerFunctions/search"
import { ServerResponse } from "node:http";
const hostname = 'localhost';
const port = 3000;
const server = http.createServer(async (req, res) => {
    try {
        let body:Buffer[] = [];
        req.on("data", (chunk:Buffer | string | undefined) => {
            if (chunk === undefined) return;
            if (typeof chunk === "string") chunk = Buffer.from(chunk);

            if (chunk.length >= 1000000) throw new Error("データ容量が1MBを超えています。")
            console.info(`received Data : ${chunk.length} byte`)
            body.push(Buffer.from(chunk));
        }) 
        req.on("end", () => {
            if (body.length === 0) {
                process(req,res);
                return;
            }
            console.info(`[${new Date().toUTCString()}]: All transferred Body-Data has been completely received.`)
            for (const aBody of body) process(req,res,aBody.toString());
        })
    }catch(e){
        endWithError(res,e);
    }
});

server.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});

async function process(req:http.IncomingMessage,res:ServerResponse,body?:string){
        if (req.url === undefined || req.url.endsWith("/")){
            await sendDocument("/html/main.html",res)
            res.end();
            return;
        }
        const url = new URL(req.url, `http://${req.headers.host}`);
        switch (req.method){
            case "GET":
                await sendDocument(req.url,res);
                break;
            case "POST":
                if ( url.pathname === "/recordDatabase/search/record"){
                    if (body === undefined) break;
                    const dateStartProcess = new Date().getTime();
                    const result = await search(body);
                    if (result.isSuccess) res.writeHead(200, {'Content-Type': `text/json}`});
                    else res.writeHead(400, {'Content-Type': `text/json}`})
                    res.write(JSON.stringify(result));
                    console.info(`[${new Date().toUTCString()}] process /recordDatabase/search takes ${new Date().getTime() - dateStartProcess} miliseconds.`)
                }
                break;
            default:
                
                break;
        }
        res.end();
}
async function sendDocument(url:string,res:http.ServerResponse){
    const contents = await fs.readFile(`${__dirname}/../../${url}`, 'utf-8').catch( (reason) => {endWithError(res,reason,404)});
    if (contents === undefined) return;
    const ary = url.split(".");
    if (ary === undefined) throw new Error("拡張子が指定されていません。");
    res.writeHead(200, {'Content-Type': `text/${ary[ary.length - 1]}`});
    res.write(contents);
    
}
function endWithError(res:http.ServerResponse, reason:any, statusCode:number = 503){
    console.error(`\u001b[31m${reason}\u001b[0m`);
    res.writeHead(statusCode, {'Content-Type': `application/json`});
    res.write(`{
        "isSuccess": false,
        "message": "${reason}",
    }`);
    res.end();

}