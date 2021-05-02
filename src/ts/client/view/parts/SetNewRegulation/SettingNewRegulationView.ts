import { createElementWithIdAndClass } from "../../../utility/aboutElement";
import { element } from "../../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../../interface/AppInterfaces";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { EditorSegment } from "./EditorSegment";
import { IView } from "../../IView";

export class SettingNewRegulationView implements IView{
    private refPath:DestinationOfRefStackToCollection = new DestinationOfRefStackToCollection([],{collectionName:"titles"});
    private container:HTMLElement;
    private unsubscribeListener:(()=>void)|null = null;
    private editorSegment:EditorSegment;
    private app:IAppUsedToReadAndChangePage;
    private selectedId:string|null = null;
    //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    //#CH ここあたりの設計にあまり拡張性がないため、後で設計し直したい。どうすればよいだろうか。
    constructor(container:HTMLElement,,app:IAppUsedToReadAndChangePage){
        this.app = app;
        this.container = container;
        this.editorSegment = new EditorSegment( 
            this.container.appendChild(element`
            <div class="c-list">
                    <div class="c-title">
                        <div class="c-title__main">${}</div>
                    </div>
                    <hr noshade class="bold">
            </div>`).appendChild(createElementWithIdAndClass({className:"u-width95per"})),
        "normal",this.app.state.language,this.refPath
        )
    }
    
    private createMenuItem(main:string,sub:string,onClick?:()=>void){
        const ele = element`<div class = "c-list">
                <div class="c-list__item">
                    <div class="c-title">
                        <div class="c-title__main">${main}</div>
                        <div class="c-title__sub">${sub}</div>
                    </div>
                </div>
            </div>
            `
        if (onClick === undefined) return ele;
        ele.onclick = onClick;
        return ele;
    }
    destroy(){
        this.editorSegment.destroy();
        if (this.unsubscribeListener !== null) this.unsubscribeListener();
    }
}


