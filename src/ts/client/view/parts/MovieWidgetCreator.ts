import { element } from "../../../utility/ViewUtility";
declare let twttr:{
    widgets:{
        createTweet:(Tweetid:string, inserted:Element, option?:any) => void
    }
}
type MovieType = "youtube"|"twitter"|"imgur"|"media"
export class MovieWidgetCreator{
    //#CTODO 動作確認
    private url:URL|null = null;
    private id:string|null = null;
    private param:URLSearchParams|null = null;
    private kind:MovieType|null = null;
    private container:HTMLElement;
    constructor(container:HTMLElement,href?:string){
        this.container = container;
        if (href === undefined) return;
        this.set(href);
    }
    set(href:string){
        this.url = new URL(href);
        this.kind = this.returnKind(this.url.hostname)
        this.param = this.url.searchParams;
        this.id = this.returnId(this.url.pathname);
    }
    private returnKind(hostname:string):MovieType{
        switch (hostname){
            case "youtu.be":return "youtube"
            case "twitter.com": return "twitter"
            case "imgur.com": return "imgur"

            case "i.imgur.com": case "cdn.discordapp.com": case "media.discordapp.net":
                return "media"
            default : throw new Error("対応していない記録URLです。(MovieWidgetView)")
        }
    }
    private returnId(pathname:string):string{
        if (this.kind === null) throw new Error("[MovieWidgetCreator] returnIdメソッドを実行する前にsetメソッドを実行してURLをセットしてください。") 
        switch (this.kind){
            case "youtube":return pathname.split("/")[1];
            case "twitter": return pathname.split("/")[3];
            case "imgur": return pathname.split("/")[2];
            case "media": return ""
        }
    }
    setWidget(){
        this.container.innerHTML = ""
        if (this.url === null || this.kind === null || this.param === null || this.id === null)throw new Error("[MovieWidgetCreator] setWidgetメソッドを実行する前にsetメソッドを実行してURLをセットしてください。") 
        switch (this.kind){
            case "twitter":
                twttr.widgets.createTweet(this.id,this.container);
                break;
            case "youtube":
                //#NOTE ここをレスポンシブにできないか…？
                this.container.appendChild(element`
                <iframe id="ytplayer" type="text/html" width="800px" height="600px"
                src="https://www.youtube.com/embed/${this.id}?start=${this.param.get("t")}"
                frameborder="0"></iframe>
                `)
                break
            case "imgur":{
                const url = this.url?.toString();
                this.container.appendChild(element`
                <div class="u-underline u-bolderChara">${url}</div>
                ` as HTMLElement).addEventListener("click", () => window.open(url))
                break;
            }
            case "media":{
                const url = this.url?.toString();
                this.container.appendChild(element`
                <img class="u-width90per" src="${url}"></img>
                ` as HTMLElement)
                break;
            }

        }
    }
    
}