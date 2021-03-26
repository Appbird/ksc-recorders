import http from "http";
import fs from "fs/promises";
import {URL} from "url";
import {search} from "./ServerFunctions/search"
import { ServerResponse } from "node:http";
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (req, res) => {
    try {
        let body:Buffer[];
        req.on("data", (chunk:Buffer | string | undefined) => {
            if (chunk === undefined) return;
            if (typeof chunk === "string") chunk = Buffer.from(chunk);

            if (chunk.length >= 1000000) throw new Error("データ容量が1MBを超えています。")
            console.info(`received Data : ${body.join().length} byte`)
            body.push(Buffer.from(chunk));
        }) 
        req.on("end", () => {
            console.info(`[${new Date().toISOString()}]: All transferred Body-Data has been completely received.`)
            for (const aBody of body) process(req,res,aBody.toString());
        })
    }catch(e){
        console.error(e);
        endWith500Error(res,e);
    }
    res.end();
});

server.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});

async function process(req:http.IncomingMessage,res:ServerResponse,body:string){
    
        if (req.url === undefined){ throw new Error("URLが指定されていません。"); }
        const url = new URL(req.url, `http://${req.headers.host}`);
        switch (req.method){
            case "GET":
                await sendDocument(req.url,res);
                break;
            case "POST":
                if ( url.pathname === "/recordDatabase/give") res.write(search(body));
                break;
            default:
                
                break;
        }
    
}
async function sendDocument(url:string,res:http.ServerResponse){
    const contents = await fs.readFile(`${__dirname}/../../${url}`, 'utf-8');
    
    const ary = url?.split(".");
    if (ary === undefined) throw new Error("拡張子が指定されていません。");
    res.writeHead(200, {'Content-Type': `text/${ary[ary.length - 1]}`});
    res.write(contents);
}
function endWith500Error(res:http.ServerResponse, reason:any){
    res.writeHead(500, {'Content-Type': `text/plain`});
    res.write(`internal error : ${reason}`);
}