import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { element } from "../../../utility/ViewUtility";
import "firebase/firestore";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { EditorSegment } from "./EditorSegment";
import { IView } from "../IView";

export class SettingNewRegulationView implements IView{
    private refPath:DestinationOfRefStackToCollection = new DestinationOfRefStackToCollection([],{collectionName:"titles"});
    private container:HTMLElement;
    private menu:HTMLElement;
    private unsubscribeListener:(()=>void)|null = null;
    private editorSegment:EditorSegment;
    private app:IAppUsedToReadAndChangePage;
    private selectedId:string|null = null;
    constructor(container:HTMLElement,app:IAppUsedToReadAndChangePage){
        this.app = app;
        this.container = container;
        this.menu = this.container.appendChild(element`
        <div class="c-list u-width95per">
            <div class="c-title">
                <div class="c-title__main">編集するデータを選択してください。</div>
            </div>
        </div>
        `).appendChild(createElementWithIdAndClass());

        this.editorSegment = new EditorSegment( 
            this.container.appendChild(element`
                <div class="c-list u-width95per">
                    <div class="c-title">
                        <div class="c-title__main">データ編集</div>
                    </div>
                </div>
            `).appendChild(createElementWithIdAndClass())
        ,this.app.state.language)
        this.setCallBackOnWrite();
        this.goHigher();
    }

    goLower(docID:string,collectionName:string){
        this.refPath.goToLower(docID,collectionName);
        this.refreshWhole().catch( (error) => this.app.errorCatcher(error,"下の階層のデータに行けませんでした。") )
    }
    goHigher(){
        this.refPath.returnToHigher();
        this.refreshWhole().catch( (error) => this.app.errorCatcher(error,"下の階層のデータに行けませんでした。") )
    }
    
    private setCallBackOnWrite(){
        this.editorSegment.addChangeEventListenerOfNormalEditors((id,changed) => 
            this.refPath.reference.doc(id).set(changed).catch(error => this.app.errorCatcher(error,"データの変更に失敗しました。"))
        )
    }
    private async refreshWhole(){
        this.menu.innerHTML = "";
        switch (this.refPath.depth){
        case 0: 
            this.menu.appendChild(this.createMenuItem("ゲームモード","Game Mode",() => (this.selectedId === null) ? 0:this.goLower(this.selectedId,"modes")))
            break;
        case 1:
            const strs:[string,string,string][] = [ ["難易度","Difficulty","difficulties"], ["能力","Ability","abilities"], ["敵/ステージ (計測対象)","Enemy / Stage (Targets)","targets"] ]
            for (const str of strs) this.menu.appendChild(this.createMenuItem(str[0],str[1],() => (this.selectedId === null) ? 0: this.goLower(this.selectedId,str[2])))
            break;
        }

        (await this.refPath.reference.get()).docs.map( item => this.editorSegment.setEditorItem(item.id,item.data() as IItemOfResolveTableToName))
        this.setCallBackOnSnapshot();
    }
    private setCallBackOnSnapshot(){
        if (this.unsubscribeListener !== null) this.unsubscribeListener();
        this.unsubscribeListener = this.refPath.reference.onSnapshot((querySnapshots) => {
                querySnapshots.docChanges().forEach( (querySnapshot) => {
                    switch (querySnapshot.type){
                        case "removed": return this.editorSegment.removeEditorItem(querySnapshot.doc.id);
                        default: return this.editorSegment.setEditorItem(querySnapshot.doc.id,querySnapshot.doc.data() as IItemOfResolveTableToName)
                    }
                })
        })
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
    destory(){
        this.editorSegment.destroy();
        if (this.unsubscribeListener !== null) this.unsubscribeListener();
    }
}


