import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";
import { Input_IItemOfResolveTableToName } from "./Input_IItemOfResolveTableToName";

export class EditorSegment {
    private editorSegment: HTMLElement;
    private language:LanguageInApplication
    private addtionalEditor:Input_IItemOfResolveTableToName;
    private editors: Map<string, Input_IItemOfResolveTableToName>;
    constructor(container: HTMLElement,language:LanguageInApplication) {
        this.editorSegment = container;
        this.language = language;
        this.editors = new Map<string, Input_IItemOfResolveTableToName>();
        //#TODO この必須入力欄がすべて埋まったらイベントを発火。このイベントで、新たにFirestoreにアイテムを挿入し、入力した内容をクリアする。
        this.addtionalEditor = new Input_IItemOfResolveTableToName(this.editorSegment.appendChild(document.createElement("div")),this.language,{Japanese:"新しいアイテムを追加する。",English:"append new item"})
    }
    removeAllItems() {
        this.editors.forEach(editor => editor.destroy());
        this.editors.clear();
    }
    removeEditorItem(id: string) {
        this.editors.get(id)?.destroy();
        this.editors.delete(id);
    }
    setEditorItem(id: string, item: IItemOfResolveTableToName) {
        (this.editors.has(id)) ?
            this.editors.get(id)?.refreshView(item)
            : this.editors.set(id, new Input_IItemOfResolveTableToName(this.editorSegment.appendChild(document.createElement("div")),  this.language,item,{
                defaultItem:item
            }));
    }
    addEditorItem(id: string, item: IItemOfResolveTableToName) {
    }
    addChangeEventListenerOfNormalEditors(callback:(id:string,changed:IItemOfResolveTableToName) => void){
        this.editors.forEach( (editor,id) => 
            editor.addChangeEventListener(value => callback(id,value))
        )
    }
    destroy(){
        this.removeAllItems();
        this.editorSegment.innerHTML = "";
    }
}
