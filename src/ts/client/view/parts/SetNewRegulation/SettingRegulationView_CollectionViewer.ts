import { generateIcooonHTML } from "../../../utility/aboutElement";
import { HTMLConverter } from "../../../../utility/ViewUtility";
import { IView } from "../../IView";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import firebase from "firebase";
import { choiceString, selectAppropriateDescription } from "../../../../utility/aboutLang";
import { IItemOfResolveTableToName, IItemOfResolveTableToNameLackingOfID } from "../../../../type/list/IItemOfResolveTableToName";
import { icooonResolvable } from "../../../../type/foundation/icooonResolvable";
import { MultiLanguageString } from "../../../../type/foundation/MultiLanguageString";

type Callbacks = {
    whenReady?:()=>void,
    whenStart?:()=>void
}

const context = {
    header:{
        Japanese:"編集するアイテムを選択して下さい。",
        English:"Select where you want to edit."
    },
    appendNewItem:{
        Japanese:"新しい項目",
        English:"new item"
    }
}
export class SettingRegulationView_CollectionViewer implements IView{
    private path:firebase.firestore.CollectionReference;
    private cardObj:Map<string|undefined,ListItem> = new Map<string|undefined,ListItem>();
    private container:HTMLElement;
    private language:LanguageInApplication;
    private onClickEventListener:((clickedID:string,name:MultiLanguageString)=>void)|null = null;
    private callbacks:Callbacks
    private unsubscribe:(()=>void)|null = null;
    constructor(container:HTMLElement,path:firebase.firestore.CollectionReference,language:LanguageInApplication,{
        onClickEventListener,whenReady,whenStart
    }:{
        onClickEventListener:(clickedID:string,name:MultiLanguageString)=>void,
    }&Callbacks){
        this.container = container;
        this.path = path;
        console.log(`[KSSRs] connecting ${path.path} ...`)
        this.language = language;
        const collectionViewer = this.container.appendChild(document.createElement("div"))
        const htmlC = new HTMLConverter(language);
        collectionViewer.appendChild(htmlC.elementWithoutEscaping`
            <div id="articleTitle">
                <div class="c-title">
                    <div class="c-title__main u-smallerChara">${context.header}</div>
                </div>
                <hr noshade class="u-bold">
            </div>
        `);
        this.callbacks = {whenReady,whenStart}
        this.onClickEventListener = onClickEventListener;
        this.generate();
        
    }
    private async generate(){
        if (this.callbacks.whenStart !== undefined) this.callbacks.whenStart();
        const items = [
            {...context.appendNewItem,id:undefined},
            ...(await this.path.get()).docs.map( doc => {return {...(doc.data()),id:doc.id} as (IItemOfResolveTableToNameLackingOfID&icooonResolvable)})
        ];

        for (const [,listItem] of this.cardObj) listItem.destroy()
        this.cardObj.clear();

        for (const item of items) this.setItem(item.id,item)

        this.unsubscribe = this.path.onSnapshot(querySnapshot => {
            console.info(`[KSSRs-InfoEditor] change from the server detected.`)
            for(const docChange of querySnapshot.docChanges()){
                switch(docChange.type){
                    case "removed": this.removeItem(docChange.doc.id);break;
                    default:        this.setItem(docChange.doc.id,docChange.doc.data() as (IItemOfResolveTableToName&icooonResolvable))
                }  
            }
        })
        if (this.callbacks.whenReady !== undefined) this.callbacks.whenReady();
    }
    private removeItem(id:string){
        this.cardObj.get(id)?.destroy();
        this.cardObj.delete(id)
    }
    private setItem(id:string|undefined,item:(IItemOfResolveTableToNameLackingOfID&icooonResolvable)){
        if (this.cardObj.has(id)) 
            this.cardObj.get(id)?.change(item)
        else this.cardObj.set(id,new ListItem(
            this.container.appendChild(document.createElement("div")),
            this.language,
            item,
            {onClickEventListener:this.onClickEventListener}
        ))
        
    }
    destroy(){
        for (const [,value] of this.cardObj) value.destroy()
        if (this.unsubscribe !== null) {
            this.unsubscribe();
            console.log(`[KSSRs] unsubscribe onSnapshot ${this.path.path}.`)
        }
        this.container.innerHTML = "";
    }
}


class ListItem implements IView{
    private container:HTMLElement;
    private language:LanguageInApplication;
    constructor(container:HTMLElement,language:LanguageInApplication,info:IItemOfResolveTableToNameLackingOfID&icooonResolvable,{
        onClickEventListener = null
    }:{onClickEventListener:((clickedID:string|undefined,name:MultiLanguageString)=>void)|null}){
        this.container = container;
        if (onClickEventListener !== null) this.container.addEventListener("click",() => onClickEventListener(info.id,info))
        this.language = language;
        this.change(info);
    }
    change(info:IItemOfResolveTableToNameLackingOfID&icooonResolvable){
        this.container.innerHTML = `
            <div class="c-list__item">
                <div class="u-width90per">
                    <div class = "c-title">
                        <div class = "c-title__main u-smallerChara">${generateIcooonHTML(info)} ${choiceString(info,this.language)}</div>
                    </div>
                    <p class="description">${selectAppropriateDescription(info,this.language)}</p>
                </div>
            </div>`
    }
    destroy(){
        this.container.innerHTML = "";
    }
}