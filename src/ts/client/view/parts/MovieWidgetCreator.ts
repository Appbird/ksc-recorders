import { element } from "../../../utility/ViewUtility";
declare let twttr:{
    widgets:{
        createTweet:(Tweetid:string, inserted:Element, option?:any) => void
    }
}
export class MovieWidgetCreator{
    //#CTODO 動作確認
    private url:URL|null = null;
    private id:string|null = null;
    private param:URLSearchParams|null = null;
    private kind:"youtube"|"twitter"|null = null;
    private container:HTMLElement;
    constructor(container:HTMLElement,href?:string){
        this.container = container;
        if (href === undefined) return;
        this.set(href);
    }
    set(href:string){
        this.url = new URL(href);
        this.param = this.url.searchParams;
        this.kind = this.returnKind(this.url.hostname)
        this.id = this.returnId(this.url.pathname);
    }
    private returnKind(hostname:string):"youtube"|"twitter"{
        switch (hostname){
            case "youtu.be":return "youtube"
            case "twitter.com": return "twitter"
            default : throw new Error("対応していない記録URLです。(MovieWidgetView)")
        }
    }
    private returnId(pathname:string):string{
        if (this.kind === null) throw new Error("[MovieWidgetCreator] returnIdメソッドを実行する前にsetメソッドを実行してURLをセットしてください。") 
        switch (this.kind){
            case "youtube":return pathname.split("/")[1];
            case "twitter": return pathname.split("/")[3];
        }
    }
    setWidget(){
        this.container.innerHTML = ""
        if (this.param === null || this.id === null || this.kind === null)throw new Error("[MovieWidgetCreator] setWidgetメソッドを実行する前にsetメソッドを実行してURLをセットしてください。") 
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
        }
    }
    
}