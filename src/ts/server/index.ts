import http from "http";
import fs from "fs/promises";
import {URL} from "url";

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (req, res) => {
    try {
        if (req.url === undefined){ throw new Error("URLが指定されていません。"); }
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (req.method === "POST" && url.pathname === "/recordDatabase/give"){
            
        }
        if (req.method === "GET") await sendDocument(req.url,res);
    } catch(e) {
        console.error(e);
        endWith500Error(res,e);
    }
    res.end();
    
});

server.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
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