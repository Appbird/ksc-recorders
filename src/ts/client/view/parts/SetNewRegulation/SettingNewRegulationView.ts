import { createElementWithIdAndClass } from "../../../utility/aboutElement";
import { element } from "../../../../utility/ViewUtility";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { IAppUsedToReadAndChangePage } from "../../../interface/AppInterfaces";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { EditorSegment } from "./EditorSegment";
import { IView } from "../../IView";


export class SettingNewRegulationView implements IView{
    private refPath:DestinationOfRefStackToCollection = new DestinationOfRefStackToCollection([],{collectionName:"titles"});
    private container:HTMLElement;
    private menu:HTMLElement;
    private unsubscribeListener:(()=>void)|null = null;
    private editorSegment:EditorSegment;
    private app:IAppUsedToReadAndChangePage;
    private selectedId:string|null = null;
    //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    //#CH ここあたりの設計にあまり拡張性がないため、後で設計し直したい。どうすればよいだろうか。
    constructor(container:HTMLElement,app:IAppUsedToReadAndChangePage){
        this.app = app;
        this.container = container;
        this.menu = this.container.appendChild(element`
            <div class="c-list">
                <div class="c-title">
                    <div class="c-title__main">編集するデータを選択してください。</div>
                </div>
                <hr noshade class="u-bold">
            </div>`).appendChild(createElementWithIdAndClass({className:"u-width95per"}));
        this.menu.appendChild(this.createMenuItem("ゲームモード","Game Mode",() => (this.selectedId === null) ? 0:this.goLower(this.selectedId,"modes")))
            
        this.editorSegment = new EditorSegment( 
            this.container.appendChild(element`
            <div class="c-list">
                    <div class="c-title">
                        <div class="c-title__main">データ編集</div>
                    </div>
                    <hr noshade class="bold">
            </div>`).appendChild(createElementWithIdAndClass({className:"u-width95per"})),
        "normal",this.app.state.language,this.refPath
        )
    }

    goLower(docID:string,collectionName:string){
        this.refPath.goToLower(docID,collectionName);
        this.refreshWhole().catch( (error) => this.app.errorCatcher(error,"下の階層のデータに行けませんでした。") )
    }
    goHigher(){
        this.refPath.returnToHigher();
        this.refreshWhole().catch( (error) => this.app.errorCatcher(error,"上の階層のデータに行けませんでした。") )
    }
    
    private async refreshWhole(){
        this.menu.innerHTML = "";
        switch (this.refPath.depth){
        case 0: 
            this.menu.appendChild(this.createMenuItem("ゲームモード","Game Mode",() => (this.selectedId === null) ? 0:this.goLower(this.selectedId,"modes")))
            this.editorSegment.setNewRefStack(this.refPath,"normal")
            break;
        case 1:
            const strs:[string,string,string][] = [ ["難易度","Difficulty","difficulties"], ["能力","Ability","abilities"], ["敵/ステージ (計測対象)","Enemy / Stage (Targets)","targets"] ]
            for (const str of strs) this.menu.appendChild(this.createMenuItem(str[0],str[1],() => (this.selectedId === null) ? 0: this.goLower(this.selectedId,str[2])))
            this.editorSegment.setNewRefStack(this.refPath,"normal")
            break;
        case 2:
            if (this.refPath.reference.path.endsWith("targets")) this.editorSegment.setNewRefStack(this.refPath,"difficulty")
            else this.editorSegment.setNewRefStack(this.refPath,"normal")
            break;
        }
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


