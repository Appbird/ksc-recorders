import "https://platform.twitter.com/widgets.js"
import { element } from "../../utility/ViewUtility";
declare let twttr:{
    widgets:{
        createTweet:(Tweetid:string, inserted:HTMLDivElement, option:any) => void
    }
}
export class MoviewWidgetCreator{
    //#TODO 動作確認
    private url:URL
    private id:string;
    private param:URLSearchParams;
    private kind:"youtube"|"twitter"
    constructor(href:string){
        this.url = new URL(href);
        this.param = this.url.searchParams;

        this.kind = this.returnKind(this.url.hostname)

        this.id = this.returnId(this.url.pathname);
    }
    private returnKind(hostname:string):"youtube"|"twitter"{
        switch (hostname){
            case "www.youtube.com":return "youtube"
            case "twitter.com": return "twitter"
            default : throw new Error("対応していない記録URLです。(MovieWidgetView)")
        }
    }
    private returnId(pathname:string):string{
        switch (this.kind){
            case "youtube":return pathname.split("/")[3];
            case "twitter": return pathname.split("/")[1];
        }
    }
    setWidget(insertedHTMLElement:HTMLDivElement){
        switch (this.kind){
            case "twitter":
                twttr.widgets.createTweet(this.id,insertedHTMLElement, { width:"75%" });
            break;
            case "youtube":
                insertedHTMLElement.appendChild(element`
                <iframe id="ytplayer" type="text/html" width="75%"
                src="https://${this.url.hostname}}/embed/${this.id}?t=${this.param.get("t")}"
                frameborder="0"></iframe>
                `)
            break
        }
    }
    
}